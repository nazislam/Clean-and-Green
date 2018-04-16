const express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  mapRouter = express.Router();

mapRouter.use(bodyParser.urlencoded({ extended: false }));

function findLatLng(addressString) {
  var resultObj = {};
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addressString}`,
    json: true
  }, (error, response, body) => {
    resultObj.formattedAddress = body.results[0].formatted_address;
    resultObj.Latitude = body.results[0].geometry.location.lat;
    resultObj.Longitude = body.results[0].geometry.location.lng;
    // console.log(`Address: ${body.results[0].formatted_address}`);
    // console.log(`Lat: ${body.results[0].geometry.location.lat}`);
    // console.log(`Lng: ${body.results[0].geometry.location.lng}`);
    return resultObj;
  });
}

mapRouter.route('/')
  .post(function(req, res) {
    const encodedAddress = encodeURIComponent(req.body.address);

    var resultObj = {};
    request({
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      resultObj.formattedAddress = body.results[0].formatted_address;
      resultObj.Latitude = body.results[0].geometry.location.lat;
      resultObj.Longitude = body.results[0].geometry.location.lng;
      console.log(resultObj);
      res.render('mapui', { user: req.user, location: resultObj });
    });
    // res.render('mapui', { user: req.user });
  });

module.exports = mapRouter;
