const userResolvers = {
  Query: {
    users: (root, args, { dataSources }) => dataSources.usersAPI.getAll(),
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getById(id),
  },
  Mutation: {
    create: (root, { user }, { dataSources }) => dataSources.usersAPI.create(user),
    update: (root, { id, user }, { dataSources }) => dataSources.usersAPI.update(id, user),
    delete: (root, { id }, { dataSources }) => dataSources.usersAPI.deleteById(id),
  } 
}

module.exports = userResolvers;