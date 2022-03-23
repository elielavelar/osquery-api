import { config } from 'dotenv';
config()

export default {
    filePath: process.env.FILE_PATH  || '/attachments/',
    fileName: process.env.FILE_NAME  || 'default.data', 
    fileExtension: process.env.FILE_EXTENSION  || '.json', 
    tempFileName: process.env.TEMP_FILE_NAME  || 'temp.data', 
    port: process.env.PORT,
    userName : process.env.USERNAME || 'local',
    programName : process.env.PROGRAMNAME || 'osquery',
    dbName : process.env.DBNAME || 'db',
    windowsOS : 'windows',
    linuxOS: 'linux',
    macOS: 'darwin',
    centralServerURL: process.env.SERVER_URL || 'http://localhost:3000',
    token: process.env.TOKEN,
    timeoutChecking: process.env.TIMEOUTCHECKING || 10000
}