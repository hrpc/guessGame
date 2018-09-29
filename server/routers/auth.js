import Router from 'koa-router'
import * as Controller from '../controller/main'

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
  	  console.log('chegng')
    result.data = '创建成功'
    ctx.body = result
  }catch(e){
  	 //TODO handle the exception
    	console.log('失败')
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
  	 let res =  Controller.findAllRooms()
  	 result.code = 0
    if (!res) {
      res = []
    }
    console.log('findAll', res)
    result.data = res
    
  }catch(e){
  	//TODO handle the exception
  	  result.code = 500
    ctx.throw(401, '服务器错误')
  }
  ctx.body = result
})
export default router