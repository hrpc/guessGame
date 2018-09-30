<template>
  <div class="room-wrapper">
    <h1 class="header">房间</h1>
    <div class="main-content">
      <div class="draw-zone">
        画图区域
        <span class="danmu">{{this.msg}}</span>
      </div>
      <div class="msg-zone">
        <div class="show-msg">
          <div class="msg-list" v-for="item in msgs" :class="checkAuthor(item.author)">
            <img src="../../build/logo.png" alt="avatar" class="avatar"/>
            <div class="main">
              <p class="author text-left">{{item.author}}</p>
              <p class="content text-left">{{item.content}}</p>
            </div>
          </div>
        </div>
        <div class="sendMsg">
          <input type="text" class="input" v-model="msg"/>
          <button class="send" @click="send">发送</button>
        </div>
      </div>
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
      msgs: [
        {
          author: 'zhangsan',
          content: '你这画的是个啥啊？'
        }
      ]
    }
  },
  methods: {
    send () {
      this.msgs.push({
        author: this.$cookie.get('token'),
        content: this.msg
      })
    },
    checkAuthor (author) {
      if (author === this.$cookie.get('token')) {
        return 'flex-reverse'
      }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.header{
  text-align: center;
  font-size: 24px;
}
.main-content{
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  .draw-zone{
    width: 75%;
    height: 650px;
    background-color: #fff;
    border: 4px solid #eee;
    position: relative;
    overflow: hidden;
    .danmu{
      position: absolute;
      left: 100%;
      top: 0;
      min-width: 200px;
      animation: slide 8s linear;
    }
  }
  .msg-zone{
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #eee;
    .show-msg{
      flex: 1;
      .msg-list{
        display: flex;
        &.flex-reverse{
          flex-direction: row-reverse;
          .text-left{
            text-align: right !important;
          }
        }
        .avatar{
          width: 40px;
          height: 40px;
        }
        .main{
          p{
            margin: 0;
          }
          .text-left{
            text-align: left;
          }
        }
      }
    }
  }
}
@keyframes slide{
	0{
	  color: red;
	  left: 100%;
	}
	100%{
	  color: #000;
	  left: -20%;
	}
}
</style>
