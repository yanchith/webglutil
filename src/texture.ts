export const enum TextureColorStorageFormat {
    // RED
    R8 = 0x8229,
    R8_SNORM = 0x8F94,
    R8UI = 0x8232,
    R8I = 0x8231,
    R16UI = 0x8234,
    R16I = 0x8233,
    R32UI = 0x8236,
    R32I = 0x8235,
    R16F = 0x822D,
    R32F = 0x822E,

    // RG
    RG8 = 0x822B,
    RG8_SNORM = 0x8F95,
    RG8UI = 0x8238,
    RG8I = 0x8237,
    RG16UI = 0x823A,
    RG16I = 0x8239,
    RG32UI = 0x823C,
    RG32I = 0x823B,
    RG16F = 0x822F,
    RG32F = 0x8230,

    // RGB
    RGB8 = 0x8051,
    RGB8_SNORM = 0x8F96,
    RGB8UI = 0x8D7D,
    RGB8I = 0x8D8F,
    RGB16UI = 0x8D77,
    RGB16I = 0x8D89,
    RGB32UI = 0x8D71,
    RGB32I = 0x8D83,
    RGB16F = 0x881B,
    RGB32F = 0x8815,

    // RGBA
    RGBA8 = 0x8058,
    RGBA8_SNORM = 0x8F97,
    RGBA8UI = 0x8D7C,
    RGBA8I = 0x8D8E,
    RGBA16UI = 0x8D76,
    RGBA16I = 0x8D88,
    RGBA32UI = 0x8D70,
    RGBA32I = 0x8D82,
    RGBA16F = 0x881A,
    RGBA32F = 0x8814,

    // TODO: support exotic formats

    // ~LUMINANCE ALPHA
    // LUMINANCE_ALPHA
    // LUMINANCE
    // ALPHA
}

export const enum TextureDepthStorageFormat {
    DEPTH_COMPONENT16 = 0x81A5,
    DEPTH_COMPONENT24 = 0x81A6,
    DEPTH_COMPONENT32F = 0x8CAC,
}

export const enum TextureDepthStencilStorageFormat {
    DEPTH24_STENCIL8 = 0x88F0,
    DEPTH32F_STENCIL8 = 0x8CAD,
}

export type TextureStorageFormat =
    | TextureColorStorageFormat
    | TextureDepthStorageFormat
    | TextureDepthStencilStorageFormat
    ;

export const enum TextureFormat {
    RED = 0x1903,
    RG = 0x8227,
    RGB = 0x1907,
    RGBA = 0x1908,
    RED_INTEGER = 0x8D94,
    RG_INTEGER = 0x8228,
    RGB_INTEGER = 0x8D98,
    RGBA_INTEGER = 0x8D99,

    // TODO: support exotic formats

    DEPTH_COMPONENT = 0x1902,
    DEPTH_STENCIL = 0x84F9,
    // LUMINANCE_ALPHA
    // LUMINANCE
    // ALPHA
}

export const enum TextureDataType {
    BYTE = 0x1400,
    UNSIGNED_BYTE = 0x1401,
    SHORT = 0x1402,
    UNSIGNED_SHORT = 0x1403,
    INT = 0x1404,
    UNSIGNED_INT = 0x1405,
    FLOAT = 0x1406,
    HALF_FLOAT = 0x140B,

    // TODO: support exotic formats
    // UNSIGNED_SHORT_4_4_4_4
    // UNSIGNED_SHORT_5_5_5_1
    // UNSIGNED_SHORT_5_6_5

    UNSIGNED_INT_24_8 = 0x84FA,
    // UNSIGNED_INT_5_9_9_9_REV
    // UNSIGNED_INT_2_10_10_10_REV
    // UNSIGNED_INT_10F_11F_11F_REV

    FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD,
}

export const enum TextureWrap {
    CLAMP_TO_EDGE = 0x812F,
    REPEAT = 0x2901,
    MIRRORED_REPEAT = 0x8370,
}

export const enum TextureMinFilter {
    NEAREST = 0x2600,
    LINEAR = 0x2601,
    NEAREST_MIPMAP_NEAREST = 0x2700,
    LINEAR_MIPMAP_NEAREST = 0x2701,
    NEAREST_MIPMAP_LINEAR = 0x2702,
    LINEAR_MIPMAP_LINEAR = 0x2703,
}

