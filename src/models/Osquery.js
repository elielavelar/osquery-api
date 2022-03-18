import config from '../config/config'
import { exec, spawn } from 'child_process'
import { isValidTable, extractParam } from '../libraries/utils.library'
import * as Resource from './Resource'
import * as WindowsOsquery from './submodels/WindowsOsquery'
import util from 'util'

const execProm = util.promisify( exec )

const execPower = ( command ) => {
    return new Promise( (resolve, reject) => {
        const child = spawn( 'powershell.exe', [ command ] );
        child.stdout.on('data', (data) => {
           resolve(data.toString().trim())
        })
        child.stderr.on('data', ( data ) => {
           reject( data )
        })
    })
}

export const runPower =  async ( params = {}) => {
    const { command = '', callback = (x) =>  JSON.parse( x )  , error = (err) => {throw err}}  = params
    try {
        return await execPower( command )
    } catch ( e ) {
        console.error( e )
        error( e )
    }
}

export const run = async ( params = {}) => {
    const { command = '', callback = (x) =>  JSON.parse( x )  , error = (err) => {throw err}}  = params
    let result;
    try {
        result = await execProm(command);
        return callback( result.stdout );
    } catch ( e ) {
        error( e )
    }
}

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
        const command = `osqueryi --json "select * from ${ relation }"`
        run({ command, callback, error } )
    } catch (error) {
        throw error;
    }
}

export const getOS = async ( params = {} ) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'osquery_info'
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
    } catch ( e) {
        error( e )
    }
}

export const getOSVersion = async ( params = {} ) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'os_version'
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
    } catch ( e) {
        error( e )
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

export const getDevices = async ( params = {}) => {
    const {callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        const os = detectOS();
        console.log( os )
        if( os.build_platform == config.windowsOS ){
            let result = await WindowsOsquery.getDevices({ callback })
            
        } else {
            let relation = 'usb_devices'
            let command = `osqueryi --json "select * from ${relation}"`;
            const result = await run({ command , error })
            callback( result )
        }
        
    } catch ( e) {
        error( e )
    }
}

export const getApplications = async ( params = {}) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        const os = detectOS()
        let result = {}
        switch (os.build_platform) {
            case config.windowsOS:
                result = WindowsOsquery.getApplications({ callback, error })
                break;
        
            default:
                break;
        }
    } catch ( e) {
        error( e )
    }
}

const detectOS = async ( ) => {
    try {
        const { values = {}}  = Resource.get( Resource.getPath('os'))
        return values
    } catch (error) {
        throw error
    }
}