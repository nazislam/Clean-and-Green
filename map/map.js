const express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  mapRouter = express.Router();

mapRouter.use(bodyParser.urlencoded({ extended: false }));

mapRouter.route('/')
  .post(function(req, res) {
    const encodedAddress = encodeURIComponent(req.body.address);

    var resultObj = {};
    request({
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (body.results[0] === undefined) {
        const message = 'Please try again';
        res.render('mapui', { user: req.user, location: resultObj, response: message });
      } else {
        const message = '';
        resultObj.formattedAddress = body.results[0].formatted_address;
        resultObj.latitude = body.results[0].geometry.location.lat;
        resultObj.longitude = body.results[0].geometry.location.lng;
        res.render('mapui', { user: req.user, location: resultObj, response: message });
      }
    });
  });

module.exports = mapRouter;
