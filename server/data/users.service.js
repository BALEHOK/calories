const uuidv4 = require('uuid/v4');
const { dbReady, db } = require('./db');
const roles = require('../auth/roles');
const User = require('./entities/user');

let defaultUsers = [
  new User(
    'ac5be0e5-74a2-40f0-9ab8-6f1f01665b1e',
    '1234',
    'user',
    'user@calories.com',
    roles.user,
    true
  ),
  new User(
    '83e1c7f3-f092-411e-b863-0eae67ec0137',
    '1234',
    'manager',
    'manager@calories.com',
    roles.manager,
    true
  ),
  new User(
    '45d8b0ba-d7bf-498b-a28e-cff12a1c25d2',
    '1234',
    'admin',
    'admin@calories.com',
    roles.admin,
    true
  )
];

class UsersService {
  async initDb() {
    if (await db.users.count({}) === 0) {
      return await db.users.insertMany(defaultUsers)
    }

    return true;
  }

  async _get(id) {
    return await db.users.findOne({ id });
  }
  async _getByEmail(email) {
    return await db.users.findOne({ email });
  }
  async _getByToken(accessToken) {
    return await db.users.findOne({ accessToken });
  }
  async setToken(email, accessToken) {
    const result = await db.users.updateOne({ email }, { $set: { accessToken } });
    return result.nModified === 1;
  }
  async _getAll() {
    return await db.users.find().toArray();
  }

  async validate(email, password) {
    const user = await this._getByEmail(email);
    return !!user && !user.isBlocked && user.password === password;
  }

  async add(user) {
    user.id = uuidv4();
    const result = await db.users.insertOne(user);
    return result.insertedCount === 1;
  }

  async update(user) {
    const updateProps = {
      name: user.name,
      email: user.email,
      role: user.role,
      isActivated: user.isActivated,
      isBlocked: user.isBlocked,
    };

    if (user.password) {
      updateProps.password = user.password;
    }

    const result = await db.users.updateOne({ id: user.id }, { $set: updateProps });
    return result.modifiedCount === 1;
  }

  async delete(id) {
    const result = await db.users.deleteOne({ id });
    return result.deletedCount === 1;
  }
}

class UserVmService extends UsersService {
  async get(id) {
    return this.userToVm(await super._get(id));
  }
  async getByEmail(email) {
    return this.userToVm(await super._getByEmail(email));
  }
  async getByToken(accessToken) {
    return this.userToVm(await super._getByToken(accessToken));
  }
  async getAll(email) {
    return (await super._getAll(email)).map(this.userToVm);
  }

  userToVm(user) {
    if (!user) {
      return user;
    }

    let vm = Object.assign(user);
    delete (vm.password);
    return vm;
  }
}

module.exports = new UserVmService();
