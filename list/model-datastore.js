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

function findRecyclables(userEmail, cb) {
  const query = ds.createQuery('Client').filter('email', '=', userEmail);
  ds.runQuery(query).then(results => {
    const clients = results[0];
    clients.forEach(client => {
      const clientKey = client[ds.KEY];
      const clientId = clientKey.id;
      const query02 = ds.createQuery('Recyclables').filter('creatorId', '=', clientId);
      ds.runQuery(query02, (err, entities) => {
        if (err) {
          cb(err);
          return;
        }
        cb(entities.map(fromDatastore));
      });
    });
  });
}



module.exports = {findRecyclables};
