const { RESTDataSource } = require('apollo-datasource-rest');

const basePath = '/users';

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
  }

  _resp = (code, msg, data) => {
    let resp = {
      code,
      msg,
      data
    };
    if(!resp.code) {
      delete resp.code;
    }
    if(!resp.msg) {
      delete resp.msg;
    }
    if(!resp.data) {
      delete resp.data;
    }
    return resp;
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
      return this._resp(
        201, 'Created user', 
        {
          id: resp.id,
          name: resp.name,
        }
      );
    }
  }

  update = async (id, user) => {
    const resp = await this.put(`${basePath}/${id}`, {...user});
    if(resp) {
      return this._resp(
        200, 'Updated user', 
        {
          id: resp.id,
          name: resp.name,
        }
      );
    } else {
      return this._resp(400);
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