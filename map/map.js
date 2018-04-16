const express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  mapRouter = express.Router();

mapRouter.use(bodyParser.urlencoded({ extended: false }));

mapRouter.route('/')
  .post(function(req, res) {
    const encodedAddress = encodeURIComponent(req.body.address);
    var addressFound = false;
    var requestCounter = 0;

    var requestLoop = setInterval(function(){

      var resultObj = {};
      request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      }, (error, response, body) => {
             requestCounter++;
             console.log(requestCounter);
           if (body.results[0] !== undefined && requestCounter >= 1) {
             console.log(typeof body.results);
             const message = '';
             resultObj.formattedAddress = body.results[0].formatted_address;
             resultObj.latitude = body.results[0].geometry.location.lat;
             resultObj.longitude = body.results[0].geometry.location.lng;
             console.log(resultObj);
             var addressFound = true;
             clearInterval(requestLoop);
             res.render('mapui', { user: req.user, location: resultObj, response: message });
           }
           if (requestCounter === 10) {
             clearInterval(requestLoop);
             const message = 'Please try again';
             res.render('mapui', { user: req.user, location: resultObj, response: message });
           }
        }
      );
    }, 500);
  });





module.exports = mapRouter;
