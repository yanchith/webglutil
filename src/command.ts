import * as assert from "./assert";
import * as glutil from "./glutil";
import { Device } from "./device";
import { VertexArray, VertexArrayProps } from "./vertex-array";
import { Primitive, mapGlPrimitive } from "./element-buffer";
import { Texture } from "./texture";
import { Framebuffer, FramebufferProps } from "./framebuffer";

const INT_PATTERN = /^0|[1-9]\d*$/;
const UNKNOWN_ATTRIB_LOCATION = -1;

export type Access<P, R> = R | ((props: P, index: number) => R);
export type StencilOrSeparate<T> = T | { front: T, back: T };
export type BlendOrSeparate<T> = T | { rgb: T, alpha: T };

export interface CommandProps<P> {
    vert: string;
    frag: string;
    uniforms?: { [key: string]: Uniform<P> };
    data?: VertexArrayProps | Access<P, VertexArray>;
    framebuffer?: FramebufferProps | Access<P, Framebuffer>;
    count?: number;
    offset?: number;
    primitive?: Primitive;
    depth?: {
        func: DepthOrStencilFunc;
        mask?: boolean;
        range?: [number, number];
    };
    stencil?: {
        func: {
            func: StencilOrSeparate<DepthOrStencilFunc>;
            ref?: StencilOrSeparate<number>;
            mask?: StencilOrSeparate<number>;
        };
        mask?: StencilOrSeparate<number>;
        op?: {
            fail: StencilOrSeparate<StencilOp>;
            zfail: StencilOrSeparate<StencilOp>;
            zpass: StencilOrSeparate<StencilOp>;
        };
    };
    blend?: {
        func: {
            src: BlendOrSeparate<BlendFunc>;
            dst: BlendOrSeparate<BlendFunc>;
        };
        equation?: BlendOrSeparate<BlendEquation>;
        color?: [number, number, number, number];
    };
}

export type Uniform<P> =
    | Uniform1f<P> | Uniform1fv<P>
    | Uniform1i<P> | Uniform1iv<P> | Uniform1ui<P> | Uniform1uiv<P>
    | Uniform2f<P> | Uniform2fv<P>
    | Uniform2i<P> | Uniform2iv<P> | Uniform2ui<P> | Uniform2uiv<P>
    | Uniform3f<P> | Uniform3fv<P>
    | Uniform3i<P> | Uniform3iv<P> | Uniform3ui<P> | Uniform3uiv<P>
    | Uniform4f<P> | Uniform4fv<P>
    | Uniform4i<P> | Uniform4iv<P> | Uniform4ui<P> | Uniform4uiv<P>
    | UniformMatrix2fv<P> | UniformMatrix3fv<P> | UniformMatrix4fv<P>
    | UniformTexture<P>
    ;

export interface Uniform1f<P> {
    type: "1f";
    value: Access<P, number>;
}

export interface Uniform1fv<P> {
    type: "1fv";
    value: Access<P, Float32Array | number[]>;
}

export interface Uniform1i<P> {
    type: "1i";
    value: Access<P, number>;
}

export interface Uniform1iv<P> {
    type: "1iv";
    value: Access<P, Int32Array | number[]>;
}

export interface Uniform1ui<P> {
    type: "1ui";
    value: Access<P, number>;
}

export interface Uniform1uiv<P> {
    type: "1uiv";
    value: Access<P, Uint32Array | number[]>;
}

export interface Uniform2f<P> {
    type: "2f";
    value: Access<P, Float32Array | number[]>;
}

export interface Uniform2fv<P> {
    type: "2fv";
    value: Access<P, Float32Array | number[]>;
}

export interface Uniform2i<P> {
    type: "2i";
    value: Access<P, Int32Array | number[]>;
}

export interface Uniform2iv<P> {
    type: "2iv";
    value: Access<P, Int32Array | number[]>;
}

export interface Uniform2ui<P> {
    type: "2ui";
    value: Access<P, Uint32Array | number[]>;
}

