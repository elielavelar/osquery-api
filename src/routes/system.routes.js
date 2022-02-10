import * as express from 'express'
import PromiseRouter from 'express-promise-router'
import * as systemController from '../controllers/system.controller'

const router = PromiseRouter()

router.get('/system/dataset/:user/:program/:relation/data', systemController.getData )
router.get('/system/info', systemController.getInfo )
router.get('/system/os', systemController.getOS )
router.get('/system/tables', systemController.getTables )
router.get('/system/search', systemController.search )
 
export default router;