import * as assert from "./assert";
import {
    Command,
    DepthDescriptor,
    StencilDescriptor,
    BlendDescriptor,
    UniformDescriptor,
} from "./command";
import { AttributeData } from "./attribute-data";
import { Primitive } from "./element-buffer";

export interface DeviceOptions {
    pixelRatio?: number;
    viewport?: [number, number];
    context?: {
        antialias?: boolean,
        alpha?: boolean;
        depth?: boolean;
        stencil?: boolean;
        preserveDrawingBuffer?: boolean;
    };
    extensions?: Extension[];
}

/**
 * Available extensions.
 */
export enum Extension {
    EXTColorBufferFloat = "EXT_color_buffer_float",
    OESTextureFloatLinear = "OES_texture_float_linear",
}

export class Device {

    /**
     * Create a new canvas and device (containing a gl context). Mount it on
     * `element` parameter (default is `document.body`).
     */
    static mount(
        element: HTMLElement = document.body,
        options?: DeviceOptions,
    ): Device {
        if (element instanceof HTMLCanvasElement) {
            return Device.fromCanvas(element, options);
        }

        const canvas = document.createElement("canvas");
        element.appendChild(canvas);
        return Device.fromCanvas(canvas, options);
    }

    /**
     * Create a new device (containing a gl context) from existing canvas.
     */
    static fromCanvas(
        canvas: HTMLCanvasElement,
        options: DeviceOptions = {},
    ): Device {
        const {
            antialias = true,
            alpha = true,
            depth = true,
            stencil = true,
            preserveDrawingBuffer = false,
        } = options.context || {};
        const gl = canvas.getContext("webgl2", {
            antialias,
            alpha,
            depth,
            stencil,
            preserveDrawingBuffer,
        });
        if (!gl) { throw new Error("Could not get webgl2 context"); }
        return Device.fromContext(gl, options);
    }

    /**
     * Create a new device from existing gl context.
     */
    static fromContext(
        gl: WebGL2RenderingContext,
        {
            pixelRatio,
            viewport,
            extensions,
        }: DeviceOptions = {},
    ): Device {
        if (extensions) {
            extensions.forEach(ext => {
                if (!gl.getExtension(ext)) {
                    throw new Error(`Could not get extension ${ext}`);
                }
            });
        }

        const dev = new Device(
            gl,
            gl.canvas,
            pixelRatio,
            viewport,
        );
        dev.update();
        return dev;
    }

    readonly gl: WebGL2RenderingContext;
    readonly canvas: HTMLCanvasElement;

    private explicitPixelRatio?: number;
    private explicitViewport?: [number, number];

    private backbufferTarget: Target;

    private constructor(
        gl: WebGL2RenderingContext,
        canvas: HTMLCanvasElement,
        explicitPixelRatio?: number,
        explicitViewport?: [number, number],
    ) {
        this.gl = gl;
        this.canvas = canvas;
        this.explicitPixelRatio = explicitPixelRatio;
        this.explicitViewport = explicitViewport;
        this.backbufferTarget = new Target(gl, [gl.BACK]);
    }

    /**
     * Return width of the gl drawing buffer.
     */
    get bufferWidth(): number {
        return this.gl.drawingBufferWidth;
    }

    /**
     * Return height of the gl drawing buffer.
     */
    get bufferHeight(): number {
        return this.gl.drawingBufferHeight;
    }

    /**
     * Return width of the canvas. This will usually be the same as:
     *   device.bufferWidth
     */
    get canvasWidth(): number {
        return this.canvas.width;
    }

    /**
     * Return height of the canvas. This will usually be the same as:
     *   device.bufferHeight
     */
    get canvasHeight(): number {
        return this.canvas.height;
    }

    /**
     * Return width of canvas in CSS pixels (before applying device pixel ratio)
     */
    get canvasCSSWidth(): number {
        return this.canvas.clientWidth;
    }

    /**
     * Return height of canvas in CSS pixels (before applying device pixel ratio)
     */
    get canvasCSSHeight(): number {
        return this.canvas.clientHeight;
    }

    /**
     * Return the device pixel ratio for this device
     */
    get pixelRatio(): number {
        return this.explicitPixelRatio || window.devicePixelRatio;
    }

    /**
     * Notify the device to check whether updates are needed. This resizes the
     * canvas, if the device pixel ratio or css canvas width/height changed.
     */
    update(): void {
        const dpr = this.pixelRatio;
        const canvas = this.canvas;
        const width = this.explicitViewport
            && this.explicitViewport[0]
            || canvas.clientWidth * dpr;
        const height = this.explicitViewport
            && this.explicitViewport[1]
            || canvas.clientHeight * dpr;
        if (width !== canvas.width) { canvas.width = width; }
        if (height !== canvas.height) { canvas.height = height; }
    }

