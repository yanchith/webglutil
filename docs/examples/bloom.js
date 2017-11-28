import {
    Device,
    Command,
    VertexArray,
    Texture,
    Framebuffer,
} from "./lib/glutenfree.js";

const N_BLOOM_PASSES = 3;

const GAUSSIAN = [
    0.000229,
    0.005977,
    0.060598,
    0.241732,
    0.382928,
    0.241732,
    0.060598,
    0.005977,
    0.000229,
]

const dev = Device.mount();
const [w, h] = [dev.bufferWidth, dev.bufferHeight];

const initialTex = Texture.fromRGBA8(dev, null, w, h);
const initialFbo = Framebuffer.create(dev, [initialTex]);

const splitColorTex = Texture.fromRGBA8(dev, null, w, h);
const splitBrightTex = Texture.fromRGBA8(dev, null, w, h);
const splitFbo = Framebuffer.create(dev, [splitColorTex, splitBrightTex]);

const bloomReadTex = Texture.fromRGBA8(dev, null, w, h);
const bloomReadFbo = Framebuffer.create(dev, [bloomReadTex]);

const bloomWriteTex = Texture.fromRGBA8(dev, null, w, h);
const bloomWriteFbo = Framebuffer.create(dev, [bloomWriteTex]);

const view = mat4.create();

const scene = Command.create(dev, {
    vert: `#version 300 es
        precision mediump float;

        uniform mat4 u_projection, u_view, u_model;

        layout (location = 0) in vec4 a_vertex_position;

        out vec2 v_tex_coord;

        void main() {
            gl_Position = u_projection * u_view * u_model * a_vertex_position;
        }
    `,
    frag: `#version 300 es
        precision mediump float;

        layout (location = 0) out vec4 o_color;

        void main() {
            o_color = vec4(0.9, 0.8, 0.9, 0.5);
        }
    `,
    uniforms: {
        u_model: {
            type: "matrix4fv",
            value: mat4.fromScaling(mat4.create(), [7, 7, 7]),
        },
        u_view: {
            type: "matrix4fv",
            value: time => mat4.lookAt(
                view,
                [30 * Math.cos(time / 1000), 5, 30 * Math.sin(time / 1000)],
                [0, 0, 0],
                [0, 1, 0]
            ),
        },
        u_projection: {
            type: "matrix4fv",
            value: mat4.perspective(
                mat4.create(),
                Math.PI / 4,
                w / h,
                0.1,
                1000.0,
            ),
        },
    },
    framebuffer: initialFbo,
    clear: { color: [0, 0, 0, 1] },
});

const cube = VertexArray.create(dev, {
    attributes: {
        0: [
            [-0.5, -0.5, -0.5],
            [0.5, -0.5, -0.5],
            [0.5, 0.5, -0.5],
            [0.5, 0.5, -0.5],
            [-0.5, 0.5, -0.5],
            [-0.5, -0.5, -0.5],

            [-0.5, -0.5, 0.5],
            [0.5, -0.5, 0.5],
            [0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5],
            [-0.5, 0.5, 0.5],
            [-0.5, -0.5, 0.5],

            [-0.5, 0.5, 0.5],
            [-0.5, 0.5, -0.5],
            [-0.5, -0.5, -0.5],
            [-0.5, -0.5, -0.5],
            [-0.5, -0.5, 0.5],
            [-0.5, 0.5, 0.5],

            [0.5, 0.5, 0.5],
            [0.5, 0.5, -0.5],
            [0.5, -0.5, -0.5],
            [0.5, -0.5, -0.5],
            [0.5, -0.5, 0.5],
            [0.5, 0.5, 0.5],

            [-0.5, -0.5, -0.5],
            [0.5, -0.5, -0.5],
            [0.5, -0.5, 0.5],
            [0.5, -0.5, 0.5],
            [-0.5, -0.5, 0.5],
            [-0.5, -0.5, -0.5],

            [-0.5, 0.5, -0.5],
            [0.5, 0.5, -0.5],
            [0.5, 0.5, 0.5],
            [0.5, 0.5, 0.5],
            [-0.5, 0.5, 0.5],
            [-0.5, 0.5, -0.5],
        ]
    },
})

const split = Command.create(dev, {
    vert: `#version 300 es
        precision mediump float;

        layout (location = 0) in vec2 a_vertex_position;
        layout (location = 1) in vec2 a_tex_coord;

        out vec2 v_tex_coord;

        void main() {
            v_tex_coord = a_tex_coord;
            gl_Position = vec4(a_vertex_position, 0.0, 1.0);
        }
    `,
    frag: `#version 300 es
        precision mediump float;

        uniform sampler2D u_image;

        in vec2 v_tex_coord;

        layout (location = 0) out vec4 o_color;
        layout (location = 1) out vec4 o_bright;

        void main() {
            vec4 color = texture(u_image, v_tex_coord);

            // Convert to grayscale and compute brightness
            float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));

            o_color = color;
            o_bright = brightness > 0.7 ? color : vec4(0.0, 0.0, 0.0, 1.0);
        }
    `,
    uniforms: {
        u_image: {
            type: "texture",
            value: initialTex,
        },
    },
    framebuffer: splitFbo,
    clear: { color: [0, 0, 0, 1] },
});

