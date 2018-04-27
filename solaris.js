let SolarSystem = require('solaris-model');
let system = new SolarSystem
console.log(Object.keys(system.bodies)) // ['sun', 'mercury', 'venus', 'earth', 'moon', 'iss', ...] 

const SOL = 299792458;
system.setTime(new Date())

let earth = system.bodies.earth;
let mars = system.bodies.moon;
console.log(earth.central.position);

console.log('earth.position', earth.position) // [0, 0, 0] 
console.log('mars.position', mars.position) // [0, 0, 0] 
let d = distance(earth, mars);
console.log('earth mars distance', d, transitTime(d))


function distance(planet1, planet2) {
  let p1 = absPos(planet1);
  let p2 = absPos(planet2);

  let x = Math.pow((p2[0] - p1[0]), 2)
  let y = Math.pow((p2[1] - p1[1]), 2)
  let z = Math.pow((p2[2] - p1[2]), 2)

  return Math.sqrt(x + y + z);
}

function absPos(planet) {
  return planet.position.map(function(val, i){
    return val + planet.central.position[i];
  });
}

function transitTime(distance) {
  return distance/SOL
}

//1.46509328863.4344
//1.313×10 ^ 11 meters