import * as Resource from './Resource'
import config from '../config/config'
import * as OsQuery from './Osquery'

export const init = () => {
    try {
        setValue({})
        /*setData({
            callfunction: OsQuery.getDataQuery,
            type: 'os_version',
            path: Resource.getPath('os_version'),
            user: config.userName, 
            program: config.programName,
            relation: 'os_version' 
        })
        */
        setData({
            callfunction: OsQuery.getOSVersion,
            type: 'os_version',
            path: Resource.getPath('os_version')
            
        })
        
        setData({
            callfunction: OsQuery.getOS,
            type: 'os',
            path: Resource.getPath('os')
            
        })
        /*
        setData({
            callfunction: OsQuery.getInfo,
            type: 'info',
            path: Resource.getPath('info')
            
        })
        
        setData({
            callfunction: OsQuery.getDataQuery, 
            type: 'interface_addresses',
            path: Resource.getPath('interface_addresses'),
            user: config.userName, 
            program: config.programName,
            relation: 'interface_addresses' 
        })

        setData({
            callfunction: OsQuery.getDevices,
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
    }  catch (error) {
        throw error
    }
}

const setValue = ({...params}) => {
    Resource.save( params ) 
}

const setData = async ({callfunction, callback, type, path, ...params}) => {
    try {
        let callback = async ( value ) => {
            let values = await  value[0];
            Resource.save( { type, path
                , values
                , ...params
            })
        }
        let error = ( err ) => { throw err }
        callfunction({ callback, ...params })
    } catch (error) {
        throw error
    }
}