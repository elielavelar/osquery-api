import db from '../config/db'
import { v4 as uuidv4 } from 'uuid'
import * as ActiveRecord from './ActiveRecord'
import { getDifference, merge, inspect } from '../libraries/utils.library' 

const keyword = 'changes';
ActiveRecord.setKeyword( keyword )
export const { save, get, getPath } = ActiveRecord

export { getDifference as validateDataChanges, merge, inspect }