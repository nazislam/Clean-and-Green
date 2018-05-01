/* jshint esversion: 6 */
/* jshint node: true */


'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config/config');
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

function toDatastore (obj, nonIndexed) {
  nonIndexed = nonIndexed || [];
  const results = [];
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined) {
      return;
    }
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1
    });
  });
  return results;
}

function list (limit, token, cb) {
  const q = ds.createQuery([kind])
    .limit(limit)
    //.order('title')
    .start(token);

  ds.runQuery(q, (err, entities, nextQuery) => {
    if (err) {
      cb(err);
      return;
    }
    const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
    cb(null, entities.map(fromDatastore), hasMore);
  });
}


/*
function listRequest() {
  var results = [];
  const query = ds.createQuery(kind);
  ds.runQuery(query)
    .then(results => {
      const entries = results[0];

      console.log('Entries');
      entries.forEach(entry => {
        const entryKey = entry[ds.KEY];
        // console.log(entryKey.id, entry);
        results.push(entry);
        console.log(entry);
      });
    });
}
*/

module.exports = { list };
