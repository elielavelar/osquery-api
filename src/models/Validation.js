import * as OsQuery from './Osquery'
import * as Changes from './Changes'
import colors from 'colors'
import { isArray, isEmpty, isObject } from 'lodash'

export const run = ( defaultValues ) => {
    //validateOSVersion({ defaultValues })
    //validateDeviceEvents({ defaultValues })
    validateDevices({ defaultValues })
}

const processData = ( values, defValues ) => {
    const newValues = Changes.validateDataChanges( defValues, values )//
    const missingValues = Changes.validateDataChanges( values, defValues )//
    if(newValues.length !== 0 || missingValues.length !== 0 ){
        console.group()
        console.assert( newValues?.length === 0 , newValues.length+' new values found...'.red)
        console.assert( missingValues?.length === 0 , missingValues.length+' missing values found...'.red)
        newValues?.length > 0 ? console.log( 'New Values', Changes.inspect( newValues )) : null
        missingValues?.length > 0 ? console.log( 'Missing Values', Changes.inspect( missingValues )) : null
        console.groupEnd()
    } else {
        console.log('No changes found...'.green )
    }
    return values;
}

const validateOSVersion = ( { defaultValues }) => {
    console.log('Checking OS system changes...'.yellow )

    const defValues = defaultValues?.resource?.os_version?.values
    let callback = async ( result ) => {
        let values =  await result
        processData( values, defValues)
    }
    const osVersionValues = OsQuery.getOSVersion({ callback });
}

const validateOS = ( { defaultValues }) => {
    console.log('Checking OS system changes...'.yellow )

    const defValues = defaultValues?.resource?.os?.values
    let callback = async ( result ) => {
        let values =  await result
        processData( values, defValues)
    }
    const osVersionValues = OsQuery.getOS({ callback });
}

const validateDevices = ( { defaultValues }) => {
    console.log('Checking Devices changes...'.yellow )

    const defValues = defaultValues?.resource?.devices?.values
    let callback = async ( result ) => {
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

        if(newValues.length !== 0 || missingValues.length !== 0 ){
            console.group()
            console.assert( newValues?.length === 0 , newValues.length+' new values found...'.red)
            console.assert( missingValues?.length === 0 , missingValues.length+' missing values found...'.red)
            newValues?.length > 0 ? console.log( 'New Values', `${ Changes.inspect( newValues ) }`) : null
            missingValues?.length > 0 ? console.log( 'Missing Values', `${ Changes.inspect( missingValues ) }`) : null
            console.groupEnd()
        } else {
            console.log('No changes found...'.green )
        }
        
    }
    
    const osValues = OsQuery.getDevices({ callback });
}

const validateDeviceEvents = ( { defaultValues }) => {
    console.log('Checking Devices events...'.yellow )

    const defValues = defaultValues?.resource?.devices?.values
    let callback = async ( result ) => {
        console.log('Executing callback'.yellow )
        let values =  await result
        processData( values, defValues)
    }
    const osValues = OsQuery.getDeviceEvents({ callback });
}