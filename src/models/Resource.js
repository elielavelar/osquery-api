import db from '../config/db'
import { v4 as uuidv4 } from 'uuid'

const _rootpath = '/';
const keyword = 'resource';
const _path = `${_rootpath+keyword}`

export const getPath = ( node = '') => {
    return _path+'/'+node
}

export const save = ({ type = keyword, path = _path, ...values }) => {
    let _parentPath = getParent(path)
    const model = get(path)
    if(typeof model !== 'undefined'){
        console.log(type)
    } else {
        console.log('Res',path)
        insert({ path, ...values })
    }
    
}

const insert = ({path, uuid, ...values}) => {
    uuid ||= uuidv4()
    
    db.push(path, {uuid, ...values})
}

const getParent = (path = _path) => {
    let slices = path.split('/');
    let parentPath = slices 
     parentPath.length = slices.length - 1;
     return parentPath.join('/')
}

const get = ( path ) => {
    try {
        return db.getData( path ) 
    } catch (error) {
        return undefined
    }
}