'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config/config');
const ds = Datastore({ projectId: config.get('GCLOUD_PROJECT') });

const kindClient = "Client";
const kindDriver = "Driver";

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

function createClient(data) {
    const entity = {
        key: ds.key(kindClient),
        data: toDatastore(data)
    };
    ds.save(entity);
}

function createDriver(data) {
    const entity = {
        key: ds.key(kindDriver),
        data: toDatastore(data)
    };
    ds.save(entity);
}


module.exports = { createClient, createDriver };
