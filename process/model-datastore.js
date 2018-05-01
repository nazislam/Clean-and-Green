/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config/config');
const request = require('request');
const path = require('path');
const ds = Datastore({ 
  projectId: config.get('GCLOUD_PROJECT'),
  keyFilename: path.join(__dirname, '../config/keyFile.json')
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

function processRequest(address) {
  const query = ds.createQuery(kind).filter('street', '=', address);
  ds.runQuery(query).then(results => {
    const entries = results[0];
    entries.forEach(entry => {
      const entryKey = entry[ds.KEY];
      entry.processed = true;
      const entity = {
        key: entryKey,
        data: entry
      };
      ds.update(entity);
    });
  });
}


module.exports = { processRequest };
