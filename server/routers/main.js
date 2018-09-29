import Router from 'koa-router'
import auth from './auth.js'
const router = new Router()

router.use('/api', auth.routes(), auth.allowedMethods())

export default router