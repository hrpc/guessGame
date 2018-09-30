import Koa from 'koa'
import socket from 'socket.io'
import http from 'http'
import Router from 'koa-router'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import router from './routers/main.js'

const app = new Koa()

app.use(cors({
  origin:function(ctx){
    if(ctx.url === '/test'){
      return false
    }
    return 'http://172.20.33.10:8080'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())//将路由挂载到koa上

// http来启动server
const server = http.createServer(app.callback())
// 挂载io
const io = socket(server)
let users = []
// 监听客户端连接
io.on('connection', socket => {
  socket.on('online', data => {
    socket.name = data.user
    //users 对象中不存在该用户名则插入该用户名
    if (users.findIndex((ele => {
      return ele === data.user
    })) < 0) {
      users.push(data.user)
    }
    io.sockets.emit('online', {users: users, user: data.user});
//  let rooms = [{
//    id: 'R20180929',
//    owner: data.user,
//    player: [
//      {
//        name: 'zhangsan'
//      },
//      {
//        name: 'wangwu'
//      }
//    ],
//    // 0-准备中，1-游戏中
//    status: 0
//  }]
//  socket.emit('rooms', rooms)
  })
})

server.listen(3001, () => {
  console.log(`listen 3001 port`)
})

export default io
