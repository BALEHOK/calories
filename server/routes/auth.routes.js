const router = require('express').Router();
const auth = require('../auth/auth.middleware');

router.get('/token', auth.authenticate);
router.get('/logout', auth.logout);

module.exports = router;
