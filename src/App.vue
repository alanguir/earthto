<template>
  <div id="app">
    <nav-bar></nav-bar>
    <on-board 
      :planet="model.planet" 
      :name="model.name"
      :avatar-id="model.avatarId"
      v-if="shouldOnboard"
    ></on-board>
    
  </div>
</template>

<script>
import {EventBus, store} from './components/util.js';
import OnBoard from './components/OnBoard.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  data: function() {
    return {
      model: store.get(),
      showSettings: false
    }
  },
  components: {
    OnBoard,
    NavBar
  },
  mounted: function(){
    EventBus.$on('launch', this.updateModel);
  },
  methods: {
    updateModel: function(){
      console.log('updating model');
      this.model = store.get();
    }
  },
  computed: {
    shouldOnboard: function() {
      return this.model._firstRun || this.showSettings
    }
  }
}
</script>

<style lang="less">
  body {
      background: #232323 url('/images/stars.png') fixed;
  } 

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fcfbf5;
    padding: 1em;
    padding-top: 80px;

    input, select, textarea {
      color: #232323;
    }
  }
</style>
