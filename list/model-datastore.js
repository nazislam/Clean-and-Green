'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config/config');
const ds = Datastore({
    projectId: config.get('GCLOUD_PROJECT')
})
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

function findRecyclables(userEmail) {
  const query = ds.createQuery('Client').filter('email', '=', userEmail);
  ds.runQuery(query).then(results => {
    const clients = results[0];
    clients.forEach(client => {
      const clientKey = client[ds.KEY];
      console.log('Client ->', clientKey.id);
      const query02 = ds.createQuery(kind).filter('creatorId', '=', clientKey.id);
      ds.runQuery(query02).then(results => {
        const recyclables = results[0];
        console.log('Found items:');
        recyclables.forEach(recyclable => {
          const recyclableKey = recyclable[ds.KEY];
          console.log(recyclableKey.id);
        });
      });
    });
  });
}

function f2(userEmail, cb) {
  const query = ds.createQuery('Client').filter('email', '=', userEmail);
  ds.runQuery(query, (err, entities) => {
    if (err) {
      cb(err);
      return;
    }
    cb(entities.map(fromDatastore));
  });
}

function f3(userEmail, cb) {
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



module.exports = {findRecyclables, f2, f3};
