process.on('unhandledRejection', e => { throw e; })

const app = require('express')();
const bodyParser = require('body-parser');

const cors = require('./auth/cors.middlware');
const routes = require('./routes');
const dbReady = require('./data/db').dbReady;
const usersService = require('./data/users.service');

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use(function (req, res, next) {
  var err = new Error();
  err.message = 'Not found';
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err);
});

dbReady
  .then(() => usersService.initDb())
  .then(() =>
    app.listen(3100, function () {
      console.log('App is running on 3100');
    })
  );
