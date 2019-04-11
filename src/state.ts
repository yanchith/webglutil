export class DepthTestDescriptor {
    static equals(
        left: DepthTestDescriptor | null,
        right: DepthTestDescriptor | null,
    ): boolean {
        if (left === right) { return true; }
        if (!left || !right) { return false; }
        if (left.func !== right.func) { return false; }
        if (left.mask !== right.mask) { return false; }
        if (left.rangeStart !== right.rangeStart) { return false; }
        if (left.rangeEnd !== right.rangeEnd) { return false; }
        return true;
    }

    constructor(
        readonly func: number,
        readonly mask: boolean,
        readonly rangeStart: number,
        readonly rangeEnd: number,
    ) { }
}

export class StencilTestDescriptor {
    static equals(
        left: StencilTestDescriptor | null,
        right: StencilTestDescriptor | null,
    ): boolean {
        if (left === right) { return true; }
        if (!left || !right) { return false; }
        if (left.fFn !== right.fFn) { return false; }
        if (left.bFn !== right.bFn) { return false; }
        if (left.fFnRef !== right.fFnRef) { return false; }
        if (left.bFnRef !== right.bFnRef) { return false; }
        if (left.fFnMask !== right.fFnMask) { return false; }
        if (left.bFnMask !== right.bFnMask) { return false; }
        if (left.fMask !== right.fMask) { return false; }
        if (left.bMask !== right.bMask) { return false; }
        if (left.fOpFail !== right.fOpFail) { return false; }
        if (left.bOpFail !== right.bOpFail) { return false; }
        if (left.fOpZFail !== right.fOpZFail) { return false; }
        if (left.bOpZFail !== right.bOpZFail) { return false; }
        if (left.fOpZPass !== right.fOpZPass) { return false; }
        if (left.bOpZPass !== right.bOpZPass) { return false; }
        return true;
    }

    constructor(
        readonly fFn: number,
        readonly bFn: number,
        readonly fFnRef: number,
        readonly bFnRef: number,
        readonly fFnMask: number,
        readonly bFnMask: number,
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

export class BlendDescriptor {
    static equals(
        left: BlendDescriptor | null,
        right: BlendDescriptor | null,
    ): boolean {
        if (left === right) { return true; }
        if (!left || !right) { return false; }
        if (left.srcRGB !== right.srcRGB) { return false; }
        if (left.srcAlpha !== right.srcAlpha) { return false; }
        if (left.dstRGB !== right.dstRGB) { return false; }
        if (left.dstAlpha !== right.dstAlpha) { return false; }
        if (left.eqnRGB !== right.eqnRGB) { return false; }
        if (left.eqnAlpha !== right.eqnAlpha) { return false; }
        if (left.color === right.color) { return true; }
        if (!left.color || !right.color) { return false; }
        if (left.color[0] !== right.color[0]) { return false; }
        if (left.color[1] !== right.color[1]) { return false; }
        if (left.color[2] !== right.color[2]) { return false; }
        if (left.color[3] !== right.color[3]) { return false; }
        return true;
    }

    constructor(
        readonly srcRGB: number,
        readonly srcAlpha: number,
        readonly dstRGB: number,
        readonly dstAlpha: number,
        readonly eqnRGB: number,
        readonly eqnAlpha: number,
        readonly color?: [number, number, number, number],
    ) { }
}

function arrayEquals(left: number[], right: number[]): boolean {
    if (left.length !== right.length) {
        return false;
    }

    for (let i = 0; i < left.length; ++i) {
        if (left[i] !== right[i]) {
            return false;
        }
    }

    return true;
}

export class State {

    readonly gl: WebGL2RenderingContext;

    private target: object | null = null;
    private command: object | null = null;

    private glProgram: WebGLProgram | null = null;
    private glDrawFramebuffer: WebGLFramebuffer | null = null;
    private glDrawBuffers: number[];

    private depthTest: DepthTestDescriptor | null = null;
    private stencilTest: StencilTestDescriptor | null = null;
    private blend: BlendDescriptor | null = null;


    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.glDrawBuffers = [gl.BACK];
    }

    setDepthTest(depthTest: DepthTestDescriptor | null): void {
        if (!DepthTestDescriptor.equals(this.depthTest, depthTest)) {
            this.depthTest = depthTest;
            this.applyDepthTest();
        }
    }

    setStencilTest(stencilTest: StencilTestDescriptor | null): void {
        if (!StencilTestDescriptor.equals(this.stencilTest, stencilTest)) {
            this.stencilTest = stencilTest;
            this.applyStencilTest();
        }
    }

    setBlend(blend: BlendDescriptor | null): void {
        if (!BlendDescriptor.equals(this.blend, blend)) {
            this.blend = blend;
            this.applyBlend();
        }
    }

    /**
     * Bind a `Target` for this `State`. Each `Device` must have at
     * most one `Target` bound at any time. Nested target binding is not
     * supported even though it is not prohibited by the shape of the API:
     *
     * // This produces a runtime error
     * fbo.target((fbort) => {
     *     dev.target((rt) => rt.draw(...));
     *     fbort.draw(...);
     * });
     */
    bindTarget(
        target: object,
        glDrawFramebuffer: WebGLFramebuffer | null,
        glDrawBuffers: number[],
    ): void {
        if (this.target) {
            throw new Error("Cannot have two Targets bound at the same time");
        }

        const gl = this.gl;
        if (this.glDrawFramebuffer !== glDrawFramebuffer) {
            this.gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, glDrawFramebuffer);
            this.glDrawFramebuffer = glDrawFramebuffer;
        }
        if (!arrayEquals(this.glDrawBuffers, glDrawBuffers)) {
            this.gl.drawBuffers(glDrawBuffers);
            this.glDrawBuffers = glDrawBuffers;
        }
        this.target = target;
    }

