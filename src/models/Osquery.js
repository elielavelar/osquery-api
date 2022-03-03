import config from '../config/config'
import { exec } from 'child_process'
import * as Resource from './Resource'
import { isValidTable, extractParam } from '../libraries/utils.library'

export const getTables = async ( params = {} ) => {
    try {
        const { callback = (x) => x , error = (err) => {throw err}}  = params

        exec( `osqueryi --json .tables`, ( err, stdout, stderr ) => {
            if( err ) error(err);
            callback( stdout );
        } )
    } catch (error) {
        throw error;
    }
}

export const getInfo = async ( params = {} ) => {
    try {
        const {callback = (x) => x , error = (err) => {throw err}}  = params

        const relation = 'system_info'
        exec( `osqueryi --json "select * from ${ relation }"`, ( err, stdout, stderr ) => {
            if( err ) return error(err);
            callback( stdout )
        } )
    } catch (error) {
        throw error;
    }
}

export const getOS = async ( params = {} ) => {
    try {
        let defaultCallback = async (x)  => {
            return await x;
        };
        let { callback = defaultCallback , error = (err) => {throw err}}  = params
        const relation = 'osquery_info'
        exec(`osqueryi --json "select * from ${relation}"`, async (err, stdout) => {
            if (err) error(err)
            await callback(stdout)
        })

    } catch (error) {
        throw error;
    }
}

export const getData = ( params = {} ) => {
    
    try {
        const {callback = (x) => x , error = (err) => {throw err}}  = params

        var user = extractParam(params, 'user')
        var program = extractParam(params, 'program')
        var relation = extractParam(params, 'relation')

        if(!isValidTable( relation ) ) return next(`Invalid table name: ${ relation }`)
        exec( `osqueryi --json "select * from ${ relation }"`, ( err, stdout, stderr ) => {
            if( err ) error(err);
            callback( stdout )
        } )
    } catch (error) {
        throw error;
    }
}

export const getDataQuery = ( params = {} ) => {
    
    try {
        const {callback = (x) => x , error = (err) => {throw err}}  = params

        let {user, program, relation, criteria = {} } = params

        if(!isValidTable( relation ) ) return error(`Invalid table name: ${ relation }`)
        Object.entries(criteria).forEach( (key, value) => {
            console.log(key, value)
        })
        exec( `osqueryi --json "select * from ${ relation }"`, ( err, stdout, stderr ) => {
            if( err ) error(err);
            callback( stdout )
        } )
    } catch (error) {
        throw error;
    }
}