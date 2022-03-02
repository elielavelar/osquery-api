import express from "express";
import cors from "cors";
import config from "./config/config";
import morgan from "morgan";

import SystemRoutes from './routes/system.routes'

// Instances
const app = express();
app.use( cors() )

// Settings
var userName = 'local';
var programName = 'osquery';

const port = 8080;
app.set('port', config.port || port);

// Middlewares
const corsOptions = {}
app.use( cors( corsOptions ))
app.use( express.json() )
app.use( morgan('dev') )

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to OSQuery API'})
} )

app.use( SystemRoutes )


export default app;