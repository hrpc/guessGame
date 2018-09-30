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
        <button class="confirm-btn" @click="close">关闭</button>
      </div>
    </div>
    <div class="rooms">
      <div class="room" v-for="n in 10" ref="ref" >
         <div v-if="rooms.length > 0 && rooms.length >= n" class="inner" @click="enter">
           <p>{{rooms[n-1].title}}</p>
           <p>房主：{{rooms[n-1].owner}}</p>
           <p>玩家人数：{{rooms[n-1].player.length}}</p>
           <p>状态：{{computedStatus(rooms[n-1].status)}}</p>
         </div>
      </div>
      <div class="placeholder" v-for="n in addNum"></div>
    </div>
  </div>
</template>

<script>
import socket from 'socket.io-client'
import { createRoom, findAllRooms } from '@/assets/api/index'
const io = socket('http://172.20.33.10:3001')
export default {
  name: 'index',
  data () {
    return {
      msg: '',
      users: [],
      cName: '',
      showCreateRoom: false,
      rooms: [],
      addNum: 0
    }
  },
  computed: {
  },
  methods: {
    computedStatus(status) {
      return status === 0 ? '准备中' : '游戏中'
    },
    enter () {
      this.$router.push('room')
    },
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
    close () {
      this.showCreateRoom = false
    },
    _createRoom () {
      this.showCreateRoom = true
    },
    addPlaceHolder () {
      let roomsRef = this.$refs.ref
      let cutIndex = 0
      for(let i = 0; i<roomsRef.length; i++){
        if (roomsRef[i + 1] && roomsRef[i].offsetTop !== roomsRef[i + 1].offsetTop) {
          cutIndex = i
          break;
        }
      }
      let reverNum = roomsRef.length % (cutIndex + 1) || cutIndex + 1
      this.addNum = cutIndex + 1 - reverNum
      console.log('this.addNum', cutIndex + 1)
    },
    _findAllRooms () {
      findAllRooms().then(res => {
        this.rooms = res.data.data
        this.$nextTick(() => {
          this.addPlaceHolder()
        })
      })
    },
    confirm () {
      // 判断当前用户是否已经创建过房间
      let hasOneRoom = this.rooms.some(item => {
        return item.owner === this.$cookie.get('token')
      })
      if (hasOneRoom) {
        alert('您已经创建过房间了，不能重复创建，爱你哟。')
        return
      }
      
      let serverData = {
        title: this.cName,
        owner: this.$cookie.get('token'),
        status: 0,
        player: [this.$cookie.get('token')]
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
    io.on('creatRoom', () => {
      this._findAllRooms()
    })
    io.on('online', data => {
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
  .inner {
    cursor: pointer;
  }
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
	from {
	  transform: translateY(-150%);
	}
	to {
	  transform: translateY(0);
	}
}
</style>