export interface Uniform2uiv<P> {
    type: "2uiv";
    value: Access<P, Uint32Array | number[]>;
}

export interface Uniform3f<P> {
    type: "3f";
    value: Access<P, Float32Array | number[]>;
}

export interface Uniform3fv<P> {
    type: "3fv";
    value: Access<P, Float32Array | number[]>;
}

export interface Uniform3i<P> {
    type: "3i";
    value: Access<P, Int32Array | number[]>;
}

export interface Uniform3iv<P> {
    type: "3iv";
    value: Access<P, Int32Array | number[]>;
}

export interface Uniform3ui<P> {
    type: "3ui";
    value: Access<P, Uint32Array | number[]>;
}

export interface Uniform3uiv<P> {
    type: "3uiv";
    value: Access<P, Uint32Array | number[]>;
}

export interface Uniform4f<P> {
    type: "4f";
    value: Access<P, Float32Array | number[]>;
}

export interface Uniform4fv<P> {
    type: "4fv";
    value: Access<P, Float32Array | number[]>;
}

export interface Uniform4i<P> {
    type: "4i";
    value: Access<P, Int32Array | number[]>;
}

export interface Uniform4iv<P> {
    type: "4iv";
    value: Access<P, Int32Array | number[]>;
}

export interface Uniform4ui<P> {
    type: "4ui";
    value: Access<P, Uint32Array | number[]>;
}

export interface Uniform4uiv<P> {
    type: "4uiv";
    value: Access<P, Uint32Array | number[]>;
}

export interface UniformMatrix2fv<P> {
    type: "matrix2fv";
    value: Access<P, Float32Array | number[]>;
}

export interface UniformMatrix3fv<P> {
    type: "matrix3fv";
    value: Access<P, Float32Array | number[]>;
}

export interface UniformMatrix4fv<P> {
    type: "matrix4fv";
    value: Access<P, Float32Array | number[]>;
}

export interface UniformTexture<P> {
    type: "texture";
    value: Access<P, Texture>;
}

export const enum DepthOrStencilFunc {
    ALWAYS = "always",
    NEVER = "never",
    EQUAL = "equal",
    NOTEQUAL = "notequal",
    LESS = "less",
    LEQUAL = "lequal",
    GREATER = "greater",
    GEQUAL = "gequal",
}

export const enum StencilOp {
    KEEP = "keep",
    ZERO = "zero",
    REPLACE = "replace",
    INCR = "incr",
    INCR_WRAP = "incr-wrap",
    DECR = "decr",
    DECR_WRAP = "decr-wrap",
    INVERT = "invert",
}

export const enum BlendFunc {
    ZERO = "zero",
    ONE = "one",
    SRC_COLOR = "src-color",
    SRC_ALPHA = "src-alpha",
    ONE_MINUS_SRC_COLOR = "one-minus-src-color",
    ONE_MINUS_SRC_ALPHA = "one-minus-src-alpha",
    DST_COLOR = "dst-color",
    DST_ALPHA = "dst-alpha",
    ONE_MINUS_DST_COLOR = "one-minus-dst-color",
    ONE_MINUS_DST_ALPHA = "one-minus-dst-alpha",
    CONSTANT_COLOR = "constant-color",
    CONSTANT_ALPHA = "constant-alpha",
    ONE_MINUS_CONSTANT_COLOR = "one-minus-constant-color",
    ONE_MINUS_CONSTANT_ALPHA = "one-minus-constant-alpha",
}

export const enum BlendEquation {
    ADD = "add",
    SUBTRACT = "subtract",
    REVERSE_SUBTRACT = "reverse-subtract",
    MIN = "min",
    MAX = "max",
}

export class Command<P = void> {

