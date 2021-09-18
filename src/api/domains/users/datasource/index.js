const { RESTDataSource } = require('apollo-datasource-rest');

const basePath = '/users';

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
  }

  getAll = async () => {
    const users = await this.get(basePath);
    return users.map(async user => ({
      id: user.id,
      name: user.name,
    }))
  }

  getById = async (id) => {
    const user = await this.get(`${basePath}/${id}`);
    return {
      id: user.id,
      name: user.name
    }
  }

  create = async (user) => {
    const users = await this.get(basePath);
    const resp = await this.post(basePath, {...user, id: users.length + 1 });
    if(resp) {
      return {
        id: user.id,
        name: user.name
      }
    }
  }

  update = async (id, user) => {
    const resp = await this.put(`${basePath}/${id}`, {...user});
    return {
      id: resp.id,
      name: resp.name
    }
  }

  deleteById = async (id) => {
    await this.delete(`${basePath}/${id}`);
    return { 
      id
    }
  }
}

module.exports = UsersAPI;