    target(cb: (rt: Target) => void): void {
        this.backbufferTarget.with(cb);
    }
}

/**
 * Target represents a drawable surface. Get hold of targets with
 * `device.target()` or `framebuffer.target()`.
 *
 * Targets provide methods for drawing to a surface, or clearing its values.
 */
export class Target {

    constructor(
        private gl: WebGL2RenderingContext,
        readonly glDrawBuffers: number[],
        readonly glFramebuffer?: WebGLFramebuffer,
        readonly width?: number,
        readonly height?: number,
    ) { }

    /**
     * Run the callback with the target bound. This is called automatically,
     * when obtaining a target via `device.target()` or `framebuffer.target()`.
     */
    with(cb: (rt: Target) => void): void {
        this.bind();
        cb(this);
    }

    /**
     * Clear the color buffer to provided color.
     */
    clearColor(r: number, g: number, b: number, a: number): void {
        const gl = this.gl;
        gl.clearColor(r, g, b, a);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    /**
     * Clear the depth buffer to provided depth.
     */
    clearDepth(depth: number): void {
        const gl = this.gl;
        gl.clearDepth(depth);
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Clear the stencil buffer to provided stencil.
     */
    clearStencil(stencil: number): void {
        const gl = this.gl;
        gl.clearStencil(stencil);
        gl.clear(gl.STENCIL_BUFFER_BIT);
    }

    /**
     * Clear the color buffers and depth buffer to provided color and depth.
     *
     * This is equivalent to but more efficient than:
     *   device.clearColor()
     *   device.clearDepth()
     */
    clearColorAndDepth(
        r: number,
        g: number,
        b: number,
        a: number,
        depth: number,
    ): void {
        const gl = this.gl;
        gl.clearColor(r, g, b, a);
        gl.clearDepth(depth);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Clear the depth buffer and stencil buffer to provided depth and stencil.
     *
     * This is equivalent to but more efficient than:
     *   device.clearDepth()
     *   device.clearStencil()
     */
    clearDepthAndStencil(depth: number, stencil: number): void {
        const gl = this.gl;
        gl.clearDepth(depth);
        gl.clearStencil(stencil);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    }

    /**
     * Clear the color buffers and stencil buffer to provided color and stencil.
     *
     * This is equivalent to but more efficient than:
     *   device.clearColor()
     *   device.clearStencil()
     */
    clearColorAndStencil(
        r: number,
        g: number,
        b: number,
        a: number,
        stencil: number,
    ): void {
        const gl = this.gl;
        gl.clearColor(r, g, b, a);
        gl.clearStencil(stencil);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    }

    /**
     * Clear the color buffers, depth buffer and stencil buffer to provided
     * color, depth and stencil.
     *
     * This is equivalent to but more efficient than:
     *   device.clearColor()
     *   device.clearDepth()
     *   device.clearStencil()
     */
    clear(
        r: number,
        g: number,
        b: number,
        a: number,
        depth: number,
        stencil: number,
    ): void {
        const gl = this.gl;
        gl.clearColor(r, g, b, a);
        gl.clearDepth(depth);
        gl.clearStencil(stencil);
        gl.clear(gl.COLOR_BUFFER_BIT
            | gl.DEPTH_BUFFER_BIT
            | gl.STENCIL_BUFFER_BIT);
    }

    /**
     * Draw to the target with a command, attributes, and command properties.
     */
    draw<P>(cmd: Command<P>, attrs: AttributeData, props: P): void {
        const gl = this.gl;
        const {
            glProgram,
            depthDescr,
            stencilDescr,
            blendDescr,
            uniformDescrs,
        } = cmd;

        gl.useProgram(glProgram);

        this.depth(depthDescr);
        this.stencil(stencilDescr);
        this.blend(blendDescr);

        this.updateUniforms(uniformDescrs, props, 0);

        if (attrs.isEmpty()) {
            gl.bindVertexArray(null);
            gl.drawArrays(
                attrs.primitive,
                0 /* offset */,
                attrs.count,
            );
        } else {
            gl.bindVertexArray(attrs.glVertexArray);
            if (attrs.elements) {
                this.drawElements(
                    attrs.primitive,
                    attrs.elementCount,
                    attrs.elementType!,
                    0, // offset
                    attrs.instanceCount,
                );
            } else {
                this.drawArrays(
                    attrs.primitive,
                    attrs.count,
                    0, // offset
                    attrs.instanceCount,
                );
            }
        }
    }

    /**
     * Perform multiple draws to the target with the same command, but multiple
     * geometries and command properties.
     */
    batch<P>(
        cmd: Command<P>,
        cb: (draw: (attrs: AttributeData, props: P) => void) => void,
    ): void {
        const gl = this.gl;
        const {
            glProgram,
            depthDescr,
            stencilDescr,
            blendDescr,
            uniformDescrs,
        } = cmd;

        // When batching (passing in an array of props), the price for
        // gl.useProgram, binding framebuffers, enabling depth/stencil tests and
        // blending is paid only once for all draw calls.

        gl.useProgram(glProgram);

        this.depth(depthDescr);
        this.stencil(stencilDescr);
        this.blend(blendDescr);

        let iter = 0;
        let currVao: AttributeData | null = null;

        // Since we are not cleaning after ourselves, and we check for vao
        // change in each iteration, we need to initialize the first value
        gl.bindVertexArray(null);

        cb((attrs: AttributeData, props: P) => {
            this.updateUniforms(uniformDescrs, props, iter++);
            if (attrs.isEmpty()) {
                if (currVao) {
                    gl.bindVertexArray(null);
                    currVao = null;
                }
                gl.drawArrays(
                    attrs.primitive,
                    0 /* offset */,
                    attrs.count,
                );
            } else {
                if (attrs !== currVao) {
                    gl.bindVertexArray(attrs.glVertexArray);
                    currVao = attrs;
                }

                if (attrs.elements) {
                    this.drawElements(
                        attrs.primitive,
                        attrs.elementCount,
                        attrs.elementType!,
                        0, // offset
                        attrs.instanceCount,
                    );
                } else {
                    this.drawArrays(
                        attrs.primitive,
                        attrs.count,
                        0, // offset
                        attrs.instanceCount,
                    );
                }
            }
        });
    }

    private bind(): void {
        const { gl, glFramebuffer, glDrawBuffers, width, height } = this;
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, glFramebuffer || null);
        gl.drawBuffers(glDrawBuffers);
        gl.viewport(
            0,
            0,
            width || gl.drawingBufferWidth,
            height || gl.drawingBufferHeight,
        );
    }

    private drawArrays(
        primitive: Primitive,
        count: number,
        offset: number,
        instanceCount: number,
    ): void {
        if (instanceCount) {
            this.gl.drawArraysInstanced(
                primitive,
                offset,
                count,
                instanceCount,
            );
        } else {
            this.gl.drawArrays(primitive, offset, count);
        }
    }

    private drawElements(
        primitive: Primitive,
        count: number,
        type: number,
        offset: number,
        instCount: number,
    ): void {
        if (instCount) {
            this.gl.drawElementsInstanced(
                primitive,
                count,
                type,
                offset,
                instCount,
            );
        } else {
            this.gl.drawElements(
                primitive,
                count,
                type,
                offset,
            );
        }
    }

    private depth(depthDescr?: DepthDescriptor): void {
        const gl = this.gl;
        if (depthDescr) {
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(depthDescr.func);
            gl.depthMask(depthDescr.mask);
            gl.depthRange(depthDescr.rangeStart, depthDescr.rangeEnd);
        } else { gl.disable(gl.DEPTH_TEST); }
    }

    private stencil(stencilDescr?: StencilDescriptor): void {
        const gl = this.gl;
        if (stencilDescr) {
            const {
                fFunc,
                bFunc,
                fFuncRef,
                bfuncRef,
                fFuncMask,
                bFuncMask,
                fMask,
                bMask,
                fOpFail,
                bOpFail,
                fOpZFail,
                bOpZFail,
                fOpZPass,
                bOpZPass,
            } = stencilDescr;
            gl.enable(gl.STENCIL_TEST);
            gl.stencilFuncSeparate(gl.FRONT, fFunc, fFuncRef, fFuncMask);
            gl.stencilFuncSeparate(gl.BACK, bFunc, bfuncRef, bFuncMask);
            gl.stencilMaskSeparate(gl.FRONT, fMask);
            gl.stencilMaskSeparate(gl.BACK, bMask);
            gl.stencilOpSeparate(gl.FRONT, fOpFail, fOpZFail, fOpZPass);
            gl.stencilOpSeparate(gl.BACK, bOpFail, bOpZFail, bOpZPass);
        } else { gl.disable(gl.STENCIL_TEST); }
    }

    private blend(blendDescr?: BlendDescriptor): void {
        const gl = this.gl;
        if (blendDescr) {
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(
                blendDescr.srcRGB,
                blendDescr.dstRGB,
                blendDescr.srcAlpha,
                blendDescr.dstAlpha,
            );
            gl.blendEquationSeparate(
                blendDescr.equationRGB,
                blendDescr.equationAlpha,
            );
            if (blendDescr.color) {
                const [r, g, b, a] = blendDescr.color;
                gl.blendColor(r, g, b, a);
            }
        } else { gl.disable(gl.BLEND); }
    }

    private updateUniforms<P>(
        uniformDescrs: UniformDescriptor<P>[],
        props: P,
        index: number,
    ): void {
        const gl = this.gl;

        let textureUnitOffset = 0;

        uniformDescrs.forEach(({
            identifier: ident,
            location: loc,
            definition: def,
        }) => {
            switch (def.type) {
                case "1f":
                    gl.uniform1f(loc, access(props, index, def.value));
                    break;
                case "1fv":
                    gl.uniform1fv(loc, access(props, index, def.value));
                    break;
                case "1i":
                    gl.uniform1i(loc, access(props, index, def.value));
                    break;
                case "1iv":
                    gl.uniform1iv(loc, access(props, index, def.value));
                    break;
                case "1ui":
                    gl.uniform1ui(loc, access(props, index, def.value));
                    break;
                case "1uiv":
                    gl.uniform1uiv(loc, access(props, index, def.value));
                    break;
                case "2f": {
                    const [x, y] = access(props, index, def.value);
                    gl.uniform2f(loc, x, y);
                    break;
                }
                case "2fv":
                    gl.uniform2fv(loc, access(props, index, def.value));
                    break;
                case "2i": {
                    const [x, y] = access(props, index, def.value);
                    gl.uniform2i(loc, x, y);
                    break;
                }
                case "2iv":
                    gl.uniform2iv(loc, access(props, index, def.value));
                    break;
                case "2ui": {
                    const [x, y] = access(props, index, def.value);
                    gl.uniform2ui(loc, x, y);
                    break;
                }
                case "2uiv":
                    gl.uniform2uiv(loc, access(props, index, def.value));
                    break;
                case "3f": {
                    const [x, y, z] = access(props, index, def.value);
                    gl.uniform3f(loc, x, y, z);
                    break;
                }
                case "3fv":
                    gl.uniform3fv(loc, access(props, index, def.value));
                    break;
                case "3i": {
                    const [x, y, z] = access(props, index, def.value);
                    gl.uniform3i(loc, x, y, z);
                    break;
                }
                case "3iv":
                    gl.uniform3iv(loc, access(props, index, def.value));
                    break;
                case "3ui": {
                    const [x, y, z] = access(props, index, def.value);
                    gl.uniform3ui(loc, x, y, z);
                    break;
                }
                case "3uiv":
                    gl.uniform3uiv(loc, access(props, index, def.value));
                    break;
                case "4f": {
                    const [x, y, z, w] = access(props, index, def.value);
                    gl.uniform4f(loc, x, y, z, w);
                    break;
                }
                case "4fv":
                    gl.uniform4fv(loc, access(props, index, def.value));
                    break;
                case "4i": {
                    const [x, y, z, w] = access(props, index, def.value);
                    gl.uniform4i(loc, x, y, z, w);
                    break;
                }
                case "4iv":
                    gl.uniform4iv(loc, access(props, index, def.value));
                    break;
                case "4ui": {
                    const [x, y, z, w] = access(props, index, def.value);
                    gl.uniform4ui(loc, x, y, z, w);
                    break;
                }
                case "4uiv":
                    gl.uniform4uiv(loc, access(props, index, def.value));
                    break;
                case "matrix2fv":
                    gl.uniformMatrix2fv(
                        loc,
                        false,
                        access(props, index, def.value),
                    );
                    break;
                case "matrix3fv":
                    gl.uniformMatrix3fv(
                        loc,
                        false,
                        access(props, index, def.value),
                    );
                    break;
                case "matrix4fv":
                    gl.uniformMatrix4fv(
                        loc,
                        false,
                        access(props, index, def.value),
                    );
                    break;
                case "texture":
                    // TODO: is this the best way? (is it fast? can we cache?)
                    const texture = access(props, index, def.value);
                    const currentTexture = textureUnitOffset++;
                    gl.activeTexture(gl.TEXTURE0 + currentTexture);
                    gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
                    gl.uniform1i(loc, currentTexture);
                    break;
                default:
                    assert.never(def, `Unknown uniform type: (${ident})`);
                    break;
            }
        });
    }
}

function access<P, R>(
    props: P,
    index: number,
    value: ((props: P, index: number) => R) | R,
): R { return typeof value === "function" ? value(props, index) : value; }
