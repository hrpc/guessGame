import * as Schema from '../model/main'

export const addRoom = async function (roomObj) {
  return Schema.roomModel.create(roomObj)
}

export const findAllRooms = async function () {
  return Schema.roomModel.find()
}

export const removeAllRooms = function () {
  return Schema.roomModel.remove()
}
