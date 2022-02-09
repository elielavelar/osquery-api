import express from "express";
import cors from "cors";

import SystemRoutes from './routes/system.routes'

// Instances
const app = express();
app.use( cors() )

// Settings
var userName = 'local';
var programName = 'osquery';

const port = 8080;
app.set('port', process.env.PORT || port);

// Middlewares
const corsOptions = {}
app.use( cors( corsOptions ))
app.use( express.json() )

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to OSQuery API'})
} )

app.use( SystemRoutes )

export default app;