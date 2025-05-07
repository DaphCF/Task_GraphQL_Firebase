require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas/taskSchema');
const resolvers = require('./resolvers/taskResolver');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Servidor corriendo en ${url}`);
});
