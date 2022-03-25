import config from '../config/config'
import { exec, spawn } from 'child_process'
import { isValidTable, extractParam } from '../libraries/utils.library'
import * as Resource from './Resource'
import * as WindowsOsquery from './submodels/WindowsOsquery'
import * as LinuxOsquery from './submodels/LinuxOsquery'
import util from 'util'
import { isArray } from 'lodash'

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
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        const command = `osqueryi --json .tables`
        exec( command, ( err, stdout, stderr) => {
            if( err ) error( err )
            callback( stdout )
        })
    } catch (e) {
         error( e )
    }
}

export const getInfo = async ( params = {} ) => {
    const {callback = (x) => x , error = (err) => {throw err}}  = params
    try {

        const relation = 'system_info'
        const command = `osqueryi --json "select * from ${ relation }"`
        const result = await run({ command , error })
        callback( result )
    } catch ( e ) {
        error( e );
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

export const getUptime = async ( params = {} ) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'uptime'
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
    } catch ( e) {
        error( e )
    }
}

export const getOSVersion = ( params = {} ) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'os_version'
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = run({ command , error })
        callback( result )
    } catch ( e) {
        error( e )
    }
}

export const getData = async ( params = {} ) => {
    
    try {
        const {callback = (x) => x , error = (err) => {throw err}}  = params

        var user = extractParam(params, 'user')
        var program = extractParam(params, 'program')
        var relation = extractParam(params, 'relation')

        if(!isValidTable( relation ) ) return next(`Invalid table name: ${ relation }`)
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
    } catch (error) {
        throw error;
    }
}

export const getDataQuery = async( params = {} ) => {
    
    try {
        const {callback = (x) => x , error = (err) => {throw err}}  = params

        let {user, program, relation, criteria = {}, ip } = params

        if(!isValidTable( relation ) ) return error(`Invalid table name: ${ relation }`)
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
    } catch (error) {
        throw error;
    }
}

export const getDevices = async ( params = {}) => {
    const {callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        const os = await detectOS();
        let result = {};
        switch ( os.build_platform ) {
            case config.windowsOS:
                result = await WindowsOsquery.getDevices({ callback });
                break;
            case config.linuxOS:
                result = await LinuxOsquery.getDevices({ callback });
                break;
            default:
                break;
        }
        return result;
    } catch ( e) {
        error( e )
    }
}

export const getApplications = async ( params = {}) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        const os = await detectOS()
        
        let result = {}
        switch (os.build_platform) {
            case config.windowsOS:
                result = await WindowsOsquery.getApplications({ callback, error })
                break;
            default:
                break;
        }
    } catch ( e) {
        error( e )
    }
}

export const getDeviceEvents = async ( params = {}) => {
    const {callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        const os = await detectOS();
        let result = {};
        switch ( os.build_platform ) {
            case config.windowsOS:
                result = await WindowsOsquery.getDeviceEvents({ callback });
                break;
            case config.linuxOS:
                result = await LinuxOsquery.getDeviceEvents({ callback });
                break;
            default:
                break;
        }
        return result;
    } catch ( e) {
        error( e )
    }
}

export const detectOS = async ( ) => {
    try {
        const result = await Resource.get( Resource.getPath('os'))
        const { values = []} = result
        return isArray(values) ? values[0] : values
    } catch (error) {
        throw error
    }
}

export const getCallbackDevices = ( defValues ) => {
    try {
        
        const get =  async () => {
            const os = await detectOS()
            console.log( os )
            switch ( os.build_platform ) {
                case config.windowsOS:
                    return WindowsOsquery.getCallbackDevices( defValues );
                case config.linuxOS:
                default:
                    return LinuxOsquery.getCallbackDevices( defValues );
            }
            
        }
        return get()
    } catch (error) {
        throw error
    }
}