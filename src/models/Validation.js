import * as OsQuery from './Osquery'
import * as Changes from './Changes'

export const run = ({ defaultValues }) => {
    validateOSVersion({ defaultValues })
}

const callback = async ( result, defaultValues ) => {
    let values = await result
    const newValues = Changes.validateDataChanges( defaultValues, values )//
    const missingValues = Changes.validateDataChanges( values, defaultValues )//
    if(newValues.length !== 0 || missingValues.length !== 0 ){
        console.group()
        console.assert( newValues.length === 0 , newValues.length+' new values found...'.red)
        console.assert( missingValues.length === 0 , missingValues.length+' missing values found...'.red)
        console.log( 'New Values', Changes.inspect( newValues ))
        console.log( 'Missing Values', Changes.inspect( missingValues ))
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

        const newValues = Changes.validateDataChanges( defValues, values )//
        const missingValues = Changes.validateDataChanges(values, defValues )//
        console.group()
        console.assert( newValues.length === 0 , newValues.length+' new values found...'.red)
        console.assert( missingValues.length === 0 , missingValues.length+' missing values found...'.red)
        console.log( 'New Values', Changes.inspect( newValues ))
        console.log( 'Missing Values', Changes.inspect( missingValues ))
        console.groupEnd()
        return values;
    }
    const osVersionValues = OsQuery.getOSVersion({ callback });
}