    static create<P = void>(
        dev: WebGL2RenderingContext | Device,
        {
            vert,
            frag,
            uniforms = {},
            data,
            framebuffer,
            count = 0,
            offset = 0,
            primitive,
            depth,
            stencil,
            blend,
        }: CommandProps<P>,
    ): Command<P> {
        assert.paramNonNull(vert, "vert");
        assert.paramNonNull(frag, "frag");
        assert.paramNonNull(data, "data");
        if (depth) {
            assert.paramNonNull(depth.func, "depth.func");
        }
        if (blend) {
            assert.paramNonNull(blend.func, "blend.func");
            assert.paramNonNull(blend.func.src, "blend.func.src");
            assert.paramNonNull(blend.func.dst, "blend.func.dst");
            if (typeof blend.func.src === "object") {
                assert.paramNonNull(
                    blend.func.src.rgb,
                    "blend.func.src.rgb",
                );
                assert.paramNonNull(
                    blend.func.src.alpha,
                    "blend.func.src.alpha",
                );
            }
            if (typeof blend.func.dst === "object") {
                assert.paramNonNull(
                    blend.func.dst.rgb,
                    "blend.func.dst.rgb",
                );
                assert.paramNonNull(
                    blend.func.dst.alpha,
                    "blend.func.dst.alpha",
                );
            }
        }
        if (stencil) {
            assert.paramNonNull(stencil.func, "stencil.func");
            // TODO: complete stencil validation... validation framework?
        }

        const gl = dev instanceof Device ? dev.gl : dev;
        const vs = glutil.createShader(gl, gl.VERTEX_SHADER, vert);
        const fs = glutil.createShader(gl, gl.FRAGMENT_SHADER, frag);
        const prog = glutil.createProgram(gl, vs, fs);

        gl.deleteShader(vs);
        gl.deleteShader(fs);

        const uniformDescrs = Object.entries(uniforms)
            .map(([ident, uniform]) => {
                const loc = gl.getUniformLocation(prog, ident);
                if (!loc) {
                    throw new Error(`No location for uniform: ${ident}`);
                }
                return new UniformDescriptor(ident, loc, uniform);
            });

        const vertexArrayAcc = data
            ? typeof data === "function" || data instanceof VertexArray
                ? data
                : VertexArray.create(dev, locate(gl, prog, data))
            : undefined;


        const framebufferAcc = framebuffer
            ? typeof framebuffer === "function" || framebuffer instanceof Framebuffer
                ? framebuffer
                : Framebuffer.create(gl, framebuffer)
            : undefined;

        const depthDescr = parseDepth(gl, depth);
        const stencilDescr = parseStencil(gl, stencil);
        const blendDescr = parseBlend(gl, blend);

        return new Command(
            gl,
            prog,
            uniformDescrs,
            count,
            offset,
            primitive,
            vertexArrayAcc,
            framebufferAcc,
            depthDescr,
            stencilDescr,
            blendDescr,
        );
    }

    readonly count: number;
    readonly offset: number;

    // CONFIG
    private gl: WebGL2RenderingContext;

    private glProgram: WebGLProgram;
    private glPrimitive?: number;

    private uniformDescrs: UniformDescriptor<P>[];
    private vertexArrayAcc?: Access<P, VertexArray>;
    private framebufferAcc?: Access<P, Framebuffer>;
    private depthDescr?: DepthDescriptor;
    private stencilDescr?: StencilDescriptor;
    private blendDescr?: BlendDescriptor;

    // STATE
    private currVao: WebGLVertexArrayObject | null;
    private currFbo: WebGLFramebuffer | null;

    private constructor(
        gl: WebGL2RenderingContext,
        glProgram: WebGLProgram,
        uniformDescrs: UniformDescriptor<P>[],
        count: number,
        offset: number,
        primitive?: Primitive,
        vertexArrayAcc?: Access<P, VertexArray>,
        framebufferAcc?: Access<P, Framebuffer>,
        depthDescr?: DepthDescriptor,
        stencilDescr?: StencilDescriptor,
        blendDescr?: BlendDescriptor,
    ) {
        this.gl = gl;
        this.glProgram = glProgram;
        this.glPrimitive = primitive && mapGlPrimitive(gl, primitive);
        this.uniformDescrs = uniformDescrs;
        this.count = count;
        this.offset = offset;
        this.vertexArrayAcc = vertexArrayAcc;
        this.framebufferAcc = framebufferAcc;
        this.depthDescr = depthDescr;
        this.stencilDescr = stencilDescr;
        this.blendDescr = blendDescr;

        this.currVao = null;
        this.currFbo = null;
    }

