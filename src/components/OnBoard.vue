<template>
  <div id="onboard">
    <h3>Who are you?</h3>
    <p>
      <label><input placeholder="Your Name" v-model="suppliedName" /></label>
    </p>

    <h3>Where are you connecting from?</h3>
    <p>
      <select v-model="selectedPlanet">
        <option v-for="planet in orderedBodies" :value="planet.value">
          <span v-if="planet.isSat">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {{planet.text}}
        </option>
      </select>
    </p>

    <h3>Please choose an avatar</h3>
    <div class="flex three six-600">
      <div v-for="name in avatars" :key="name.id">
        <img :class="{ active: newAvatarId === name.id }" v-on:click="setAvatar(name.id)" class="avatar" :src="'/images/avatars/' + name.url" >
      </div>
    </div>

    <button :disabled="!okToGo" v-on:click="launch" class="mainButton success">Go For Launch</button>

  </div>
</template>

<script>
import {EventBus, system, store} from './util.js';

export default {
  name: 'OnBoard',
  props: {
    planet: {
      default: 'earth',
      type: String
    },
    name: {
      default: '',
      type: String
    },
    avatarId: {
      default: '',
      type: String
    }
  },
  data: function() {
    return {
      avatars: Array(15).fill(0).map(function(item, index){
        index = index + 1;
        if (index < 10) { index = '0' + index; }
        return {id: `avatar-${index}`, url: `avatar-${index}.png`};
      }),
      selectedPlanet: this.planet,
      newAvatarId: this.avatarId,
      suppliedName: this.name
    }
  },
  methods: {
    setAvatar: function(id){
      this.newAvatarId = id;
      console.log('setting avatar id', id);
    },
    launch: function() {
      // save metadata
      let meta = {
        planet: this.selectedPlanet,
        avatarId: this.newAvatarId,
        name: this.suppliedName,
        _firstRun: false
      };

      store.set(meta)

      // broadcast
      EventBus.$emit('launch', meta);
      console.log('launch');
    }
  },
  computed: {
    okToGo: function() {
      return this.suppliedName.length && this.newAvatarId.length && this.selectedPlanet.length;
    },
    orderedBodies: function() {
      let sun = system.bodies.sun;
      let list = [];
      Object.keys(sun.satellites).forEach(function(key){
        let item = system.bodies[key];
        list.push({ text: item.name, value: item.key, isSat: false });
        
        if (item.satellites) {
          Object.keys(item.satellites).forEach(function(key){
            let sat = system.bodies[key];
            list.push({ text: `${sat.name}`, value: sat.key, isSat: true });
          });
        }
      });
      return list;
    }
  }
}
</script>

<style lang="less">
.avatar {
  transition: all .1s ease-in-out;
  width: 64px;
  border: 5px solid transparent;
  &:hover {
    transform: scale(1.25, 1.25);
  }
  &:active {
    transform: scale(1.1, 1.1);
  }
  &.active {
    border-color: #94be72;
  }
}

.mainButton {
    font-size: 1.5em;
}
</style>
