const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'mobilefinale',
  location: 'asia-east1'
};
exports.connectorConfig = connectorConfig;

