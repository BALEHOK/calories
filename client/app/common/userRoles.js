const roles = {
  user: 1,
  manager: 2,
  admin: 4,
  any: 7
};

Object.keys(roles).forEach(r => roles[roles[r]] = r);

module.exports = roles;
