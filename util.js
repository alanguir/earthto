module.exports = {
  degToRad: degToRad,
  opposite: opposite,
  coords: coords,
  distance: distance,
  currentAngle: currentAngle,
  travelTime: travelTime
}

var speedOfLight = .299792458;

var degree = {
  none: 0,
  quarter: 90,
  half: 180,
  threeQuarter: 270,
  full: 360
}

function degToRad(deg) {
  return (Math.PI * deg) / degree.half;
}

function opposite(hypotenuse, angle) {
  if (angle % degree.half === 0) {return 0;}
  return hypotenuse * Math.sin(degToRad(angle));
}

function coords(radius, deg) {
  var other = degree.quarter - deg;
  return [opposite(radius, other), opposite(radius, deg)];
}

function distance(pos1, pos2) {
  var d1 = pos1[0] - pos2[0];
  var d2 = pos1[1] - pos2[1];

  return Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2));
}

function currentAngle(timestamp, planet) {
  var t = timestamp - planet.zero;
  var days = t / (1000 * 60 * 60 * 24);
  return (((days / planet.period) * (2 * Math.PI)) * degree.half) % degree.full;
}

function travelTime(mkm) {
  //convert million kilometers to light seconds;
  var sec = mkm / speedOfLight;
  return {
    sec: sec,
    min: sec / 60,
    hour: sec / 60 / 60
  }
}
