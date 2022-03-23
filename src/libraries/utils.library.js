import { inspect } from 'util'
import {transform, isEqual, isArray, isObject, merge } from 'lodash'

export const extractParam = (req, param) => req.params[param].slice(param.length + 1);

export const isValidTable = name => !!name.match(/^[_A-Za-z]+$/);

export const getIpAddress = req =>  req.ip.split(':').at(-1)

export const getDifference = ( origObj, newObj) => {
    
    const getChanges = ( newObj, origObj ) => {
        let arrayIndexCounter = 0
        return transform( newObj, ( result, value, key ) => {
            if( !isEqual( value, origObj[ key ])){
                let resultKey = isArray( origObj ) ?
                                    arrayIndexCounter++ 
                                    : key;
                result[ resultKey ] = ( isObject( value ) && isObject( origObj[ key]) ) ?
                                        getChanges( value, origObj[ key ] ) 
                                        : value;
            }
        })
    }
    return getChanges( newObj, origObj )
}

export {inspect , merge }