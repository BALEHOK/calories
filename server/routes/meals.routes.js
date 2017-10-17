const router = require('express').Router();

const Meal = require('../data/entities/meal');
const caloriesServies = require('../data/calories.service');

router.post('/search/:skip?/:count?', async (req, res) => {
  let {skip, count} = req.params;
  if (typeof skip === 'undefined') {
    skip = 0;
  } else {
    skip = +skip;
  }

  if (typeof count === 'undefined') {
    count = 1000;
  } else {
    count = +count;
  }

  const meals = await caloriesServies.search(req.user.id, skip, count, req.body);

  res.json(meals);
});

router.post('/', async (req, res) => {
  const reqMeal = req.body;
  const meal = new Meal(
    null,
    req.user.id,
    reqMeal.dateTime,
    reqMeal.text,
    reqMeal.calories
  );

  if (await caloriesServies.add(meal)){
    res.send('OK');
    return;
  }

  res.status(500).send('Failed');
});

router.put('/', async (req, res) => {
  const reqMeal = req.body;
  const meal = new Meal(
    reqMeal.id,
    req.user.id,
    reqMeal.dateTime,
    reqMeal.text,
    reqMeal.calories
  );

  if (await caloriesServies.update(meal)){
    res.send('OK');
    return;
  }

  res.status(500).send('Failed');
});

router.delete('/:id', async (req, res) => {
  if (await caloriesServies.delete(req.params.id)){
    res.send('OK');
    return;
  }

  res.status(500).send('Failed');
});

module.exports = router;
