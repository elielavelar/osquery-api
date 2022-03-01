import fs from 'fs'
import config from '../config/config'

export const save = async ({stream = '', ...params}) => {
    let { process } = params 
    process ||= 'default'
    console.log(process)
    let fileName = params.fileName || config.fileName || 'default';
    let fileExtension = params.fileExtension || config.fileExtension || 'txt';
    let defaultPath = params.filePath || config.filePath || '/temp/';
    let file = fileName+'.'+fileExtension;
    const filePath = defaultPath + file;
    if( fs.existsSync( filePath )){
        console.log('content: ', await getContentFile( filePath ))
    } else {
        create({stream, process, params})
    }
    
}

const getContentFile = ( filePath ) => {
    if(!fs.existsSync( filePath) ) throw new Error("File doesn't exist")
    let content = fs.readFile( filePath, ( err, data ) => {
        if( err ) throw err
        return JSON.parse(data)
    } )
    return content
}


export const create = ({stream = '', ...params}) => {
    let { process } = params 
    process ||= 'default'
    let fileName = params.fileName || config.fileName || 'default';
    let fileExtension = params.fileExtension || config.fileExtension || 'txt';
    let defaultPath = params.filePath || config.filePath || '/temp/';
    let file = fileName+'.'+fileExtension;
    const filePath = defaultPath + file;
    fs.writeFile( filePath, stream, () => { console.log('File Saved')})
}
