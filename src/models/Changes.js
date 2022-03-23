import db from '../config/db'
import { v4 as uuidv4 } from 'uuid'
import * as ActiveRecord from './ActiveRecord'
import { getDifference, merge, inspect } from '../libraries/utils.library' 

const keyword = 'changes';
//export const { save, get, getPath } = ActiveRecord
export const save = async ({ ...params }) => {
    const { error = ( e ) => { throw e } } = params
    try {
        ActiveRecord.setKeyword( keyword )
        ActiveRecord.save( { error, ...params} )
    } catch ( e ) {
        error( e )
    }
}

export const get = async ({ ...params }) => {
    const { error = ( e ) => { throw e } } = params
    try {
        ActiveRecord.setKeyword( keyword )
        return ActiveRecord.get( { ...params} )
    } catch ( e ) {
        error( e )
    }
}

export const getPath = async ({ ...params }) => {
    const { error = ( e ) => { throw e } } = params
    try {
        ActiveRecord.setKeyword( keyword )
        return ActiveRecord.getPath( { ...params} )
    } catch ( e ) {
        error( e )
    }
}


export { getDifference as validateDataChanges, merge, inspect }