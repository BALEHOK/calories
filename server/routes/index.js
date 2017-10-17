const router = require('express').Router();

const authorize = require('../auth/auth.middleware').authorize;
const roles = require('../auth/roles');

const authRoutes = require('./auth.routes');
router.use('/auth', authRoutes);

const profileRoutes = require('./profile.routes');
router.use('/profile', profileRoutes);

const mealsRoutes = require('./meals.routes');
router.use('/meals', authorize(roles.any), mealsRoutes);

const usersRoutes = require('./users.routes');
router.use('/users', authorize(roles.manager | roles.admin), usersRoutes);

module.exports = router;
