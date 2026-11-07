import path from 'node:path'
import { normalDateParser } from './normalDateParser.js'
import { exiftool } from 'exiftool-vendored'

export const normalAndroidHandler = async (file) => {
    const fileName = path.basename(file)

    const date = normalDateParser(fileName, 'android')

    const year = date.year
    const month = date.month
    const day = date.day

    const hour = date.hour
    const minute = date.minute
    const second = date.second

    const exifDateStr = `${year}:${month}:${day} ${hour}:${minute}:${second}`

    await exiftool.write(file, {
        DateTimeOriginal: exifDateStr,
        CreateDate: exifDateStr,
    })
    console.log(file)
}