    /**
     * Unbind currently bound target. Only forgets the target from `State`,
     * does not unbind the WebGL framebuffer.
     */
    unbindTarget(): void {
        if (!this.target) {
            throw new Error("Cannot unbind target, none bound");
        }

        this.target = null;
    }

    /**
     * Bind a `Command` for this `State`. Each `Device` must have at
     * most one `Command` bound at any time. Nested command binding is not
     * supported even though it is not prohibited by the shape of the API:
     *
     * // This produces a runtime error
     * dev.target((rt) => {
     *     rt.batch(cmd, (draw) => {
     *         rt.draw(cmd, attrs, props);
     *     });
     * });
     */
    bindCommand(command: object, glProgram: WebGLProgram | null): void {
        if (this.command) {
            throw new Error("Cannot have two Commands bound at the same time");
        }

        if (this.glProgram !== glProgram) {
            this.gl.useProgram(glProgram);
            this.glProgram = glProgram;
        }
        this.command = command;
    }

    /**
     * Unbind currently bound command. Only forgets the command from `State`,
     * does not unbind the WebGL program.
     */
    unbindCommand(): void {
        if (!this.command) {
            throw new Error("Cannot unbind command, none bound");
        }

        this.command = null;
    }

    assertTargetBound(
        target: object,
        op: "draw" | "batch-draw" | "blit" | "clear",
    ): void {
        if (this.target !== target) {
            throw new Error(`Trying to perform ${op}, expected target ${target}, got: ${this.target}`);
        }
    }

    assertCommandBound(command: object, op: "batch-draw"): void {
        if (this.command !== command) {
            throw new Error(`Trying to perform ${op}, expected command ${command}, got: ${this.command}`);
        }
    }

    assertTargetUnbound(): void {
        if (this.target) {
            throw new Error("A Target is already bound, cannot bind twice");
        }
    }

    assertCommandUnbound(): void {
        if (this.command) {
            throw new Error("A Command is already bound, cannot bind twice");
        }
    }

    private applyDepthTest(): void {
        const { gl, depthTest } = this;
        if (depthTest) {
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(depthTest.func);
            gl.depthMask(depthTest.mask);
            gl.depthRange(depthTest.rangeStart, depthTest.rangeEnd);
        } else {
            gl.disable(gl.DEPTH_TEST);
        }
    }

    private applyStencilTest(): void {
        const { gl, stencilTest } = this;
        if (stencilTest) {
            const {
                fFn,
                bFn,
                fFnRef,
                bFnRef,
                fFnMask,
                bFnMask,
                fMask,
                bMask,
                fOpFail,
                bOpFail,
                fOpZFail,
                bOpZFail,
                fOpZPass,
                bOpZPass,
            } = stencilTest;
            gl.enable(gl.STENCIL_TEST);
            gl.stencilFuncSeparate(gl.FRONT, fFn, fFnRef, fFnMask);
            gl.stencilFuncSeparate(gl.BACK, bFn, bFnRef, bFnMask);
            gl.stencilMaskSeparate(gl.FRONT, fMask);
            gl.stencilMaskSeparate(gl.BACK, bMask);
            gl.stencilOpSeparate(
                gl.FRONT,
                fOpFail,
                fOpZFail,
                fOpZPass,
            );
            gl.stencilOpSeparate(
                gl.BACK,
                bOpFail,
                bOpZFail,
                bOpZPass,
            );
        } else {
            gl.disable(gl.STENCIL_TEST);
        }
    }

    private applyBlend(): void {
        const { gl, blend } = this;
        if (blend) {
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(
                blend.srcRGB,
                blend.dstRGB,
                blend.srcAlpha,
                blend.dstAlpha,
            );
            gl.blendEquationSeparate(
                blend.eqnRGB,
                blend.eqnAlpha,
            );
            if (blend.color) {
                const [r, g, b, a] = blend.color;
                gl.blendColor(r, g, b, a);
            }
        } else { gl.disable(gl.BLEND); }
    }
}
