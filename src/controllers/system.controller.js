import { exec } from 'child_process'
import { isValidTable, extractParam } from '../libraries/utils.library'
import * as PersistenceFile from '../models/PersistenceFile'

export const getInfo = async ( req, res , next ) => {
    const relation = 'system_info'
    exec( `osqueryi --json "select * from ${ relation }"`, ( err, stdout, stderr ) => {
        if( err ) return next(err);
        const stream = stdout
        PersistenceFile.save( { stream } )
        res.send( stdout )
      } )
}

export const getOS = async ( req, res , next ) => {
    const relation = 'osquery_info'
    exec( `osqueryi --json "select * from ${ relation }"`, ( err, stdout, stderr ) => {
        if( err ) return next(err);
        res.send( stdout )
      } )
}

export const getData = async (req, res, next) => {
    var user = extractParam(req, 'user')
    var program = extractParam(req, 'program')
    var relation = extractParam(req, 'relation')

    if(!isValidTable( relation ) ) return next(`Invalid table name: ${ relation }`)
    exec( `osqueryi --json "select * from ${ relation }"`, ( err, stdout, stderr ) => {
        if( err ) return next(err);
        res.send( stdout )
      } )
}

export const getTables = async ( req, res , next ) => {
  exec( `osqueryi --json .tables`, ( err, stdout, stderr ) => {
      if( err ) return next(err);
      res.send( stdout )
    } )
}

export const search = async ( req, res , next ) => {
  
  exec( `osqueryi --json .tables`, ( err, stdout, stderr ) => {
      if( err ) return next(err);
      res.send( stdout )
    } )
}