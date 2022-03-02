import * as Resource from './Resource'
import config from '../config/config'
import * as OsQuery from './Osquery'

export const init = () => {
    try {
        setValue({path: Resource._path})
        setData({
            callfunction: OsQuery.getOS,
            type: 'os',
            path: `${Resource._path}/os`
            
        })
        setData({
            callfunction: OsQuery.getInfo,
            type: 'info',
            path: `${Resource._path}/info`
            
        })
        setData({
            callfunction: OsQuery.getData,
            type: 'data',
            path: `${Resource._path}/data`,
            user: config.user, 
            program: config.programName 
            
        })
        
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
            Resource.save( { type, path, 
                ... values[ Object.keys( values )[0]]
            })
        }
        callfunction({ callback, ...params })
    } catch (error) {
        throw error
    }
}