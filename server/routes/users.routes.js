const router = require('express').Router();

const User = require('../data/entities/user');
const usersService = require('../data/users.service');

router.get('/', async (req, res) => {
  res.json(await usersService.getAll());
});

router.get('/:id', async (req, res) => {
  res.json(await usersService.get(req.params.id));
});

router.post('/', async (req, res) => {
  const reqUser = req.body;
  const user = new User(
    null,
    reqUser.password,
    reqUser.name,
    reqUser.email,
    reqUser.role,
    reqUser.isActivated,
    null,
    null,
    reqUser.isBlocked
  );

  if (await usersService.add(user)){
    res.send('OK');
    return;
  }

  res.status(500).send('Failed');
});

router.put('/', async (req, res) => {
  const reqUser = req.body;
  const user = new User(
    reqUser.id,
    reqUser.password,
    reqUser.name,
    reqUser.email,
    reqUser.role,
    reqUser.isActivated,
    null,
    null,
    reqUser.isBlocked
  );

  if (await usersService.update(user)){
    res.send('OK');
    return;
  }

  res.status(500).send('Failed');
});

router.delete('/:id', async (req, res) => {
  if (await usersService.delete(req.params.id)){
    res.send('OK');
    return;
  }

  res.status(500).send('Failed');
});

module.exports = router;
