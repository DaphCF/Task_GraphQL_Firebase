const { gql } = require('apollo-server');

module.exports = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTasks: [Task!]!
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!): Task!
    updateTask(id: ID!, title: String, completed: Boolean): Task!
    deleteTask(id: ID!): Boolean!
  }
`;
