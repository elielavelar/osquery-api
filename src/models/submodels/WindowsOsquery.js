import { run , runPower} from '../Osquery'
import * as Changes from '../Changes'
import * as WindowsWMI from './WindowsWMI'
import { isArray, isEmpty, isObject } from 'lodash'

export const findRegistry = async ({ select = '*',  key , params = {}}) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'registry'
        let command = `osqueryi --json "select ${select} from ${relation} WHERE key LIKE '${key}'"`;
        return await run({ command , error  })
    } catch ( e) {
        error( e )
    }
}

const getUSBDevices = async () => {
    const error = ( e) => { throw e }
    try {
        let command = `Get-PnpDevice -PresentOnly | Where-Object { $_.InstanceId -match '^USB' }`;
        return await runPower({ command , error  })
    } catch ( e ) {
        console.error( e )
        error( e )
    }
}

export const getDevicesReg = async () => {
    try {
        /*
        const key = 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\%'
        const select = '*' //'data, path'
        const values = await findRegistry({ select, key })

        Object.entries(values).forEach( async (value, index) => {
            const val =  value[1]
            let path = val.path
            let registryKey =  await findRegistry({ select, key: path })
            console.log('index: ', index)
            const reg = Object.entries( registryKey ).filter( regkey => {
                return regkey[1]?.name == 'FriendlyName'
            })
            console.log( reg )
        })
        */
        const values = await getUSBDevices()
        console.log( values )
    } catch (error) {
        throw error;
    }
}

export const getDevices = async( params = {}) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        //const values = await getUSBDevices()
        
        await WindowsWMI.getInfo({ className: 'Win32_PnPEntity', callback, where: `Description like 'USB%'`})
        //WindowsWMI.getInfo({ className: 'Win32_USBHub', callback })
        
    } catch ( e ) {
        error( e )
    }
}

export const getDeviceEvents = async( params = {}) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'osquery_packs'
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
        //WindowsWMI.getInfo({ className: 'Win32_PnPEntity', callback })
    } catch ( e ) {
        error( e )
    }
}

export const getApplications = async ( params = {})  => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'programs'
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
    } catch (error) {
        error( e )
    }
}

export const getCallbackDevices = ( defValues, queryFunction ) => {
    const callback = async ( result ) => {
        let values =  await result
        let defValuesFiltered = []
        let valuesFiltered = []
        values.forEach( ( details, key) => {
            let filterValue = Changes.getIntersect( details
                , ['Caption', 'CreationClassName', 'Description', 'DeviceID', 'PNPClass', 'Present', 'Service', 'Status'] 
            );
            valuesFiltered[ filterValue.DeviceID ] = filterValue ;
        } )

        defValues.forEach( ( details, key) => {
            let filterValue = Changes.getIntersect( details
                , ['Caption', 'CreationClassName', 'Description', 'DeviceID', 'PNPClass', 'Present', 'Service', 'Status'] 
            );
            defValuesFiltered[ filterValue.DeviceID] = filterValue ;
        } )

        let newValues = [], missingValues = []

        Object.entries(defValuesFiltered).forEach( ( det, j ) => {
            const [ i , ...detValues ] = det
            const nValue = isObject( valuesFiltered[ i ] ) ? valuesFiltered[ i ] : []
            isEmpty(nValue) ? missingValues.push( detValues ) : null
        })

        Object.entries(valuesFiltered).forEach( ( det, j ) => {
            const [ i , ...detValues ] = det
            const nValue = isObject( defValuesFiltered[ i ] ) ? defValuesFiltered[ i ] : []
            isEmpty(nValue) ? newValues.push( detValues ) : null
        })

        console.group()
        if(newValues.length !== 0 || missingValues.length !== 0 ){
            console.assert( newValues?.length === 0 , newValues.length+' new values found...'.red)
            console.assert( missingValues?.length === 0 , missingValues.length+' missing values found...'.red)
            newValues?.length > 0 ? console.log( 'New Values', `${ Changes.inspect( newValues ) }`) : null
            missingValues?.length > 0 ? console.log( 'Missing Values', `${ Changes.inspect( missingValues ) }`) : null
        } else {
            console.log('No changes found...'.green )
        }
        console.groupEnd()
    }
    queryFunction( { callback })
}