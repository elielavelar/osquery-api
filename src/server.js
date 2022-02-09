import app from './app'
//Server running
app.listen( app.get('port'), () => console.log('Server listening on', app.get('port')) )