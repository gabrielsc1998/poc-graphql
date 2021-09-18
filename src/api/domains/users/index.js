const schema = require('./schema/index.graphql');
const resolvers = require('./resolvers');
const API = require('./datasource');

module.exports = {
  schema,
  resolvers,
  api: new API()
}
