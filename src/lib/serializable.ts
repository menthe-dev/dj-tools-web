export abstract class Serializable {
    public abstract serialize(): Uint8Array;
    public abstract deserialize(data: Uint8Array): void;
}