export const enum TextureMagFilter {
    NEAREST = 0x2600,
    LINEAR = 0x2601,
}

export interface StorageFormatToFormat {

    // RED
    [TextureColorStorageFormat.R8]: TextureFormat.RED;
    [TextureColorStorageFormat.R8_SNORM]: TextureFormat.RED;
    [TextureColorStorageFormat.R8UI]: TextureFormat.RED_INTEGER;
    [TextureColorStorageFormat.R8I]: TextureFormat.RED_INTEGER;
    [TextureColorStorageFormat.R16UI]: TextureFormat.RED_INTEGER;
    [TextureColorStorageFormat.R16I]: TextureFormat.RED_INTEGER;
    [TextureColorStorageFormat.R32UI]: TextureFormat.RED_INTEGER;
    [TextureColorStorageFormat.R32I]: TextureFormat.RED_INTEGER;
    [TextureColorStorageFormat.R16F]: TextureFormat.RED;
    [TextureColorStorageFormat.R32F]: TextureFormat.RED;

    // RG
    [TextureColorStorageFormat.RG8]: TextureFormat.RG;
    [TextureColorStorageFormat.RG8_SNORM]: TextureFormat.RG;
    [TextureColorStorageFormat.RG8UI]: TextureFormat.RG_INTEGER;
    [TextureColorStorageFormat.RG8I]: TextureFormat.RG_INTEGER;
    [TextureColorStorageFormat.RG16UI]: TextureFormat.RG_INTEGER;
    [TextureColorStorageFormat.RG16I]: TextureFormat.RG_INTEGER;
    [TextureColorStorageFormat.RG32UI]: TextureFormat.RG_INTEGER;
    [TextureColorStorageFormat.RG32I]: TextureFormat.RG_INTEGER;
    [TextureColorStorageFormat.RG16F]: TextureFormat.RG;
    [TextureColorStorageFormat.RG32F]: TextureFormat.RG;

    // RGB
    [TextureColorStorageFormat.RGB8]: TextureFormat.RGB;
    [TextureColorStorageFormat.RGB8_SNORM]: TextureFormat.RGB;
    [TextureColorStorageFormat.RGB8UI]: TextureFormat.RGB_INTEGER;
    [TextureColorStorageFormat.RGB8I]: TextureFormat.RGB_INTEGER;
    [TextureColorStorageFormat.RGB16UI]: TextureFormat.RGB_INTEGER;
    [TextureColorStorageFormat.RGB16I]: TextureFormat.RGB_INTEGER;
    [TextureColorStorageFormat.RGB32UI]: TextureFormat.RGB_INTEGER;
    [TextureColorStorageFormat.RGB32I]: TextureFormat.RGB_INTEGER;
    [TextureColorStorageFormat.RGB16F]: TextureFormat.RGB;
    [TextureColorStorageFormat.RGB32F]: TextureFormat.RGB;

    // RGBA
    [TextureColorStorageFormat.RGBA8]: TextureFormat.RGBA;
    [TextureColorStorageFormat.RGBA8_SNORM]: TextureFormat.RGBA;
    [TextureColorStorageFormat.RGBA8UI]: TextureFormat.RGBA_INTEGER;
    [TextureColorStorageFormat.RGBA8I]: TextureFormat.RGBA_INTEGER;
    [TextureColorStorageFormat.RGBA16UI]: TextureFormat.RGBA_INTEGER;
    [TextureColorStorageFormat.RGBA16I]: TextureFormat.RGBA_INTEGER;
    [TextureColorStorageFormat.RGBA32UI]: TextureFormat.RGBA_INTEGER;
    [TextureColorStorageFormat.RGBA32I]: TextureFormat.RGBA_INTEGER;
    [TextureColorStorageFormat.RGBA16F]: TextureFormat.RGBA;
    [TextureColorStorageFormat.RGBA32F]: TextureFormat.RGBA;

    // DEPTH
    [TextureDepthStorageFormat.DEPTH_COMPONENT16]:
        TextureFormat.DEPTH_COMPONENT;
    [TextureDepthStorageFormat.DEPTH_COMPONENT24]:
        TextureFormat.DEPTH_COMPONENT;
    [TextureDepthStorageFormat.DEPTH_COMPONENT32F]:
        TextureFormat.DEPTH_COMPONENT;

