import { FileSystemWritableStream } from "./stream"

export type FileSystemFileHandle = {
    name: string
    isFile: true
    isDirectory: false
    getFile: () => Promise<File>
    createWritable: () => Promise<FileSystemWritableStream>
}

export type FileSystemDirectoryHandle = {
    name: string
    isFile: false
    isDirectory: true
    getEntries: () => Promise<[string, FileSystemHandle][]>
    getFile: (name: string, opts?: { create?: boolean }) => Promise<FileSystemFileHandle>
    getDirectory: (name: string, opts?: { create?: boolean }) => Promise<FileSystemDirectoryHandle>

    // Todo: Add valid return types
    removeEntry: (name: string, opts?: { recursive?: boolean }) => Promise<{}>
    resolve: (handle: FileSystemHandle) => Promise<{}>
}

export type FileSystemHandle = FileSystemFileHandle | FileSystemDirectoryHandle