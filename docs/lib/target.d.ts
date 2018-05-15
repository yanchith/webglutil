import { BufferBits, Filter } from "./types";
export declare type Device = import("./device").Device;
export declare type Command<P> = import("./command").Command<P>;
export declare type UniformDescriptor<P> = import("./command").UniformDescriptor<P>;
export declare type TextureAccessor<P> = import("./command").TextureAccessor<P>;
export declare type Attributes = import("./attributes").Attributes;
export declare type Framebuffer = import("./framebuffer").Framebuffer;
export interface TargetClearOptions {
    r?: number;
    g?: number;
    b?: number;
    a?: number;
    depth?: number;
    stencil?: number;
}
export declare type BlitFilter = Filter.NEAREST | Filter.LINEAR;
export interface TargetBlitOptions {
    xOffset?: number;
    yOffset?: number;
    width?: number;
    height?: number;
    filter?: BlitFilter;
}
export declare class Viewport {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    static equals(left: Viewport, right: Viewport): boolean;
    constructor(x: number, y: number, width: number, height: number);
}
/**
 * Target represents a drawable surface. Get hold of targets with
 * `device.target()` or `framebuffer.target()`.
 */
export declare class Target {
    readonly viewport: Viewport;
    private dev;
    private glDrawBuffers;
    private glFramebuffer;
    constructor(dev: Device, glDrawBuffers: number[], glFramebuffer: WebGLFramebuffer | null, width?: number, height?: number);
    /**
     * Run the callback with the target bound. This is called automatically,
     * when obtaining a target via `device.target()` or `framebuffer.target()`.
     *
     * All drawing to the target should be done within the callback to prevent
     * unnecessary rebinding.
     */
    with(cb: (rt: Target) => void): void;
    /**
     * Clear selected buffers to provided values.
     */
    clear(bits: BufferBits, { r, g, b, a, depth, stencil, }?: TargetClearOptions): void;
    /**
     * Blit source framebuffer onto this render target. Use buffer bits to
     * choose buffers to blit.
     */
    blit(source: Framebuffer, bits: BufferBits, { xOffset, yOffset, width, height, filter, }?: TargetBlitOptions): void;
    /**
     * Draw to this target with a void command and attributes.
     */
    draw(cmd: Command<void> | Command<undefined>, attrs: Attributes): void;
    /**
     * Draw to this target with a command, attributes, and command properties.
     * The properties are passed to the command's uniform or texture callbacks,
     * if used.
     */
    draw<P>(cmd: Command<P>, attrs: Attributes, props: P): void;
    /**
     * Perform multiple draws to this target with the same command, but multiple
     * attributes and command properties. The properties are passed to the
     * command's uniform or texture callbacks, if used.
     *
     * All drawing should be performed within the callback to prevent
     * unnecesasry rebinding.
     */
    batch<P>(cmd: Command<P>, cb: (draw: (attrs: Attributes, props: P) => void) => void): void;
    private drawArrays;
    private drawElements;
    private textures;
    private uniforms;
}
