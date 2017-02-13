module.exports = {
  Mars: {
    semimajor:	227.9, // M km
    perihelion:	206.7, // M km
    aphelion:	249.2, // M km
    average:	228.9, // M km
    eccentricity: 0.0934,
    inclination:	1.850, // deg
    period: 686.565, // days
    zero: 1062028800  + (1000 * 60 * 60 * 24 * 0)// unix timestamp for 0 deg in orbit
  },
  Earth: {
    semimajor: 149.60, // M km
    perihelion:	147.10, // M km
    aphelion:	152.10, // M km
    average:	149.60, // M km
    eccentricity:	0.0167086,
    inclination:	1.578690, // deg
    period:	365.256363004, // days
    zero: 1062028800 // unix timestamp for 0 deg in orbit
  }
}
