import { run } from '../Osquery'

export const findRegistry = async ({ select = '*',  key , params = {}}) => {
    const { callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'registry'
        let command = `osqueryi --json "select ${select} from ${relation} WHERE key LIKE '${key}'"`;
        const result = await run({ command , error , callback })
        return JSON.parse( result );
    } catch ( e) {
        error( e )
    }
};

export const getDevices = async () => {
    try {
        const key = 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\%'
        const select = 'data, path'
        //const values =  JSON.parse( await findRegistry({ select, key }))
        ( await findRegistry({ select, key }) )
        .forEach( ( value, index, rawData) => {
            console.log( 'value', index)
            //console.log( 'index', index)
            //console.log( 'data', data)
        })
    } catch (error) {
        throw error;
    }

    
}