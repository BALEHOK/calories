const router = require('express').Router();
const authorize = require('../auth/auth.middleware').authorize;
const userService = require('../data/users.service');
const roles = require('../auth/roles');
const User = require('../data/entities/user');

router.get('/', authorize(roles.any), (req, res) => res.json(req.user));

router.post('/register', async (req, res) => {
  const reqUser = req.body;
  const user = new User(
    null,
    reqUser.password,
    reqUser.name,
    reqUser.email,
    roles.user
  );
  res.send(await userService.add(user));
});

// router.put('/activate', (req, res) => res.send('N/A'));

module.exports = router;