const bloom = Command.create(dev, {
    vert: `#version 300 es
        precision mediump float;

        layout (location = 0) in vec2 a_vertex_position;
        layout (location = 1) in vec2 a_tex_coord;

        out vec2 v_tex_coord;

        void main() {
            v_tex_coord = a_tex_coord;
            gl_Position = vec4(a_vertex_position, 0.0, 1.0);
        }
    `,
    frag: `#version 300 es
        precision mediump float;

        #define KERNEL_LENGTH ${GAUSSIAN.length}

        uniform sampler2D u_image;
        uniform float[KERNEL_LENGTH] u_kernel;
        uniform vec2 u_blur_direction;

        in vec2 v_tex_coord;

        out vec4 color;

        void main() {
            vec2 one_pixel = vec2(1) / vec2(textureSize(u_image, 0));
            int half_length = (KERNEL_LENGTH - 1) / 2;

            vec4 color_sum = vec4(0.0);
            for (int i = 0; i < KERNEL_LENGTH; i++) {
                vec2 offset_coord = one_pixel
                    * vec2(i - half_length)
                    * u_blur_direction;
                color_sum += texture(u_image, v_tex_coord + offset_coord)
                    * u_kernel[i];
            }

            color = vec4(color_sum.rgb, 1.0);
        }
    `,
    uniforms: {
        u_kernel: {
            type: "1fv",
            value: GAUSSIAN,
        },
        u_blur_direction: {
            type: "2f",
            value: ({ direction }) => direction,
        },
        u_image: {
            type: "texture",
            value: ({ texture }) => texture,
        },
    },
    framebuffer: ({ fbo }) => fbo,
    clear: { color: [0, 0, 0, 1] },
});

const tonemap = Command.create(dev, {
    vert: `#version 300 es
        precision mediump float;

        layout (location = 0) in vec2 a_vertex_position;
        layout (location = 1) in vec2 a_tex_coord;

        out vec2 v_tex_coord;

        void main() {
            v_tex_coord = a_tex_coord;
            gl_Position = vec4(a_vertex_position, 0.0, 1.0);
        }
    `,
    frag: `#version 300 es
        precision mediump float;

        uniform sampler2D u_image_color;
        uniform sampler2D u_image_bloom;

        in vec2 v_tex_coord;

        out vec4 o_color;

        void main() {
            vec3 color = texture(u_image_color, v_tex_coord).rgb;
            vec3 bloom = texture(u_image_bloom, v_tex_coord).rgb;
            const float gamma = 2.2;

            // Additive blending
            color += bloom;

            // Reinhard tone mapping
            vec3 mapped = color / (color + vec3(1.0));

            // Gamma correction
            mapped = pow(mapped, vec3(1.0 / gamma));

            o_color = vec4(mapped, 1.0);
        }
    `,
    uniforms: {
        u_image_color: {
            type: "texture",
            value: splitColorTex,
        },
        u_image_bloom: {
            type: "texture",
            value: bloomReadTex,
        },
    },
    clear: { color: [0, 0, 0, 1] },
});

const screenspace = VertexArray.create(dev, {
    attributes: {
        0: [
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1],
        ],
        1: [
            [1, 1],
            [0, 1],
            [1, 0],
            [0, 0],
        ],
    },
    elements: [
        [0, 3, 2],
        [1, 3, 0],
    ],
});

const nBloomPasses = Math.max(0, N_BLOOM_PASSES);

const HORIZONTAL = vec2.fromValues(1, 0);
const VERTICAL = vec2.fromValues(0, 1);

const loop = time => {
    // Render geometry into texture
    scene.execute(cube, time);

    // Split color and brightness to 2 render targets (splitColor, splitBright)
    split.execute(screenspace);

    if (nBloomPasses) {
        // Do first 2 bloom passes: splitBright -> bloomWrite -> bloomRead
        bloom.execute(screenspace, {
            texture: splitBrightTex,
            direction: HORIZONTAL,
            fbo: bloomWriteFbo,
        });
        bloom.execute(screenspace, {
            texture: bloomWriteTex,
            direction: VERTICAL,
            fbo: bloomReadFbo,
        });

        // Loop additional bloom passes: bloomRead -> bloomWrite -> bloomRead
        for (let i = 1; i < nBloomPasses; i++) {
            bloom.execute(screenspace, {
                texture: bloomReadTex,
                direction: HORIZONTAL,
                fbo: bloomWriteFbo,
            });
            bloom.execute(screenspace, {
                texture: bloomWriteTex,
                direction: VERTICAL,
                fbo: bloomReadFbo,
            });
        }
    }

    // Blend together blurred highlights with original color and perform tonemapping
    tonemap.execute(screenspace);

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
