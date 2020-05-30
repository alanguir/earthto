<template>
  <div id="chat">
    <div class="messages">
      <div class="message" v-for="message in history" :key="message.messageId">
        <div class="avatar">
          <img :src="avatarById(message.avatarId)">
        </div>
        <div class="content">
          <div class="meta">
            <strong>{{message.name}}</strong>
            - Sent from <strong>{{ planetById(message.planet).name }}</strong> at {{ legibleTime(message.timestamp) }}
          </div>
          {{message.content}}
        </div>
      </div>
    </div>
    <div class="transmit">
      <div class="icon"><img :src="avatarSrc"></div>
      <div class="input">
        <textarea 
          :placeholder="'Transmitting from ' + planetName + '.'"
          v-model="msg"
          @keydown.13.exact.prevent="send">
        </textarea>
      </div>
      <div class="status">+/-</div>
    </div>
  </div>
</template>
<script>
  import {EventBus, system/*, store*/} from './util.js';
  import Vue from 'vue';

  export default {
    name: 'Chat',
    props: ['planet', 'name', 'avatarId', 'history'],
    data: function() {
      return {
        msg: '',
        queue: []
      }
    },
    computed: {
      planetName: function(){
        return this.planetById(this.planet).name;
      },
      avatarSrc: function() {
        return this.avatarById(this.avatarId);
      }
    },
    methods: {
      avatarById: function(id) {
        return `/images/avatars/${id}.png`;
      },
      planetById: function(id){
        return system.bodies[id] || system.bodies.sun;
      },
      send: function() {
        console.log('add to send queue', this.msg);
        
        EventBus.$emit('transmit', this.msg);
        Vue.nextTick(() => {
          Vue.set(this, 'msg', '');
        })
        
      },
      legibleTime: function(ts) {
        return new Date(ts).toString();
      }
    }
  }
</script>
<style lang="less">
  .messages {
   text-align: left;
   .message {
    display: flex;
    padding-bottom: 1em;
   }
   .avatar {
     width: 32px;
     height: 32px;
     background-color: white;
     img {
       width: 100%;
     }
   }
   .content {
     flex-grow: 1;
     padding-left: 1em;
     .meta {
       font-size: 80%;
       color: #aaa;
     }
   }
  }
  .transmit {
    display: flex;
    width: 100%;
    height: 64px;
    position: absolute;
    bottom: 2em;
    left: 0;
    padding: 1em;
    box-sizing: border-box;
    > * {
      background-color: #888;
      height: 64px;
    }
    .icon {
      width: 65px;
      border-right: 1px solid gray;
      border-bottom: none;
      img {
        width: 100%;
      }
    }
    .input {
      flex-grow: 1;
      textarea {
        height: 100%;
        border: none;
        resize: none;
        border-radius: 0px;
      }
    }
    
    .status {
      width: 65px;
      border-left: 1px solid gray;
    }
  }
</style>