import { run , runPower} from '../Osquery'
import * as WindowsWMI from './WindowsWMI'

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
        
        WindowsWMI.getInfo({ className: 'Win32_PnPEntity', callback, where: `Description like 'USB%'`})
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