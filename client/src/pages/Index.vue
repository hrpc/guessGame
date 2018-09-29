<template>
  <div class="index-wrapper">
    <h1 class="header">大厅</h1>
    <p class="">在线用户数：{{users.length}}</p>
    <div class="set-room">
    	 <button class="create" @click="_createRoom">创建房间</button>
    </div>
    <div class="create-zone" v-if="showCreateRoom">
      <div class="c-wrapper">
        <h2 class="title">创建房间</h2>
        <div>
          <label for="roonname">房间名称</label>
          <input id="roonname" type="text" v-model="cName"/>
        </div>
        <button class="confirm-btn" @click="confirm">确认</button>
      </div>
    </div>
    <div class="rooms">
      <div class="room" v-for="item in 10">
      </div>
      <div class="placeholder"></div>
      <div class="placeholder"></div>
    </div>
  </div>
</template>

<script>
import socket from 'socket.io-client'
import { createRoom, findAllRooms} from '@/assets/api/index'
const io = socket('http://172.20.33.10:3001')
export default {
  name: 'index',
  data () {
    return {
      msg: '',
      users: [],
      cName: '',
      showCreateRoom: false
    }
  },
  methods: {
    checkLogin () {
      if (!this.$cookie.get('token')) {
        this.$router.push('login')
      } else {
        this.chat()
      }
    },
    chat () {
      let user = this.$cookie.get('token')
      io.emit('online', {user: user})
    },
    initRoom () {
      io.on('rooms', data => {
        console.log('rooms', data)
      })
    },
    _createRoom () {
      this.showCreateRoom = true
    },
    _findAllRooms() {
      findAllRooms(res => {
        console.log('res', res)
      })
    },
    confirm () {
      let serverData = {
        title: this.cName,
        owner: this.$cookie.get('token'),
        status: 0,
        player:[this.$cookie.get('token')]
      }
      createRoom(serverData)
      this.showCreateRoom = false
    }
  },
  mounted () {
    this.checkLogin()
    this.initRoom()
    this._findAllRooms()
    io.on('connect', () => {
    })
    io.on('online', data => {
      console.log('io.on', data)
      this.users = data.users
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.header{
  text-align: center;
  font-size: 24px;
}
.rooms{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.room{
  flex: 0 1 250px;
  height: 200px;
  background-color: #eee;
  margin-bottom: 20px;
}
.placeholder{
  flex: 0 1 250px;
  height: 0;
}
.create-zone{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.c-wrapper{
  width: 35%;
  padding: 15px 20px;
  background-color: #fff;
  animation: slide 0.5s ease;
}
@keyframes slide{
	from{
	  transform: translateY(-150%);
	}
	to{
	  transform: translateY(0);
	}
}
</style>
