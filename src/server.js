import app from './app'
import * as Monitoring from './models/Monitoring'
//Server running
app.listen( app.get('port'), () => {

    console.log('Server listening on', app.get('port')) 
    
    Monitoring.init()
})