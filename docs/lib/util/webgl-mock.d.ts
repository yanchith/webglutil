export interface Canvas {
    width: number;
    height: number;
    clientWidth: number;
    clientHeight: number;
}
export declare class WebGL2RenderingContextMock {
    canvas: Canvas;
    drawingBufferWidth: number;
    drawingBufferHeight: number;
    static DEPTH_BUFFER_BIT: number;
    static STENCIL_BUFFER_BIT: number;
    static COLOR_BUFFER_BIT: number;
    static POINTS: number;
    static LINES: number;
    static LINE_LOOP: number;
    static LINE_STRIP: number;
    static TRIANGLES: number;
    static TRIANGLE_STRIP: number;
    static TRIANGLE_FAN: number;
    static ZERO: number;
    static ONE: number;
    static SRC_COLOR: number;
    static ONE_MINUS_SRC_COLOR: number;
    static SRC_ALPHA: number;
    static ONE_MINUS_SRC_ALPHA: number;
    static DST_ALPHA: number;
    static ONE_MINUS_DST_ALPHA: number;
    static DST_COLOR: number;
    static ONE_MINUS_DST_COLOR: number;
    static SRC_ALPHA_SATURATE: number;
    static FUNC_ADD: number;
    static BLEND_EQUATION: number;
    static BLEND_EQUATION_RGB: number;
    static BLEND_EQUATION_ALPHA: number;
    static FUNC_SUBTRACT: number;
    static FUNC_REVERSE_SUBTRACT: number;
    static BLEND_DST_RGB: number;
    static BLEND_SRC_RGB: number;
    static BLEND_DST_ALPHA: number;
    static BLEND_SRC_ALPHA: number;
    static CONSTANT_COLOR: number;
    static ONE_MINUS_CONSTANT_COLOR: number;
    static CONSTANT_ALPHA: number;
    static ONE_MINUS_CONSTANT_ALPHA: number;
    static BLEND_COLOR: number;
    static ARRAY_BUFFER: number;
    static ELEMENT_ARRAY_BUFFER: number;
    static ARRAY_BUFFER_BINDING: number;
    static ELEMENT_ARRAY_BUFFER_BINDING: number;
    static STREAM_DRAW: number;
    static STATIC_DRAW: number;
    static DYNAMIC_DRAW: number;
    static BUFFER_SIZE: number;
    static BUFFER_USAGE: number;
    static CURRENT_VERTEX_ATTRIB: number;
    static FRONT: number;
    static BACK: number;
    static FRONT_AND_BACK: number;
    static TEXTURE_2D: number;
    static CULL_FACE: number;
    static BLEND: number;
    static DITHER: number;
    static STENCIL_TEST: number;
    static DEPTH_TEST: number;
    static SCISSOR_TEST: number;
    static POLYGON_OFFSET_FILL: number;
    static SAMPLE_ALPHA_TO_COVERAGE: number;
    static SAMPLE_COVERAGE: number;
    static NO_ERROR: number;
    static INVALID_ENUM: number;
    static INVALID_VALUE: number;
    static INVALID_OPERATION: number;
    static OUT_OF_MEMORY: number;
    static CW: number;
    static CCW: number;
    static LINE_WIDTH: number;
    static ALIASED_POINT_SIZE_RANGE: number;
    static ALIASED_LINE_WIDTH_RANGE: number;
    static CULL_FACE_MODE: number;
    static FRONT_FACE: number;
    static DEPTH_RANGE: number;
    static DEPTH_WRITEMASK: number;
    static DEPTH_CLEAR_VALUE: number;
    static DEPTH_FUNC: number;
    static STENCIL_CLEAR_VALUE: number;
    static STENCIL_FUNC: number;
    static STENCIL_FAIL: number;
    static STENCIL_PASS_DEPTH_FAIL: number;
    static STENCIL_PASS_DEPTH_PASS: number;
    static STENCIL_REF: number;
    static STENCIL_VALUE_MASK: number;
    static STENCIL_WRITEMASK: number;
    static STENCIL_BACK_FUNC: number;
    static STENCIL_BACK_FAIL: number;
    static STENCIL_BACK_PASS_DEPTH_FAIL: number;
    static STENCIL_BACK_PASS_DEPTH_PASS: number;
    static STENCIL_BACK_REF: number;
    static STENCIL_BACK_VALUE_MASK: number;
    static STENCIL_BACK_WRITEMASK: number;
    static VIEWPORT: number;
    static SCISSOR_BOX: number;
    static COLOR_CLEAR_VALUE: number;
    static COLOR_WRITEMASK: number;
    static UNPACK_ALIGNMENT: number;
    static PACK_ALIGNMENT: number;
    static MAX_TEXTURE_SIZE: number;
    static MAX_VIEWPORT_DIMS: number;
    static SUBPIXEL_BITS: number;
    static RED_BITS: number;
    static GREEN_BITS: number;
    static BLUE_BITS: number;
    static ALPHA_BITS: number;
    static DEPTH_BITS: number;
    static STENCIL_BITS: number;
    static POLYGON_OFFSET_UNITS: number;
    static POLYGON_OFFSET_FACTOR: number;
    static TEXTURE_BINDING_2D: number;
    static SAMPLE_BUFFERS: number;
    static SAMPLES: number;
    static SAMPLE_COVERAGE_VALUE: number;
    static SAMPLE_COVERAGE_INVERT: number;
    static COMPRESSED_TEXTURE_FORMATS: number;
    static DONT_CARE: number;
    static FASTEST: number;
    static NICEST: number;
    static GENERATE_MIPMAP_HINT: number;
    static BYTE: number;
    static UNSIGNED_BYTE: number;
    static SHORT: number;
    static UNSIGNED_SHORT: number;
    static INT: number;
    static UNSIGNED_INT: number;
    static FLOAT: number;
    static DEPTH_COMPONENT: number;
    static ALPHA: number;
    static RGB: number;
    static RGBA: number;
    static LUMINANCE: number;
    static LUMINANCE_ALPHA: number;
    static UNSIGNED_SHORT_4_4_4_4: number;
    static UNSIGNED_SHORT_5_5_5_1: number;
    static UNSIGNED_SHORT_5_6_5: number;
    static FRAGMENT_SHADER: number;
    static VERTEX_SHADER: number;
    static MAX_VERTEX_ATTRIBS: number;
    static MAX_VERTEX_UNIFORM_VECTORS: number;
    static MAX_VARYING_VECTORS: number;
    static MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
    static MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
    static MAX_TEXTURE_IMAGE_UNITS: number;
    static MAX_FRAGMENT_UNIFORM_VECTORS: number;
    static SHADER_TYPE: number;
    static DELETE_STATUS: number;
    static LINK_STATUS: number;
    static VALIDATE_STATUS: number;
    static ATTACHED_SHADERS: number;
    static ACTIVE_UNIFORMS: number;
    static ACTIVE_ATTRIBUTES: number;
    static SHADING_LANGUAGE_VERSION: number;
    static CURRENT_PROGRAM: number;
    static NEVER: number;
    static LESS: number;
    static EQUAL: number;
    static LEQUAL: number;
    static GREATER: number;
    static NOTEQUAL: number;
    static GEQUAL: number;
    static ALWAYS: number;
    static KEEP: number;
    static REPLACE: number;
    static INCR: number;
    static DECR: number;
    static INVERT: number;
    static INCR_WRAP: number;
    static DECR_WRAP: number;
    static VENDOR: number;
    static RENDERER: number;
    static VERSION: number;
    static NEAREST: number;
    static LINEAR: number;
    static NEAREST_MIPMAP_NEAREST: number;
    static LINEAR_MIPMAP_NEAREST: number;
    static NEAREST_MIPMAP_LINEAR: number;
    static LINEAR_MIPMAP_LINEAR: number;
    static TEXTURE_MAG_FILTER: number;
    static TEXTURE_MIN_FILTER: number;
    static TEXTURE_WRAP_S: number;
    static TEXTURE_WRAP_T: number;
    static TEXTURE: number;
    static TEXTURE_CUBE_MAP: number;
    static TEXTURE_BINDING_CUBE_MAP: number;
    static TEXTURE_CUBE_MAP_POSITIVE_X: number;
    static TEXTURE_CUBE_MAP_NEGATIVE_X: number;
    static TEXTURE_CUBE_MAP_POSITIVE_Y: number;
    static TEXTURE_CUBE_MAP_NEGATIVE_Y: number;
    static TEXTURE_CUBE_MAP_POSITIVE_Z: number;
    static TEXTURE_CUBE_MAP_NEGATIVE_Z: number;
    static MAX_CUBE_MAP_TEXTURE_SIZE: number;
    static TEXTURE0: number;
    static TEXTURE1: number;
    static TEXTURE2: number;
    static TEXTURE3: number;
    static TEXTURE4: number;
    static TEXTURE5: number;
    static TEXTURE6: number;
    static TEXTURE7: number;
    static TEXTURE8: number;
    static TEXTURE9: number;
    static TEXTURE10: number;
    static TEXTURE11: number;
    static TEXTURE12: number;
    static TEXTURE13: number;
    static TEXTURE14: number;
    static TEXTURE15: number;
    static TEXTURE16: number;
    static TEXTURE17: number;
    static TEXTURE18: number;
    static TEXTURE19: number;
    static TEXTURE20: number;
    static TEXTURE21: number;
    static TEXTURE22: number;
    static TEXTURE23: number;
    static TEXTURE24: number;
    static TEXTURE25: number;
    static TEXTURE26: number;
    static TEXTURE27: number;
    static TEXTURE28: number;
    static TEXTURE29: number;
    static TEXTURE30: number;
    static TEXTURE31: number;
    static ACTIVE_TEXTURE: number;
    static REPEAT: number;
    static CLAMP_TO_EDGE: number;
    static MIRRORED_REPEAT: number;
    static FLOAT_VEC2: number;
    static FLOAT_VEC3: number;
    static FLOAT_VEC4: number;
    static INT_VEC2: number;
    static INT_VEC3: number;
    static INT_VEC4: number;
    static BOOL: number;
    static BOOL_VEC2: number;
    static BOOL_VEC3: number;
    static BOOL_VEC4: number;
    static FLOAT_MAT2: number;
    static FLOAT_MAT3: number;
    static FLOAT_MAT4: number;
    static SAMPLER_2D: number;
    static SAMPLER_CUBE: number;
    static VERTEX_ATTRIB_ARRAY_ENABLED: number;
    static VERTEX_ATTRIB_ARRAY_SIZE: number;
    static VERTEX_ATTRIB_ARRAY_STRIDE: number;
    static VERTEX_ATTRIB_ARRAY_TYPE: number;
    static VERTEX_ATTRIB_ARRAY_NORMALIZED: number;
    static VERTEX_ATTRIB_ARRAY_POINTER: number;
    static VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;
    static IMPLEMENTATION_COLOR_READ_TYPE: number;
    static IMPLEMENTATION_COLOR_READ_FORMAT: number;
    static COMPILE_STATUS: number;
    static LOW_FLOAT: number;
    static MEDIUM_FLOAT: number;
    static HIGH_FLOAT: number;
    static LOW_INT: number;
    static MEDIUM_INT: number;
    static HIGH_INT: number;
    static FRAMEBUFFER: number;
    static RENDERBUFFER: number;
    static RGBA4: number;
    static RGB5_A1: number;
    static RGB565: number;
    static DEPTH_COMPONENT16: number;
    static STENCIL_INDEX: number;
    static STENCIL_INDEX8: number;
    static DEPTH_STENCIL: number;
    static RENDERBUFFER_WIDTH: number;
    static RENDERBUFFER_HEIGHT: number;
    static RENDERBUFFER_INTERNAL_FORMAT: number;
    static RENDERBUFFER_RED_SIZE: number;
    static RENDERBUFFER_GREEN_SIZE: number;
    static RENDERBUFFER_BLUE_SIZE: number;
    static RENDERBUFFER_ALPHA_SIZE: number;
    static RENDERBUFFER_DEPTH_SIZE: number;
    static RENDERBUFFER_STENCIL_SIZE: number;
    static FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;
    static FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;
    static FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;
    static FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;
    static COLOR_ATTACHMENT0: number;
    static DEPTH_ATTACHMENT: number;
    static STENCIL_ATTACHMENT: number;
    static DEPTH_STENCIL_ATTACHMENT: number;
    static NONE: number;
    static FRAMEBUFFER_COMPLETE: number;
    static FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;
    static FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;
    static FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;
    static FRAMEBUFFER_UNSUPPORTED: number;
    static FRAMEBUFFER_BINDING: number;
    static RENDERBUFFER_BINDING: number;
    static MAX_RENDERBUFFER_SIZE: number;
    static INVALID_FRAMEBUFFER_OPERATION: number;
    static UNPACK_FLIP_Y_WEBGL: number;
    static UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;
    static CONTEXT_LOST_WEBGL: number;
    static UNPACK_COLORSPACE_CONVERSION_WEBGL: number;
    static BROWSER_DEFAULT_WEBGL: number;
    activeTexture(): void;
    attachShader(): void;
    bindAttribLocation(): void;
    bindBuffer(): void;
    bindFramebuffer(): void;
    bindRenderbuffer(): void;
    bindTexture(): void;
    bindVertexArray(): void;
    blendColor(): void;
    blendEquation(): void;
    blendEquationSeparate(): void;
    blendFunc(): void;
    blendFuncSeparate(): void;
    bufferData(): void;
    bufferSubData(): void;
    checkFramebufferStatus(): void;
    clear(): void;
    clearColor(): void;
    clearDepth(): void;
    clearStencil(): void;
    colorMask(): void;
    compileShader(): void;
    compressedTexImage2D(): void;
    compressedTexSubImage2D(): void;
    copyTexImage2D(): void;
    copyTexSubImage2D(): void;
    createBuffer(): void;
    createFramebuffer(): void;
    createProgram(): void;
    createRenderbuffer(): void;
    createShader(): void;
    createTexture(): void;
    createVertexArray(): void;
    cullFace(): void;
    deleteBuffer(): void;
    deleteFramebuffer(): void;
    deleteProgram(): void;
    deleteRenderbuffer(): void;
    deleteShader(): void;
    deleteTexture(): void;
    depthFunc(): void;
    depthMask(): void;
    depthRange(): void;
    detachShader(): void;
    disable(): void;
    disableVertexAttribArray(): void;
    drawArrays(): void;
    drawBuffers(): void;
    drawElements(): void;
    enable(): void;
    enableVertexAttribArray(): void;
    finish(): void;
    flush(): void;
    framebufferRenderbuffer(): void;
    framebufferTexture2D(): void;
    frontFace(): void;
    generateMipmap(): void;
    getActiveAttrib(): void;
    getActiveUniform(): void;
    getAttachedShaders(): void;
    getAttribLocation(): void;
    getBufferParameter(): void;
    getContextAttributes(): void;
    getError(): void;
    getExtension(): void;
    getFramebufferAttachmentParameter(): void;
    getParameter(): void;
    getProgramParameter(): void;
    getProgramInfoLog(): void;
    getRenderbufferParameter(): void;
    getShaderParameter(): void;
    getShaderInfoLog(): void;
    getShaderPrecisionFormat(): void;
    getShaderSource(): void;
    getSupportedExtensions(): void;
    getTexParameter(): void;
    getUniform(): void;
    getUniformLocation(): void;
    getVertexAttrib(): void;
    getVertexAttribOffset(): void;
    hint(): void;
    isBuffer(): void;
    isContextLost(): void;
    isEnabled(): void;
    isFramebuffer(): void;
    isProgram(): void;
    isRenderbuffer(): void;
    isShader(): void;
    isTexture(): void;
    lineWidth(): void;
    linkProgram(): void;
    pixelStorei(): void;
    polygonOffset(): void;
    readPixels(): void;
    renderbufferStorage(): void;
    sampleCoverage(): void;
    scissor(): void;
    shaderSource(): void;
    stencilFunc(): void;
    stencilFuncSeparate(): void;
    stencilMask(): void;
    stencilMaskSeparate(): void;
    stencilOp(): void;
    stencilOpSeparate(): void;
    texParameterf(): void;
    texParameteri(): void;
    texImage2D(): void;
    texSubImage2D(): void;
    uniform1f(): void;
    uniform1fv(): void;
    uniform1i(): void;
    uniform1iv(): void;
    uniform2f(): void;
    uniform2fv(): void;
    uniform2i(): void;
    uniform2iv(): void;
    uniform3f(): void;
    uniform3fv(): void;
    uniform3i(): void;
    uniform3iv(): void;
    uniform4f(): void;
    uniform4fv(): void;
    uniform4i(): void;
    uniform4iv(): void;
    uniformMatrix2fv(): void;
    uniformMatrix3fv(): void;
    uniformMatrix4fv(): void;
    useProgram(): void;
    validateProgram(): void;
    vertexAttrib1f(): void;
    vertexAttrib1fv(): void;
    vertexAttrib2f(): void;
    vertexAttrib2fv(): void;
    vertexAttrib3f(): void;
    vertexAttrib3fv(): void;
    vertexAttrib4f(): void;
    vertexAttrib4fv(): void;
    vertexAttribPointer(): void;
    viewport(): void;
    constructor(canvas: Canvas);
}
//# sourceMappingURL=webgl-mock.d.ts.map