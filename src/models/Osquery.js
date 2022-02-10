import { exec } from 'child_process'

export const tables = new Promise( ( res, rej ) => {
    exec( 'osqueryi .tables', ( err, stdout, stderr) => {
        if( err ) return reject( err )
        let out = stdout.trim().replace(/=>/g, '').split('\n').map( table => {
            userName
        })
    })
})