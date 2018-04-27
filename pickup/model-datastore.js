/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config/config');
const request = require('request');
const ds = Datastore({
    projectId: config.get('GCLOUD_PROJECT')
});
const kind = "Recyclables";

function fromDatastore (obj) {
    obj.id = obj[Datastore.KEY].id;
    return obj;
}

function toDatastore (obj) {
    const results = [];
    Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined) {
            return;
        }
        results.push({
            name: k,
            value: obj[k]
        });
    });
    return results;
}

function processItemAsArray(itemAsString) {
  var a = itemAsString;
  var result = [];
  result.push(a);
  return result;
}

function generateAddress(data) {
  var address = '';
  for (var prop in data) {
    // console.log(prop);
    address = address + data[prop];
    address = address + ', ';
  }
  return address;
}

function create(data, email) {
  var rawAddress = {
    street: data.street,
    city: data.city,
    state: data.state,
    zip: data.zip
  };
  var inputAddress = generateAddress(rawAddress);
  console.log(inputAddress);
  const encodedAddress = encodeURIComponent(inputAddress);
  console.log(encodedAddress);
  

  // For getting latitude and longitude
  var requestCounter = 0;
  var requestLoop = setInterval(function(){
    request({
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
           requestCounter++;
           console.log(requestCounter);
         if (body.results[0] !== undefined && requestCounter >= 1) {
           const message = '';
           data.latitude = body.results[0].geometry.location.lat;
           data.longitude = body.results[0].geometry.location.lng;
           var addressFound = true;
           clearInterval(requestLoop);
         }
         if (requestCounter === 10) {
           clearInterval(requestLoop);
         }
      }
    );
  }, 500);


  const newKey = ds.key(kind);
  const query = ds.createQuery('Client')
    .filter('email', '=', email);
  ds.runQuery(query).then(results => {
    const clients = results[0];
    clients.forEach(client => {
      const clientKey = client[ds.KEY];
      data.creatorId = clientKey.id;
      const entity = {
        key: newKey,
        data: toDatastore(data)
      };
      ds.save(entity);
    });
  });
}



module.exports = { create, processItemAsArray, /*findUser*/ };
