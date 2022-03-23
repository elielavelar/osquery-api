import * as OsQuery from './Osquery'
import * as Changes from './Changes'
import colors from 'colors'

export const run = ( defaultValues ) => {
    validateOS({ defaultValues })
    //validateDevices({ defaultValues })
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
    }
    return values;
}

const validateOSVersion = ( { defaultValues }) => {
    console.log('Checking OS system changes...'.yellow )

    const defValues = defaultValues?.resource?.os_version?.values
    let callback = async ( result ) => {
        console.log('Executing callback'.yellow )
        let values =  await result
        processData( values, defValues)
    }
    const osVersionValues = OsQuery.getOSVersion({ callback });
}

const validateOS = ( { defaultValues }) => {
    console.log('Checking OS system changes...'.yellow )

    const defValues = defaultValues?.resource?.os?.values
    let callback = async ( result ) => {
        console.log('Executing callback'.yellow )
        let values =  await result
        processData( values, defValues)
    }
    const osVersionValues = OsQuery.getOS({ callback });
}

const validateDevices = ( { defaultValues }) => {
    console.log('Checking Devices changes...'.yellow )

    const defValues = defaultValues?.resource?.devices?.values
    let callback = async ( result ) => {
        console.log('Executing callback'.yellow )
        let values =  await result
        processData( values, defValues)
    }
    const osValues = OsQuery.getDevices({ callback });
}