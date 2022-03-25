import db from '../config/db'
import { v4 as uuidv4 } from 'uuid'
import * as ActiveRecord from './ActiveRecord'
const keyword = 'resource';

export const save = async ({ ...params }) => {
    const { error = ( e ) => { throw e } } = params
    try {
        ActiveRecord.setKeyword( keyword )
        ActiveRecord.save( { error, ...params } )
    } catch ( e ) {
        error( e )
    }
}

export const get = async ( path ) => {
    try {
        ActiveRecord.setKeyword( keyword )
        return ActiveRecord.get( path )
    } catch ( e ) {
        throw e 
    }
}

export const getPath = ( node ) => {
    try {
        ActiveRecord.setKeyword( keyword )
        return ActiveRecord.getPath( node )
    } catch ( e ) {
        throw e
    }
}