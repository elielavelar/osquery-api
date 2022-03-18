import { run , runPower} from '../Osquery'
export const getApplications = async ( params = {}) => {

}

export const getDevices = async( params = {}) => {
    const {callback = (x) => x , error = (err) => {throw err}}  = params
    try {
        let relation = 'usb_devices'
        let command = `osqueryi --json "select * from ${relation}"`;
        const result = await run({ command , error })
        callback( result )
    } catch ( e ) {
        error( e )
    }
}