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
                /*let resultKey = isArray( origObj ) ?
                                    arrayIndexCounter++ 
                                    : key;
                                    */
                
                result[ key ] = ( isObject( value ) && isObject( origObj[ key]) ) ?
                                        getChanges( value, origObj[ key ] ) 
                                        : value;
            }
        })
    }
    return getChanges( newObj, origObj )
}

export const getIntersect = ( obj= {}, keys = [] ) => {
    const getValues = ( keys, obj ) => {
        let arrayIndexCounter = 0;
        return transform( obj , ( result, value, key ) => {
            if( keys.includes( key )) {
                let resultKey = isArray( obj ) ?
                                    arrayIndexCounter++ 
                                    : key;
                result[ resultKey ] = ( isObject( value ) && isObject( obj[ key]) ) ?
                                    getValues( Object.keys(obj[ key ]), value ) 
                                    : value;
            }
        })
    }
    return getValues( keys, obj )
}

export const getIndexByKey = ( obj , key) => {
    const getIndex = ( obj , key ) => {
        let value, index, residual;
        if(isObject( key )) {
            [[ index, value ], ...residual] = Object.entries(key);
        } else {
            index = key
        }
        return transform( obj, ( i, _content, _i ) => {
            if( isEqual(index, _i) && isEqual( value, _content)){
                i = _i
            } else if( isObject( _content) ){
                i = getIndex(_content, key )
            }
        })
    }
    return getIndex( obj , key )
}

export {inspect , merge }