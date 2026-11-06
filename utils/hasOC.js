import { exiftool } from "exiftool-vendored"



export const hasOC = async (file) => {
    const tags = await exiftool.read(file)   
    return tags.DateTimeOriginal ? true : false
}