import * as Resource from './Resource'
import config from '../config/config'
import * as OsQuery from './Osquery'

export const init = () => {
    try {
        setValue({})
        setData({
            callfunction: OsQuery.getDataQuery,
            type: 'os_version',
            path: Resource.getPath('os_version'),
            user: config.userName, 
            program: config.programName,
            relation: 'os_version' 
        })
        setData({
            callfunction: OsQuery.getOS,
            type: 'os',
            path: Resource.getPath('os')
            
        })
        
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
        /*
        setData({
            callfunction: OsQuery.getDataQuery,
            type: 'pci_devices',
            path: Resource.getPath('pci_devices'),
            user: config.userName, 
            program: config.programName,
            relation: 'pci_devices' 
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
            let values = await JSON.parse(value);
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