    // DEPTH STENCIL
    [TextureDepthStencilStorageFormat.DEPTH24_STENCIL8]:
        TextureFormat.DEPTH_STENCIL;
    [TextureDepthStencilStorageFormat.DEPTH32F_STENCIL8]:
        TextureFormat.DEPTH_STENCIL;
}

export interface StorageFormatToDataType {

    // RED
    [TextureColorStorageFormat.R8]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.R8_SNORM]: TextureDataType.BYTE;
    [TextureColorStorageFormat.R8UI]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.R8I]: TextureDataType.BYTE;
    [TextureColorStorageFormat.R16UI]: TextureDataType.UNSIGNED_SHORT;
    [TextureColorStorageFormat.R16I]: TextureDataType.SHORT;
    [TextureColorStorageFormat.R32UI]: TextureDataType.UNSIGNED_INT;
    [TextureColorStorageFormat.R32I]: TextureDataType.INT;
    [TextureColorStorageFormat.R16F]:
        | TextureDataType.HALF_FLOAT
        | TextureDataType.FLOAT
        ;
    [TextureColorStorageFormat.R32F]: TextureDataType.FLOAT;

    // RG
    [TextureColorStorageFormat.RG8]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.RG8_SNORM]: TextureDataType.BYTE;
    [TextureColorStorageFormat.RG8UI]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.RG8I]: TextureDataType.BYTE;
    [TextureColorStorageFormat.RG16UI]: TextureDataType.UNSIGNED_SHORT;
    [TextureColorStorageFormat.RG16I]: TextureDataType.SHORT;
    [TextureColorStorageFormat.RG32UI]: TextureDataType.UNSIGNED_INT;
    [TextureColorStorageFormat.RG32I]: TextureDataType.INT;
    [TextureColorStorageFormat.RG16F]:
        TextureDataType.HALF_FLOAT
        | TextureDataType.FLOAT
        ;
    [TextureColorStorageFormat.RG32F]: TextureDataType.FLOAT;

    // RGB
    [TextureColorStorageFormat.RGB8]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.RGB8_SNORM]: TextureDataType.BYTE;
    [TextureColorStorageFormat.RGB8UI]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.RGB8I]: TextureDataType.BYTE;
    [TextureColorStorageFormat.RGB16UI]: TextureDataType.UNSIGNED_SHORT;
    [TextureColorStorageFormat.RGB16I]: TextureDataType.SHORT;
    [TextureColorStorageFormat.RGB32UI]: TextureDataType.UNSIGNED_INT;
    [TextureColorStorageFormat.RGB32I]: TextureDataType.INT;
    [TextureColorStorageFormat.RGB16F]:
        | TextureDataType.HALF_FLOAT
        | TextureDataType.FLOAT
        ;
    [TextureColorStorageFormat.RGB32F]: TextureDataType.FLOAT;

    // RGBA
    [TextureColorStorageFormat.RGBA8]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.RGBA8_SNORM]: TextureDataType.BYTE;
    [TextureColorStorageFormat.RGBA8UI]: TextureDataType.UNSIGNED_BYTE;
    [TextureColorStorageFormat.RGBA8I]: TextureDataType.BYTE;
    [TextureColorStorageFormat.RGBA16UI]: TextureDataType.UNSIGNED_SHORT;
    [TextureColorStorageFormat.RGBA16I]: TextureDataType.SHORT;
    [TextureColorStorageFormat.RGBA32UI]: TextureDataType.UNSIGNED_INT;
    [TextureColorStorageFormat.RGBA32I]: TextureDataType.INT;
    [TextureColorStorageFormat.RGBA16F]:
        | TextureDataType.HALF_FLOAT
        | TextureDataType.FLOAT
        ;
    [TextureColorStorageFormat.RGBA32F]: TextureDataType.FLOAT;

    // DEPTH
    [TextureDepthStorageFormat.DEPTH_COMPONENT16]:
        | TextureDataType.UNSIGNED_SHORT
        | TextureDataType.UNSIGNED_INT
        ;
    [TextureDepthStorageFormat.DEPTH_COMPONENT24]: TextureDataType.UNSIGNED_INT;
    [TextureDepthStorageFormat.DEPTH_COMPONENT32F]: TextureDataType.FLOAT;

    // DEPTH STENCIL
    [TextureDepthStencilStorageFormat.DEPTH24_STENCIL8]:
        TextureDataType.UNSIGNED_INT_24_8;
    [TextureDepthStencilStorageFormat.DEPTH32F_STENCIL8]:
        TextureDataType.FLOAT_32_UNSIGNED_INT_24_8_REV;
}

