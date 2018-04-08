'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config/config');
const ds = Datastore({
    projectId: config.get('GCLOUD_PROJECT')
})

const kind = "Dropoff";


function listRequest() {
  const query = ds.createQuery(kind);
  ds.runQuery(query)
    .then(results => {
      const entries = results[0];

      console.log('Entries');
      entries.forEach(entry => {
        const entryKey = entry[ds.KEY];
        console.log(entryKey.id, entry);
      });
    });
}

module.exports = { listRequest };
