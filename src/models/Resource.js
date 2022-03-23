import db from '../config/db'
import { v4 as uuidv4 } from 'uuid'
import * as ActiveRecord from './ActiveRecord'
const keyword = 'resource';
ActiveRecord.setKeyword( keyword )
export const { save, get, getPath} = ActiveRecord