import path from "path";
import { normalDateParser } from "./normalDateParser.js";
import { exiftool } from "exiftool-vendored";


export const oldWaHandler = async (file) => {
  try {
      const fileName = path.basename(file)
      const elementDate = normalDateParser(fileName,"old");
      const year = elementDate.year
      const month = elementDate.month
      const day = elementDate.day

      const exifDateStr = `${year}:${month}:${day} 00:00:00`;
        // console.log(year);
        
      await exiftool.write(file, {
        DateTimeOriginal: exifDateStr,
        CreateDate: exifDateStr,
      });
      console.log(file);
  } catch (error) {
    console.log(error);
  }
};
