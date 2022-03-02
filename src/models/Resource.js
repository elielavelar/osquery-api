import db from '../config/db'
import { v4 as uuidv4 } from 'uuid'

const _rootpath = '/';
const keyword = 'resource';
const _path = `${_rootpath}${keyword}`

export const save = ({ type = keyword, path = _rootpath, ...values }) => {
    let _parentPath = getParent(path)
    const model = get(path)
    if(model !== undefined){

    } else {
        insert({ path, ...{ type: { ...values }}})
    }
}

const insert = ({path, uuid, ...values}) => {
    uuid ||= uuidv4()
    console.log(path, values)
    db.push(path, {uuid, ...values})
}

const getParent = (path = _rootpath) => {
    let slices = path.split('/');
    let parentPath = slices 
     parentPath.length = slices.length - 1;
     return parentPath.join('/')
}

const get = ({ path }) => {
    try {
        return db.getData( path )
    } catch (error) {
        return undefined
    }
}