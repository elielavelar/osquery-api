import * as Resource from './Resource'
import config from '../config/config'
import * as OsQuery from './Osquery'
import * as Validation from './Validation'

export const init = async () => {
    try {
        console.log('Starting DB Component...')

        setValue({ token: config.token})
        /*setData({
            callfunction: OsQuery.getDataQuery,
            type: 'os_version',
            path: Resource.getPath('os_version'),
            user: config.userName, 
            program: config.programName,
            relation: 'os_version' 
        })
        */
        await setData({
            callfunction: OsQuery.getOSVersion,
            type: 'os_version',
            path: Resource.getPath('os_version')
            
        })
        
        await setData({
            callfunction: OsQuery.getOS,
            type: 'os',
            path: Resource.getPath('os')
            
        })
        
        await setData({
            callfunction: OsQuery.getInfo,
            type: 'info',
            path: Resource.getPath('info')
        })
        
        await setData({
            callfunction: OsQuery.getDataQuery, 
            type: 'interface_addresses',
            path: Resource.getPath('interface_addresses'),
            user: config.userName, 
            program: config.programName,
            relation: 'interface_addresses' 
        })
/*
        await setData({
            callfunction: OsQuery.getDeviceEvents,
            type: 'devices',
            path: Resource.getPath('devices')
            
        })
        /*
        setData({
            callfunction: OsQuery.getDataQuery,
            type: 'registry',
            path: Resource.getPath('registry'),
            user: config.userName, 
            program: config.programName,
            relation: 'registry' 
        })
        /*
        setData({
            callfunction: OsQuery.getDataQuery,
            type: 'sub_devices',
            path: Resource.getPath('sub_devices'),
            user: config.userName, 
            program: config.programName,
            relation: 'sub_devices' 
        })
        */
       await checkingChanges()
    }  catch (error) {
        throw error
    }
}

const setValue = async ({...params}) => {
    Resource.save( params )
}

const setData = async ({callfunction, callback, type, path, ...params}) => {
    try {
        let callback = async ( result ) => {
            let values = await  result
            
            Resource.save( { type, path
                , values
                , ...params
            })
        }
        let error = ( err ) => { throw err }
        await callfunction({ callback, ...params })
    } catch (error) {
        throw error
    }
}

const checkingChanges = async () => {
    try {
        const defaultValues = await Resource.get();
    
        setInterval( async () => {
            Validation.run(defaultValues);
        }, config.timeoutChecking )
    } catch (error) {
        console.error(error)
    }
}

