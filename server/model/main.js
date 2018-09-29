import mongoose from '../db/index'
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: String,
  owner: String,
  status: Number, // 0-准备中，1-游戏中
  player: Array
})

// 发布模型生成实例
export const roomModel = mongoose.model('room', roomSchema)
