import Vue from 'vue';
import _ from 'lodash';

// eslint-disable-next-line
const system = new SolarSystem;
const EventBus = new Vue();
const store = new Data();
// let bodies = function () {
//   return Object.keys(system.bodies).map(function (val, key) {
//     return { text: val, value: val };
//   })
// }

export {system, EventBus, store} 
export default EventBus;

function Data() {
  var model = window.localStorage.getItem('earthTo');
  if (!model) {
    model = {
      name: '',
      planet: 'earth',
      avatarId: '',
      uid: require('cuid')(),
      _firstRun: true
    }
    
    window.localStorage.setItem('earthTo', JSON.stringify(model));
  } else {
    model = JSON.parse(model);
  }

  this.get = function(key) {
    if (key) { return _.get(model, key)}
    return model;
  }
  this.set = function(keyOrMerge, val) {
    console.log('attempting to set ', keyOrMerge, val);
    if (_.isPlainObject(keyOrMerge)) {
      delete keyOrMerge.uid
      model = _.assign({}, model, keyOrMerge);
    } else {
      if (keyOrMerge === 'uid') {
        console.error('cannot override uid');
        return;
      }
      _.set(model, keyOrMerge, val);
    }
    window.localStorage.setItem('earthTo', JSON.stringify(model));
  }

  return this;
}

// new Vue({
//   el: '#earthto',
//   data: function () {
//     return {
//       name: '',
//       planet: '',
//       messages: [],
//       msg: '',
//       id: '',
//       position: [],
//       bodies: Object.keys(system.bodies)
//     };
//   },
//   mounted: function () {
//     var self = this;


//     this.ensureID();
//     this.loadPlanet();
//     this.updatePosition();

//     EventBus.$on('transmission:receive', function (msg) {
//       self.messages.push(msg);
//     });

//     setInterval(this.updatePosition, 1000 * 60);
//   },
//   computed: {
//     planetSelect: function () {
//       return Object.keys(system.bodies).map(function (val, key) {
//         return { text: val, value: val };
//       })
//     }
//   },
//   methods: {
//     transmit: function () {

//       var payload = {
//         broadcastTime: Date.now(),
//         position: this.position,
//         planet: this.planet,
//         name: this.name,
//         senderID: this.id,
//         message: this.msg
//       }

//       console.log('sending', payload);
//       EventBus.$emit('transmission', payload);
//       this.msg = '';
//     },
//     ensureID: function () {
//       var uid = window.localStorage.getItem('uid');
//       if (!uid) {
//         uid = cuid();
//         window.localStorage.setItem('uid', uid);
//       }
//       this.id = uid;
//       console.log('uid', uid);
//     },
//     loadPlanet: function (name) {
//       console.log('load planet', name);
//       var self = this;

//       if (name) {
//         setPlanet(name);
//       } else {
//         var planet = window.localStorage.getItem('planet');

//         if (!planet) { planet = 'earth'; }
//         setPlanet(planet);
//       }

//       function setPlanet(name) {
//         self.planet = name;
//         window.localStorage.setItem('planet', name);
//       }

//       console.log('planet', self.planet);
//     },
//     updatePosition: function () {
//       system.setTime(new Date());
//       var planet = system.bodies[this.planet];
//       console.log('updating position', planet, this.planet);

//       this.position = absPos(planet);
//       return this.position;

//       function absPos(planet) {
//         return planet.position.map(function (val, i) {
//           return val + planet.central.position[i];
//         });
//       }
//     }
//   }
// })
