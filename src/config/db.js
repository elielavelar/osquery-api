import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import config from '../config/config'

const db = new JsonDB(new Config( config.filePath+config.dbName, true, false, '/'));

export default db;