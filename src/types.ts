export const enum BufferUsage {
    STATIC_DRAW = 0x88E4,
    DYNAMIC_DRAW = 0x88E8,
    STREAM_DRAW = 0x88E0,
    STATIC_READ = 0x88E5,
    DYNAMIC_READ = 0x88E9,
    STREAM_READ = 0x88E1,
    STATIC_COPY = 0x88E6,
    DYNAMIC_COPY = 0x88EA,
    STREAM_COPY = 0x88E2,
}

export const enum UniformType {
    FLOAT = 0x1406,
    FLOAT_VEC2 = 0x8B50,
    FLOAT_VEC3 = 0x8B51,
    FLOAT_VEC4 = 0x8B52,

    INT = 0x1404,
    INT_VEC2 = 0x8B53,
    INT_VEC3 = 0x8B54,
    INT_VEC4 = 0x8B55,

    UNSIGNED_INT = 0x1405,
    UNSIGNED_INT_VEC2 = 0x8DC6,
    UNSIGNED_INT_VEC3 = 0x8DC7,
    UNSIGNED_INT_VEC4 = 0x8DC8,

    FLOAT_MAT2 = 0x8B5A,
    FLOAT_MAT3 = 0x8B5B,
    FLOAT_MAT4 = 0x8B5C,

    SAMPLER_2D = 0x8B5E,
    SAMPLER_CUBE = 0x8B60,

    // TODO: support exotic types
    // BOOL
}
