import express from "express";
import cors from "cors";

import SystemRoutes from './routes/system.routes'

const app = express();
app.use( cors() )

var userName = 'local';
var programName = 'osquery';

const port = 8080;
app.set('port', process.env.PORT || port);

const corsOptions = {}

app.use( cors( corsOptions ))
app.use( express.json() )

app.use( SystemRoutes )

export default app;