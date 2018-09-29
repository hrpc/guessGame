export default {
  user: {
    username: 'hrpc',
    password: '123456',
    role: 'admin'
  },
  port: 3000,
  token:{
    secret:'guessdb',
    key:'guessdb',
    maxAge:60*60//token过期时间
  },
  mongodb:'mongodb://localhost:27017/guessdb'
}
