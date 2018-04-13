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

function create(data) {
    const entity = {
        key: ds.key(kind),
        data: toDatastore(data)
    };
    ds.save(entity);
}



module.exports = { create, processItemAsArray };
