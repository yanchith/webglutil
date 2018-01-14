import * as assert from "./assert";
import * as array from "./array";
import { Device } from "./device";
import {
    VertexBuffer,
    VertexBufferProps,
    VertexBufferInt8Props,
    VertexBufferInt16Props,
    VertexBufferInt32Props,
    VertexBufferUint8Props,
    VertexBufferUint16Props,
    VertexBufferUint32Props,
} from "./vertex-buffer";
import {
    ElementBuffer,
    ElementBufferProps,
    ElementBufferType,
    Primitive,
} from "./element-buffer";

const INT_PATTERN = /^0|[1-9]\d*$/;

export enum AttributeType {
    POINTER = "pointer",
    IPOINTER = "ipointer",
}

export type Attribute =
    | AttributeArray
    | AttributeObject
    ;

export type AttributeArray =
    | number[] // infers size 1
    | [number, number][] // infers size 2
    | [number, number, number][] // infers size 3
    | [number, number, number, number][] // infers size 4
    /*
    Unfortunately, typescript does not always infer tuple types when in
    nested optional structutes, so we provide a number[][] typing fallback.
    If explicit tuples make it to typescript, the fallback might go away.
    */
    | number[][]
    ;

export type AttributeObject =
    | AttributePointer
    | AttributeIPointer
    ;

export interface AttributePointer {
    type: AttributeType.POINTER;
    value: VertexBuffer | PointerValue;
    count: number;
    size: number;
    normalized?: boolean;
    divisor?: number;
}

export interface AttributeIPointer {
    type: AttributeType.IPOINTER;
    value: VertexBuffer<IPointerValue["type"]> | IPointerValue;
    count: number;
    size: number;
    divisor?: number;
}

export type PointerValue = VertexBufferProps;

export type IPointerValue =
    | VertexBufferInt8Props
    | VertexBufferInt16Props
    | VertexBufferInt32Props
    | VertexBufferUint8Props
    | VertexBufferUint16Props
    | VertexBufferUint32Props
    ;

export interface VertexArrayProps {
    attributes: {
        [name: string]: Attribute;
        [location: number]: Attribute;
    };
    elements?: ElementBuffer | ElementBufferProps;
}

export class VertexArray {

    static create(
        dev: WebGL2RenderingContext | Device,
        { attributes, elements }: VertexArrayProps,
    ): VertexArray {
        const gl = dev instanceof Device ? dev.gl : dev;
        const attrs = Object.entries(attributes)
            .map(([locationStr, definition]) => {
                if (!INT_PATTERN.test(locationStr)) {
                    throw new Error("Location not a number. Use Command#locate");
                }
                const location = parseInt(locationStr, 10);
                return AttributeDescriptor.create(gl, location, definition);
            });

        const elementBuffer = elements
            ? elements instanceof ElementBuffer
                ? elements
                : ElementBuffer.create(gl, elements)
            : undefined;

        const count = elementBuffer
            ? elementBuffer.count
            : attrs.length
                ? attrs
                    .map(attr => attr.count)
                    .reduce((min, curr) => Math.min(min, curr))
                : 0;

        const instAttrs = attrs.filter(attr => !!attr.divisor);
        const instanceCount = instAttrs.length
            ? instAttrs
                .map(attr => attr.count * attr.divisor)
                .reduce((min, curr) => Math.min(min, curr))
            : 0;

        return new VertexArray(gl, attrs, elementBuffer, count, instanceCount);
    }

    readonly count: number;
    readonly instanceCount: number;

    readonly glVertexArray: WebGLVertexArrayObject | null;

    private gl: WebGL2RenderingContext;

    // The buffers
    private attributes: AttributeDescriptor[];
    private elementBuffer?: ElementBuffer;

    private constructor(
        gl: WebGL2RenderingContext,
        attributes: AttributeDescriptor[],
        elements: ElementBuffer | undefined,
        count: number,
        instanceCount: number,
    ) {
        this.gl = gl;
        this.elementBuffer = elements;
        this.attributes = attributes;
        this.count = count;
        this.instanceCount = instanceCount;
        this.glVertexArray = null;

        this.init();
    }

    get hasElements(): boolean {
        return !!this.elementBuffer;
    }

    get elementPrimitive(): Primitive | undefined {
        return this.elementBuffer && this.elementBuffer.primitive;
    }

    get elementType(): ElementBufferType | undefined {
        return this.elementBuffer && this.elementBuffer.type;
    }

    init(): void {
        const { gl, attributes, elementBuffer } = this;
        if (!gl.isContextLost()) {
            const vao = gl.createVertexArray();

            gl.bindVertexArray(vao);
            attributes.forEach(({
                location,
                type,
                buffer: { glBuffer, type: glBufferType },
                size,
                normalized = false,
                divisor,
            }) => {
                // Enable sending attribute arrays for location
                gl.enableVertexAttribArray(location);

                // Send buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
                switch (type) {
                    case AttributeType.POINTER:
                        gl.vertexAttribPointer(
                            location,
                            size,
                            glBufferType,
                            normalized,
                            0,
                            0,
                        );
                        break;
                    case AttributeType.IPOINTER:
                        gl.vertexAttribIPointer(
                            location,
                            size,
                            glBufferType,
                            0,
                            0,
                        );
                        break;
                    default: assert.never(type);
                }
                if (divisor) { gl.vertexAttribDivisor(location, divisor); }
            });

            if (elementBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer.glBuffer);
            }

            gl.bindVertexArray(null);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            (this as any).glVertexArray = vao;
        }
    }

    restore(): void {
        const { gl, glVertexArray, attributes, elementBuffer } = this;
        if (elementBuffer) { elementBuffer.restore(); }
        attributes.forEach(attr => attr.buffer.restore());
        if (!gl.isVertexArray(glVertexArray)) { this.init(); }
    }
}

// TODO: this could use some further refactoring. Currently its just former
// public API made private.
class AttributeDescriptor {

    static create(
        gl: WebGL2RenderingContext,
        location: number,
        props: Attribute,
    ): AttributeDescriptor {
        if (Array.isArray(props)) {
            if (array.isArray2(props)) {
                const s = array.shape2(props);
                const r = array.ravel2(props, s);
                return new AttributeDescriptor(
                    location,
                    AttributeType.POINTER,
                    VertexBuffer.fromFloat32Array(gl, r),
                    s[0],
                    s[1],
                    false,
                    0,
                );
            }
            return new AttributeDescriptor(
                location,
                AttributeType.POINTER,
                VertexBuffer.fromFloat32Array(gl, props),
                props.length,
                1,
                false,
                0,
            );
        }

        const buffer = props.value instanceof VertexBuffer
            ? props.value
            // Typescript is not smart enough here
            : VertexBuffer.create(gl, props.value as any);

        switch (props.type) {
            case AttributeType.POINTER: return new AttributeDescriptor(
                location,
                props.type,
                buffer,
                props.count,
                props.size,
                props.normalized || false,
                props.divisor || 0,
            );
            case AttributeType.IPOINTER: return new AttributeDescriptor(
                location,
                props.type,
                buffer,
                props.count,
                props.size,
                false,
                props.divisor || 0,
            );
            default: return assert.never(props);
        }
    }

    private constructor(
        readonly location: number,
        readonly type: AttributeType,
        readonly buffer: VertexBuffer,
        readonly count: number,
        readonly size: number,
        readonly normalized: boolean,
        readonly divisor: number,
    ) { }
}
