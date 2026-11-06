import { exiftool } from 'exiftool-vendored'
import { setTimeout } from 'node:timers/promises'
import process from 'node:process'
import commandLineArgs from 'command-line-args'
import { multipleSourceHelper } from './utils/multipleSourceHelper.js'
import { oldWaHandler } from './utils/oldWaHandler.js'
import { unixHandler } from './utils/unixHandler.js'
import { newWaHandler } from './utils/newWaHandler.js'
import path from 'node:path'
import fs  from 'node:fs/promises'
import { hasOC } from './utils/hasOC.js'

//  const directory = "/mnt/new/nepic";

const optionDefinitions = [
    { name: 'src', type: String, multiple: true, defaultOption: true },
    { name: 'whatsapp', alias: 'w', type: Boolean },
    { name: 'reset', alias: 'r', type: Boolean },
    { name: 'force', alias:'f',type:Boolean}
]

const args = commandLineArgs(optionDefinitions)

if (!args.src) {
    throw new Error("src doesn't exist")
}


async function filesHandler(inputFile) {
    try {
        
        // file = ['/path/to/file1','/path/to/file2']
        let files = []
        if (inputFile) {           
            files = inputFile
        }else {
            files = await multipleSourceHelper(args)
        }
        for (let i = 0; i < files.length; i++) {
            const element = files[i]
            const fileName = path.basename(element)
            const elementUnix = fileName
                .split('.')[0]
                .split(' ')[0]
                .split('_')[0]
                .split('(')[0]
            const elementFileLength = elementUnix.length

            const OCExist = await hasOC(element)
            
            if (OCExist) {
                console.log(`${fileName} already has date`)
                continue
            }

            if (
                (/^\d+$/.test(elementUnix) && elementFileLength === 13) ||
                elementFileLength === 10
            ) {
                console.log('unix mode')
                await unixHandler(element)
            } else if (
                fileName.split(' ')[0] === 'WhatsApp' &&
                fileName.split(' ')[1]
            ) {
                console.log('new whatsapp mode')
                await newWaHandler(element)
            } else if (
                fileName.split('-')[0] === 'IMG' &&
                fileName.split('-')[1].length === 8
            ) {
                console.log('old whatsapp mode')
                await oldWaHandler(element)
            } else {
                console.log(`${fileName} has been skipped NO MATCHING CRITERIA`)
            }
        }

        // if (args.whatsapp) {
        //   await parsedHandler(files)
        // } else {
        //   await unixHandler(files)
        // }

        console.log('success')
    } catch (error) {
        console.log(error)
    } finally {
        await exiftool.end()
    }
}

async function forceHandler() {
    try {
        // files before cleaning
        let files = await multipleSourceHelper(args)

        for(const element of files) {
            const elementName = path.basename(element)
            const elementExt = path.extname(elementName)
            // const elementRealExt = elementExt.split("_")[0]
            // const elementDirectory = path.dirname(element)
            // console.log(element)
            

            if (elementExt.split("_")[1] === "original") {
                console.log(element + " removed")
                await fs.unlink(element)
            }
            // await fs.rename(element,path.join(elementDirectory,elementName)+`${elementRealExt}`)

            // console.log(elementName)
        }

        // files after cleaning
        files = await multipleSourceHelper(args)

        await filesHandler(files)

        files = await multipleSourceHelper(args)

        for (const element of files) {
            const elementName = path.basename(element)
            const elementExt = path.extname(elementName)

            

            if (elementExt.split("_")[1] === "original") {
                console.log(element + " removed")
                await fs.unlink(element)
            }
        }



    } catch (error) {
        console.log(error)
    } 
}

if (args.force) {
    forceHandler()
}else {
    filesHandler()
}
