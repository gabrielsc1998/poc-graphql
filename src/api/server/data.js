//const { mergeTypeDefs } = require('graphql-tools');

const domains = require('../domains');
const { users } = domains;

module.exports = {
  resolvers: [users.resolvers],
  typeDefs: [users.schema],
  dataSources: () => {
    return {
      usersAPI: users.api
    }
  }
}