export interface StorageFormatToTypedArray {

    // RED
    [TextureColorStorageFormat.R8]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.R8_SNORM]: Int8Array;
    [TextureColorStorageFormat.R8UI]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.R8I]: Int8Array;
    [TextureColorStorageFormat.R16UI]: Uint16Array;
    [TextureColorStorageFormat.R16I]: Int16Array;
    [TextureColorStorageFormat.R32UI]: Uint32Array;
    [TextureColorStorageFormat.R32I]: Int32Array;
    [TextureColorStorageFormat.R16F]: Float32Array; // Float16Array
    [TextureColorStorageFormat.R32F]: Float32Array;

    // RG
    [TextureColorStorageFormat.RG8]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.RG8_SNORM]: Int8Array;
    [TextureColorStorageFormat.RG8UI]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.RG8I]: Int8Array;
    [TextureColorStorageFormat.RG16UI]: Uint16Array;
    [TextureColorStorageFormat.RG16I]: Int16Array;
    [TextureColorStorageFormat.RG32UI]: Uint32Array;
    [TextureColorStorageFormat.RG32I]: Int32Array;
    [TextureColorStorageFormat.RG16F]: Float32Array; // Float16Array
    [TextureColorStorageFormat.RG32F]: Float32Array;

    // RGB
    [TextureColorStorageFormat.RGB8]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.RGB8_SNORM]: Int8Array;
    [TextureColorStorageFormat.RGB8UI]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.RGB8I]: Int8Array;
    [TextureColorStorageFormat.RGB16UI]: Uint16Array;
    [TextureColorStorageFormat.RGB16I]: Int16Array;
    [TextureColorStorageFormat.RGB32UI]: Uint32Array;
    [TextureColorStorageFormat.RGB32I]: Int32Array;
    [TextureColorStorageFormat.RGB16F]: Float32Array; // Float16Array
    [TextureColorStorageFormat.RGB32F]: Float32Array;

    // RGBA
    [TextureColorStorageFormat.RGBA8]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.RGBA8_SNORM]: Int8Array;
    [TextureColorStorageFormat.RGBA8UI]: Uint8Array | Uint8ClampedArray;
    [TextureColorStorageFormat.RGBA8I]: Int8Array;
    [TextureColorStorageFormat.RGBA16UI]: Uint16Array;
    [TextureColorStorageFormat.RGBA16I]: Int16Array;
    [TextureColorStorageFormat.RGBA32UI]: Uint32Array;
    [TextureColorStorageFormat.RGBA32I]: Int32Array;
    [TextureColorStorageFormat.RGBA16F]: Float32Array; // Float16Array
    [TextureColorStorageFormat.RGBA32F]: Float32Array;

    // DEPTH
    [TextureDepthStorageFormat.DEPTH_COMPONENT16]: Uint16Array | Uint32Array;
    [TextureDepthStorageFormat.DEPTH_COMPONENT24]: Uint32Array;
    [TextureDepthStorageFormat.DEPTH_COMPONENT32F]: Float32Array;

    // DEPTH STENCIL
    [TextureDepthStencilStorageFormat.DEPTH24_STENCIL8]: Uint32Array;
    [TextureDepthStencilStorageFormat.DEPTH32F_STENCIL8]: never; // yay!
}

export interface TextureCreateOptions {
    min?: TextureMinFilter;
    mag?: TextureMagFilter;
    wrapS?: TextureWrap;
    wrapT?: TextureWrap;
}

export interface TextureStoreOptions {
    mipmap?: boolean;
    xOffset?: number;
    yOffset?: number;
    width?: number;
    height?: number;
}

