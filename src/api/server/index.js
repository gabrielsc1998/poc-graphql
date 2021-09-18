const { ApolloServer } = require('apollo-server');
// const ApolloServerCore = require("apollo-server-core");

const data = require('./data');
const { typeDefs, resolvers, dataSources } = data;

class Server {
  server = null;
  constructor() {
    this.server = new ApolloServer({ 
      typeDefs,
      resolvers,
      dataSources,
      // plugins: [ApolloServerCore.ApolloServerPluginInlineTrace()],
    })
  }

  start = async () => {
    this.server.listen().then(({url}) => {
      console.log(`## Server running on: ${url}`);
    });
  }
}

module.exports = new Server();