import { config } from 'dotenv';
config()

export default {
    filePath: process.env.FILE_PATH  || '/attachments/',
    fileName: process.env.FILE_NAME  || 'default.data', 
    fileExtension: process.env.FILE_EXTENSION  || '.json', 
    tempFileName: process.env.TEMP_FILE_NAME  || 'temp.data', 
}