export function _createTexture<S extends TextureStorageFormat>(
    gl: WebGL2RenderingContext,
    width: number,
    height: number,
    storageFormat: S,
    {
        min = TextureMinFilter.NEAREST,
        mag = TextureMagFilter.NEAREST,
        wrapS = TextureWrap.CLAMP_TO_EDGE,
        wrapT = TextureWrap.CLAMP_TO_EDGE,
    }: TextureCreateOptions = {},
): Texture<S> {
    return new Texture(
        gl,
        width, height,
        storageFormat,
        wrapS, wrapT,
        min, mag,
    );
}

export function _createTextureWithTypedArray<S extends TextureStorageFormat>(
    gl: WebGL2RenderingContext,
    width: number,
    height: number,
    storageFormat: S,
    data: StorageFormatToTypedArray[S],
    dataFormat: StorageFormatToFormat[S],
    dataType: StorageFormatToDataType[S],
    options: TextureCreateOptions & TextureStoreOptions = {},
): Texture<S> {
    const {
        min = TextureMinFilter.NEAREST,
        mag = TextureMagFilter.NEAREST,
        wrapS = TextureWrap.CLAMP_TO_EDGE,
        wrapT = TextureWrap.CLAMP_TO_EDGE,
    } = options;
    return new Texture(
        gl,
        width, height,
        storageFormat,
        wrapS, wrapT,
        min, mag,
    ).store(data, dataFormat, dataType, options);
}

/**
 * Textures are images of 2D data, where each texel can contain multiple
 * information channels of a certain type.
 */
export class Texture<S extends TextureStorageFormat> {

    readonly width: number;
    readonly height: number;
    readonly storageFormat: S;
    readonly wrapS: TextureWrap;
    readonly wrapT: TextureWrap;
    readonly minFilter: TextureMinFilter;
    readonly magFilter: TextureMagFilter;

    readonly glTexture: WebGLTexture | null;

    private gl: WebGL2RenderingContext;

    constructor(
        gl: WebGL2RenderingContext,
        width: number,
        height: number,
        storageFormat: S,
        wrapS: TextureWrap,
        wrapT: TextureWrap,
        minFilter: TextureMinFilter,
        magFilter: TextureMagFilter,
    ) {
        this.gl = gl;
        this.width = width;
        this.height = height;
        this.storageFormat = storageFormat;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.minFilter = minFilter;
        this.magFilter = magFilter;
        this.glTexture = null;

        this.init();
    }

    /**
     * Reinitialize invalid texture, eg. after context is lost.
     */
    restore(): void {
        const { gl, glTexture } = this;
        if (!gl.isTexture(glTexture)) { this.init(); }
    }

    /**
     * Upload new data to texture. Does not take ownership of data.
     */
    store(
        data: StorageFormatToTypedArray[S],
        format: StorageFormatToFormat[S],
        type: StorageFormatToDataType[S],
        {
            xOffset = 0,
            yOffset = 0,
            width = this.width,
            height = this.height,
            mipmap = false,
        }: TextureStoreOptions = {},
    ): this {
        const { gl, glTexture } = this;

        gl.bindTexture(gl.TEXTURE_2D, glTexture);

        // This pixel row alignment is theoretically smaller than needed
        // TODO: find greatest correct unpack alignment for pixel rows
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, data.BYTES_PER_ELEMENT);
        gl.texSubImage2D(
            gl.TEXTURE_2D,
            0, // level
            xOffset,
            yOffset,
            width,
            height,
            format,
            type,
            // WebGL bug causes Uint8ClampedArray to be read incorrectly
            // https://github.com/KhronosGroup/WebGL/issues/1533
            data instanceof Uint8ClampedArray
                // Both buffers are u8 -> do not copy, just change lens
                ? new Uint8Array(data.buffer)
                // Other buffer types are fine
                : data,
        );
        if (mipmap) { gl.generateMipmap(gl.TEXTURE_2D); }
        gl.bindTexture(gl.TEXTURE_2D, null);

        return this;
    }

    /**
     * Generate mipmap levels for the current data.
     */
    mipmap(): void {
        const { gl, glTexture } = this;
        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    private init(): void {
        const {
            gl,
            width,
            height,
            storageFormat,
            wrapS,
            wrapT,
            minFilter,
            magFilter,
        } = this;
        const texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texStorage2D(gl.TEXTURE_2D, 1, storageFormat, width, height);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);

        gl.bindTexture(gl.TEXTURE_2D, null);

        (this as any).glTexture = texture;
    }
}
