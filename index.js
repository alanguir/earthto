var request = require('request');
var parseString = require('xml2js').parseString;
var cache = require('apicache').middleware
var express = require('express');
var port = process.env.PORT || 3000;
var get = require('lodash/get');

var app = express();

var auRegex = /\d+?\.?\d+ au/;
var milesRegex = /\d+? miles/;
var timeRegex = /\d+?\.?\d+ light minutes/;
var kmPerAu = 149598e3; // kimolmeters
var milesPerAu = 9.296e+7; // miles
var sol = 299792.458 // km/s

var APIKEY = process.env.APPID;

app.get('/:body', cache('2 hours'), body);
app.use(express.static('public'));

console.log('listening on port', port)
app.listen(port);


function body(req, res) {
  var body = req.params.body;
  getDistance(body, function(dist, time){
    var km = dist * kmPerAu;
    var Mkm = (km / 1e6).toFixed(2);

    var minutes = (time / 60).toFixed(2);
    var message = 'Could not determine the distance between earth and ' + body + '.';

    if (dist > 0 && time > 0) {
      message = body + ' is currently ' + dist + ' au from Earth ('+ Mkm +' M km). It would take any message ' + minutes + ' minutes to travel between the two bodies.';
    }

    res.json({
      time: time,
      timeUnits: 'light seconds',
      au: dist,
      km: km,
      message: message,
      credits: '2017 by 13protons. Powered by Wolfram Alpha.'
    });
  })
};

function getDistance(body, cb) {
  var query = [
    'http://api.wolframalpha.com/v2/query?input='+ body + '+distance+from+earth',
    'appid=' + APIKEY,
    'includepodid=Result'
  ].join('&');

  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
        if (err) {
          console.error('Err: ', err);
          return;
        }

        var dist = 0;
        var time = 0;
        var text = get(result, 'queryresult.pod[0].subpod[0].plaintext', '');
        if (text.length) {
          var miles = milesRegex.exec(text);
          var au = auRegex.exec(text);
          if (miles) {
            dist = parseFloat(miles[0]) / milesPerAu;
          } else if (au) {
            dist = parseFloat(au[0]);
          }

          time = parseFloat(((dist * kmPerAu)/sol).toFixed(3)); //parseFloat(timeRegex.exec(text)[0]);
        }
        cb(dist, time);
      });
    }
  })
}
