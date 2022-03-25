import db from '../config/db'
import { v4 as uuidv4 } from 'uuid'

const _rootpath = '/'
let keyword = null
let _path = `${_rootpath}`

export const setKeyword = _keyword => { 
    keyword = _keyword
    setPath()
}

const setPath = ( ) => {
    _path =  `${_rootpath+keyword}`
}

export const getPath = ( node = '') => {
    return _path+'/'+node
}

export const save = async ({ type = keyword, path = _path, ...values }) => {
    const { overewrite = false } = values
    //let _parentPath = getParent(path)
    const model = get(path)
    if(typeof model !== 'undefined' ){
        overewrite ? update({ path, ...values} ) : null;
    } else {
        await insert({ path, ...values })
    }
}

const insert = async ({path, uuid, ...values}) => {
    uuid ||= uuidv4()
    db.push(path, {uuid, ...values})
}

const getParent = (path = _path) => {
    let slices = path.split('/');
    let parentPath = slices 
     parentPath.length = slices.length - 1;
     return parentPath.join('/')
}

export const get = ( path = _rootpath ) => {
    try {
        const data = db.getData( path ) 
        return data
    } catch (error) {
        return undefined
    }
} 