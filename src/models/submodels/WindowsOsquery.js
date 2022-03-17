import { run , runPower} from '../Osquery'

export const findRegistry = async ({ select = '*',  key , params = {}}) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'registry'
        let command = `osqueryi --json "select ${select} from ${relation} WHERE key LIKE '${key}'"`;
        return await run({ command , error  })
    } catch ( e) {
        error( e )
    }
};

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

export const getDevices = async() => {
    try {
        const values = await getUSBDevices()
        return values
    } catch (error) {
        throw error;
    }
}