    execute(props: P | P[]): void {
        const { gl, glProgram } = this;

        /*
        When batching (passing in an array of props), the price for
        gl.useProgram, enabling depth/stencil tests and blending is paid only
        once for all draw calls.
        */

        gl.useProgram(glProgram);

        this.beginDepth();
        this.beginStencil();
        this.beginBlend();

        if (Array.isArray(props)) {
            props.forEach((p, i) => this.executeInner(p, i));
        } else {
            this.executeInner(props, 0);
        }

        // FBOs and VAOs are bound without unbinding in the inner loop
        this.unbindFbo();
        this.unbindVao();

        this.endBlend();
        this.endStencil();
        this.endDepth();

        gl.useProgram(null);
    }

    locate(vertexArrayProps: VertexArrayProps): VertexArrayProps {
        return locate(this.gl, this.glProgram, vertexArrayProps);
    }

    private executeInner(props: P, index: number): void {
        const {
            gl,
            glPrimitive,
            count,
            offset,
            vertexArrayAcc,
            framebufferAcc,
        } = this;

        /*
        Enabling multiple FBOs and VAOs per draw batch is a nice feature. We
        cache currently bound FBO/VAO to prevent needless rebinding.
        */

        let bufferWidth = gl.drawingBufferWidth;
        let bufferHeight = gl.drawingBufferHeight;

        const fbo = framebufferAcc && access(props, index, framebufferAcc);
        if (fbo) {
            this.bindFbo(fbo);
            bufferWidth = fbo.width;
            bufferHeight = fbo.height;
        }

        gl.viewport(0, 0, bufferWidth, bufferHeight);

        this.updateUniforms(props, index);

        const vao = vertexArrayAcc && access(props, index, vertexArrayAcc);
        if (vao) {
            this.bindVao(vao);
            const prim = typeof glPrimitive === "undefined"
                ? typeof vao.glPrimitive === "undefined"
                    ? gl.TRIANGLES
                    : vao.glPrimitive
                : glPrimitive;
            const cnt = count ? Math.min(count, vao.count) : vao.count;
            if (vao.hasElements) {
                this.drawElements(prim, cnt, offset, vao.instanceCount);
            } else {
                this.drawArrays(prim, cnt, offset, vao.instanceCount);
            }
        } else {
            this.drawArrays(
                typeof glPrimitive === "undefined" ? gl.TRIANGLES : glPrimitive,
                count,
                offset,
                0,
            );
        }
    }

    private bindVao(vao: VertexArray): void {
        if (vao !== this.currVao) {
            this.currVao = vao;
            this.gl.bindVertexArray(vao.glVertexArray);
        }
    }

    private unbindVao(): void {
        this.gl.bindVertexArray(null);
        this.currVao = null;
    }

