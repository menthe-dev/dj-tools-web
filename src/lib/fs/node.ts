export class FsNode {
    name: string
    children?: FsNode[]
    parent?: FsNode

    getChildByName(name: string) {
        return this.children.find(value => value.name === name)
    }
}