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

function processItemAsArray(itemAsString) {
  var a = itemAsString;
  var result = [];
  result.push(a);
  return result;
}

function findUser(firstName, lastName, newKey) {
  const query = ds.createQuery('Client')
    .filter('firstName', '=', firstName)
    .filter('lastName', '=', lastName);
  ds.runQuery(query).then(results => {
    const client = results[0];
    clients.forEach(client => {
      const clientKey = client[ds.KEY];
      console.log('Found Client ID:', clientKey.id);
      ds.get(newKey).then(results => {
        var recyclable = results[0];
        console.log('Found entity:', recyclable);
        ds.update(recyclable).then(() => {
          console.log('Entity: recyclable has been updated.');
        });
      });
    });
  });
}

function create(data, email) {
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
      ds.save(entity)
        .then(() => { console.log(`Recyclable ${newKey.id} saved entity`) });
    })
  });
}



module.exports = { create, processItemAsArray, findUser };
