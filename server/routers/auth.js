import Router from 'koa-router'
import * as Controller from '../controller/main'
import io from '../main.js'

const router = new Router()

router.post('/login', async (ctx) => {
  ctx.body = 'login'
})
router.post('/createRoom', async (ctx) => {
  let result = {
    code: 0,
    data: ''
  }
  let obj = ctx.request.body
  try{
  	  const res = await Controller.addRoom(obj)
    result.data = '创建成功'
    io.sockets.emit('creatRoom');
    ctx.body = result
  }catch(e){
  	 // TODO handle the exception
    result.code = 500
    result.data = '服务器错误'
    ctx.body = result
  }
})
router.post('/findAll', async (ctx) => {
  let result = {
    code: 0,
    data: ''
  }
  try{
  	 let res =  await Controller.findAllRooms()
  	 result.code = 0
    if (!res) {
      res = []
    }
    result.data = res
  }catch(e){
  	//TODO handle the exception
  	  result.code = 500
    ctx.throw(401, '服务器错误')
  }
  ctx.body = result
})
export default router