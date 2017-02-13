var util = require('./util.js');
var orbits = require('./orbits.js');
var _ = require('lodash');
// AEWAW5-9P84R5KKJ9
// http://api.wolframalpha.com/v2/query?input=earth%20mars%20distance&appid=AEWAW5-9P84R5KKJ9&includepodid=BasicPlanetOrbitalProperties:PlanetData

var now = Date.now(); // 1062028800 // Date.now();

orbits = _.mapValues(orbits, function(val, key, source){
  val.angle = util.currentAngle(now, val);
  val.coords = util.coords(val.average, val.angle);
  // console.log('the orbit of', key, val);
  return val;
})

var distance = util.distance(orbits.Earth.coords, orbits.Mars.coords);
console.log('distance in M km', distance, util.travelTime(distance));
