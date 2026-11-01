import { normalDateParser } from "./normalDateParser.js";
import { exiftool } from "exiftool-vendored";


export const parsedHandler = async (files) => {
  try {
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      const elementDate = normalDateParser(element);
      const year = elementDate.year
      const month = elementDate.month
      const day = elementDate.day

      const exifDateStr = `${year}:${month}:${day} 00:00:00`;
        // console.log(year);
        
      await exiftool.write(files[i], {
        DateTimeOriginal: exifDateStr,
        CreateDate: exifDateStr,
      });
      console.log(files[i]);
    }
  } catch (error) {
    console.log(error);
  }
};
