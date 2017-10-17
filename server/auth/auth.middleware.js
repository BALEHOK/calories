const atob = require('atob');
const uuidv4 = require('uuid/v4');

const roles = require('./roles');
const usersService = require('../data/users.service');

async function authenticate(req, res) {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const authParts = authHeader.split(' ');

    if (authParts.length == 2 && authParts[0] == 'Basic' && !!authParts[1]) {
      const [username, pass] = atob(authParts[1]).split(':');

      if (await usersService.validate(username, pass)) {
        const accessToken = uuidv4();
        await usersService.setToken(username, accessToken);

        res.json({ accessToken });
        return;
      }
    }
  }

  res.sendStatus(401);
}

async function logout(req, res) {
  await authorizeInternal(roles.any, req, res, async () => {
    await usersService.setToken(req.user.id, null);
    res.send('OK');
  });
}

function authorize(role = roles.any) {
  return async (req, res, next) => {
    await authorizeInternal(role, req, res, next);
  };
}

async function authorizeInternal(role, req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const authParts = authHeader.split(' ');

    if (authParts.length == 2 && authParts[0] == 'Bearer' && !!authParts[1]) {
      const user = await usersService.getByToken(authParts[1]);

      if (user && (user.role & role)) {
        req.user = user;

        next();
        return;
      }
    }
  }

  res.sendStatus(401);
}

module.exports = { authorize, authenticate, logout };
