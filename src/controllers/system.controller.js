import { exec } from 'child_process'
import * as utils from '../libraries/utils.library'

import * as Osquery from '../models/Osquery'

export const getInfo = async ( req, res , next ) => {
    Osquery.getInfo({callback: (params) => res.send(params), error: next})
}

export const getOS = async ( req, res , next ) => {
    Osquery.getOS( { callback: ( params ) => res.send(params), error: next} )
}

export const getOSVersion = async ( req, res , next ) => {
    Osquery.getOSVersion( { callback: ( params ) => res.send(params), error: next} )
}

export const getData = async (req, res, next) => {
    const user = utils.extractParam( req, 'user' )
    const program = utils.extractParam( req, 'program' )
    const relation = utils.extractParam( req, 'relation' )
    Osquery.getDataQuery({ callback: (params) => res.send(params), error: next, user, program, relation})
}

export const getTables = async ( req, res , next ) => {
  Osquery.getTables({ callback: ( params ) => res.send(params), error: next})
}

export const getDevices = async ( req, res, next) => {
  Osquery.getDevices({ callback: (params) => res.send(params), error: next})
}

export const getApplications = async ( req, res, next) => {
  Osquery.getApplications({ callback: (params) => res.send(params), error: next})
}

export const search = async ( req, res , next ) => {
  
  exec( `osqueryi --json .tables`, ( err, stdout, stderr ) => {
      if( err ) return next(err);
      res.send( stdout )
    } )
}