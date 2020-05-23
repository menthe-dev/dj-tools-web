export const readNullTerminatedString = (data: Uint8Array): string => {
    let buffer = ""
    let nullFound = false

    data.forEach((val) => {
        if (val === 0) {
            nullFound = true
        }

        if (!nullFound) {
            buffer += String.fromCharCode(val)
        }
    })

    return buffer
}
