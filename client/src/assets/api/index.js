import axios from 'axios'

export const login = (serverData) => {
  return axios.post('/api/login')
}

export const createRoom = (serverData) => {
  return axios.post('/api/createRoom', serverData)
}

export const findAllRooms = () => {
  return axios.post('api/findAll')
}
