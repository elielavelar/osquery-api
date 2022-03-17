import { exec } from 'child_process'

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
    Osquery.getDataQuery({ callback: (params) => res.send(params), error: next, ...req.params})
}

export const getTables = async ( req, res , next ) => {
  Osquery.getTables({ callback: ( params ) => res.send(params), error: next})
}

export const getDevices = async ( req, res, next) => {
  Osquery.getDevices({ callback: (params) => res.send(params), error: next})
}

export const search = async ( req, res , next ) => {
  
  exec( `osqueryi --json .tables`, ( err, stdout, stderr ) => {
      if( err ) return next(err);
      res.send( stdout )
    } )
}