    private bindFbo(fbo: Framebuffer): void {
        const gl = this.gl;
        if (fbo !== this.currFbo) {
            this.currFbo = fbo;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.glFramebuffer);
            gl.drawBuffers(fbo.glColorAttachments);
        }
    }

    private unbindFbo(): void {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.currFbo = null;
    }

    private beginDepth(): void {
        const { gl, depthDescr } = this;
        if (depthDescr) {
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(depthDescr.func);
            gl.depthMask(depthDescr.mask);
            gl.depthRange(depthDescr.rangeStart, depthDescr.rangeEnd);
        }
    }

    private endDepth(): void {
        const { gl, depthDescr } = this;
        if (depthDescr) { gl.disable(gl.DEPTH_TEST); }
    }

    private beginStencil(): void {
        const { gl, stencilDescr } = this;
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
        }
    }

    private endStencil(): void {
        const { gl, stencilDescr } = this;
        if (stencilDescr) { gl.disable(gl.STENCIL_TEST); }
    }

    private beginBlend(): void {
        const { gl, blendDescr } = this;
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
        }
    }

    private endBlend(): void {
        const { gl, blendDescr } = this;
        if (blendDescr) { gl.disable(gl.BLEND); }
    }

    private drawArrays(
        primitive: number,
        count: number,
        offset: number,
        instCount: number,
    ): void {
        if (instCount) {
            this.gl.drawArraysInstanced(primitive, offset, count, instCount);
        } else {
            this.gl.drawArrays(primitive, offset, count);
        }
    }

    private drawElements(
        primitive: number,
        count: number,
        offset: number,
        instCount: number,
    ): void {
        const gl = this.gl;
        if (instCount) {
            gl.drawElementsInstanced(
                primitive,
                count,
                gl.UNSIGNED_INT, // We only support u32 indices
                offset,
                instCount,
            );
        } else {
            gl.drawElements(
                primitive,
                count,
                gl.UNSIGNED_INT, // We only support u32 indices
                offset,
            );
        }
    }

    private updateUniforms(props: P, index: number): void {
        const gl = this.gl;

        let textureUnitOffset = 0;

        this.uniformDescrs.forEach(({
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

function locate(
    gl: WebGL2RenderingContext,
    glProgram: WebGLProgram,
    { attributes, elements }: VertexArrayProps,
): VertexArrayProps {
    type Attributes = VertexArrayProps["attributes"];
    const locatedAttributes = Object.entries(attributes)
        .reduce<Attributes>((accum, [identifier, definition]) => {
            if (INT_PATTERN.test(identifier)) {
                accum[identifier] = definition;
            } else {
                const location = gl.getAttribLocation(glProgram, identifier);
                if (location === UNKNOWN_ATTRIB_LOCATION) {
                    throw new Error(`No location for attrib: ${identifier}`);
                }
                accum[location] = definition;
            }
            return accum;
        }, {});
    return { attributes: locatedAttributes, elements };
}

function access<P, R>(
    props: P,
    index: number,
    value: ((props: P, index: number) => R) | R,
): R {
    return typeof value === "function" ? value(props, index) : value;
}

class DepthDescriptor {
    constructor(
        readonly func: number,
        readonly mask: boolean,
        readonly rangeStart: number,
        readonly rangeEnd: number,
    ) { }
}

class StencilDescriptor {
    constructor(
        readonly fFunc: number,
        readonly bFunc: number,
        readonly fFuncRef: number,
        readonly bfuncRef: number,
        readonly fFuncMask: number,
        readonly bFuncMask: number,
        readonly fMask: number,
        readonly bMask: number,
        readonly fOpFail: number,
        readonly bOpFail: number,
        readonly fOpZFail: number,
        readonly bOpZFail: number,
        readonly fOpZPass: number,
        readonly bOpZPass: number,
    ) { }
}

class BlendDescriptor {
    constructor(
        readonly srcRGB: number,
        readonly srcAlpha: number,
        readonly dstRGB: number,
        readonly dstAlpha: number,
        readonly equationRGB: number,
        readonly equationAlpha: number,
        readonly color?: [number, number, number, number],
    ) { }
}

class UniformDescriptor<P> {
    constructor(
        readonly identifier: string,
        readonly location: WebGLUniformLocation,
        readonly definition: Uniform<P>,
    ) { }
}

function mapGlDepthOrStencilFunc(
    gl: WebGL2RenderingContext,
    func: DepthOrStencilFunc,
): number {
    switch (func) {
        case DepthOrStencilFunc.ALWAYS: return gl.ALWAYS;
        case DepthOrStencilFunc.NEVER: return gl.NEVER;
        case DepthOrStencilFunc.EQUAL: return gl.EQUAL;
        case DepthOrStencilFunc.NOTEQUAL: return gl.NOTEQUAL;
        case DepthOrStencilFunc.LESS: return gl.LESS;
        case DepthOrStencilFunc.LEQUAL: return gl.LEQUAL;
        case DepthOrStencilFunc.GREATER: return gl.GREATER;
        case DepthOrStencilFunc.GEQUAL: return gl.GEQUAL;
        default: return assert.never(
            func,
            `Unknown depth or stencil function: ${func}`,
        );
    }
}

function mapGlStencilOp(gl: WebGL2RenderingContext, op: StencilOp): number {
    switch (op) {
        case StencilOp.KEEP: return gl.KEEP;
        case StencilOp.ZERO: return gl.ZERO;
        case StencilOp.REPLACE: return gl.REPLACE;
        case StencilOp.INCR: return gl.INCR;
        case StencilOp.INCR_WRAP: return gl.INCR_WRAP;
        case StencilOp.DECR: return gl.DECR;
        case StencilOp.DECR_WRAP: return gl.DECR_WRAP;
        case StencilOp.INVERT: return gl.INVERT;
        default: return assert.never(op, `Unknown stencil op: ${op}`);
    }
}

function mapGlBlendFunc(
    gl: WebGL2RenderingContext,
    func: BlendFunc,
): number {
    switch (func) {
        case BlendFunc.ZERO: return gl.ZERO;
        case BlendFunc.ONE: return gl.ONE;
        case BlendFunc.SRC_COLOR: return gl.SRC_COLOR;
        case BlendFunc.SRC_ALPHA: return gl.SRC_ALPHA;
        case BlendFunc.ONE_MINUS_SRC_COLOR: return gl.ONE_MINUS_SRC_COLOR;
        case BlendFunc.ONE_MINUS_SRC_ALPHA: return gl.ONE_MINUS_SRC_ALPHA;
        case BlendFunc.DST_COLOR: return gl.DST_COLOR;
        case BlendFunc.DST_ALPHA: return gl.DST_ALPHA;
        case BlendFunc.ONE_MINUS_DST_COLOR: return gl.ONE_MINUS_DST_COLOR;
        case BlendFunc.ONE_MINUS_DST_ALPHA: return gl.ONE_MINUS_DST_ALPHA;
        case BlendFunc.CONSTANT_COLOR: return gl.CONSTANT_COLOR;
        case BlendFunc.CONSTANT_ALPHA: return gl.CONSTANT_ALPHA;
        case BlendFunc.ONE_MINUS_CONSTANT_COLOR:
            return gl.ONE_MINUS_CONSTANT_COLOR;
        case BlendFunc.ONE_MINUS_CONSTANT_ALPHA:
            return gl.ONE_MINUS_CONSTANT_ALPHA;
        default: return assert.never(func, `Unknown blend func: ${func}`);
    }
}

function mapGlBlendEquation(
    gl: WebGL2RenderingContext,
    equation: BlendEquation,
): number {
    switch (equation) {
        case BlendEquation.ADD: return gl.FUNC_ADD;
        case BlendEquation.SUBTRACT: return gl.FUNC_SUBTRACT;
        case BlendEquation.REVERSE_SUBTRACT: return gl.FUNC_REVERSE_SUBTRACT;
        case BlendEquation.MIN: return gl.MIN;
        case BlendEquation.MAX: return gl.MAX;
        default: return assert.never(
            equation,
            `Unknown blend equation, ${equation}`,
        );
    }
}

function parseDepth(
    gl: WebGL2RenderingContext,
    depth: CommandProps<void>["depth"],
): DepthDescriptor | undefined {
    if (!depth) { return undefined; }
    return new DepthDescriptor(
        mapGlDepthOrStencilFunc(gl, depth.func || DepthOrStencilFunc.LESS),
        typeof depth.mask === "boolean" ? depth.mask : true,
        depth.range ? depth.range[0] : 0,
        depth.range ? depth.range[1] : 1,
    );
}

function parseStencil(
    gl: WebGL2RenderingContext,
    stencil: CommandProps<void>["stencil"],
): StencilDescriptor | undefined {
    if (!stencil) { return undefined; }
    return new StencilDescriptor(
        mapGlDepthOrStencilFunc(
            gl,
            typeof stencil.func.func === "object"
                ? stencil.func.func.front
                : stencil.func.func,
        ),
        mapGlDepthOrStencilFunc(
            gl,
            typeof stencil.func.func === "object"
                ? stencil.func.func.back
                : stencil.func.func,
        ),
        typeof stencil.func.ref !== "undefined"
            ? typeof stencil.func.ref === "object"
                ? stencil.func.ref.front
                : stencil.func.ref
            : 1,
        typeof stencil.func.ref !== "undefined"
            ? typeof stencil.func.ref === "object"
                ? stencil.func.ref.back
                : stencil.func.ref
            : 1,
        typeof stencil.func.mask !== "undefined"
            ? typeof stencil.func.mask === "object"
                ? stencil.func.mask.front
                : stencil.func.mask
            : 0xFF,
        typeof stencil.func.mask !== "undefined"
            ? typeof stencil.func.mask === "object"
                ? stencil.func.mask.back
                : stencil.func.mask
            : 0xFF,
        typeof stencil.mask !== "undefined"
            ? typeof stencil.mask === "object"
                ? stencil.mask.front
                : stencil.mask
            : 0xFF,
        typeof stencil.mask !== "undefined"
            ? typeof stencil.mask === "object"
                ? stencil.mask.back
                : stencil.mask
            : 0xFF,
        mapGlStencilOp(
            gl,
            stencil.op
                ? typeof stencil.op.fail === "object"
                    ? stencil.op.fail.front
                    : stencil.op.fail
                : StencilOp.KEEP,
        ),
        mapGlStencilOp(
            gl,
            stencil.op
                ? typeof stencil.op.fail === "object"
                    ? stencil.op.fail.back
                    : stencil.op.fail
                : StencilOp.KEEP,
        ),
        mapGlStencilOp(
            gl,
            stencil.op
                ? typeof stencil.op.zfail === "object"
                    ? stencil.op.zfail.front
                    : stencil.op.zfail
                : StencilOp.KEEP,
        ),
        mapGlStencilOp(
            gl,
            stencil.op
                ? typeof stencil.op.zfail === "object"
                    ? stencil.op.zfail.back
                    : stencil.op.zfail
                : StencilOp.KEEP,
        ),
        mapGlStencilOp(
            gl,
            stencil.op
                ? typeof stencil.op.zpass === "object"
                    ? stencil.op.zpass.front
                    : stencil.op.zpass
                : StencilOp.KEEP,
        ),
        mapGlStencilOp(
            gl,
            stencil.op
                ? typeof stencil.op.zpass === "object"
                    ? stencil.op.zpass.back
                    : stencil.op.zpass
                : StencilOp.KEEP,
        ),
    );
}

function parseBlend(
    gl: WebGL2RenderingContext,
    blend: CommandProps<void>["blend"],
): BlendDescriptor | undefined {
    if (!blend) { return undefined; }
    return new BlendDescriptor(
        mapGlBlendFunc(
            gl,
            typeof blend.func.src === "object"
                ? blend.func.src.rgb
                : blend.func.src,
        ),
        mapGlBlendFunc(
            gl,
            typeof blend.func.src === "object"
                ? blend.func.src.alpha
                : blend.func.src,
        ),
        mapGlBlendFunc(
            gl,
            typeof blend.func.dst === "object"
                ? blend.func.dst.rgb
                : blend.func.dst,
        ),
        mapGlBlendFunc(
            gl,
            typeof blend.func.dst === "object"
                ? blend.func.dst.alpha
                : blend.func.dst,
        ),
        mapGlBlendEquation(
            gl,
            blend.equation
                ? typeof blend.equation === "object"
                    ? blend.equation.rgb
                    : blend.equation
                : BlendEquation.ADD,
        ),
        mapGlBlendEquation(
            gl,
            blend.equation
                ? typeof blend.equation === "object"
                    ? blend.equation.alpha
                    : blend.equation
                : BlendEquation.ADD,
        ),
        blend.color,
    );
}
