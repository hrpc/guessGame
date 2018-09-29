import config from '../config/db-default'
import mongoose from 'mongoose'

mongoose.connect(config.mongodb) //连接数据库
mongoose.Promise = global.Promise;

const db = mongoose.connection

db.on('error',console.log.bind(console,'connection error:'));
db.once('open',function(){
  console.log('连接正常')
})

export default mongoose
