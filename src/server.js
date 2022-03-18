import app from './app'
import * as Monitoring from './models/Monitoring'
//Server running
app.listen( app.get('port'), async () => {

    await Monitoring.init()
    console.log('Server listening on', app.get('port')) 
    
})