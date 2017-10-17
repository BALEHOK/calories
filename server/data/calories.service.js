const uuidv4 = require('uuid/v4');
const { db } = require('./db');
const Meal = require('./entities/meal');

/* search
db.getCollection('time').aggregate([
    { $project : {
          year : { "$year": "$date" },
          month : { "$month": "$date" },
          day: { "$dayOfMonth": "$date" },
          hour: { "$hour": "$date" },
          minute: { "$minute": "$date" },
          text: 1
    }},
    { $match: {
        day: { $gte: 2, $lt: 3}
    }}
])
*/

function getMealsDateTimeFilter(filter) {
  const { dateFrom, dateTo, timeFrom, timeTo } = filter;
  if (!dateFrom && !dateTo && !timeFrom && !timeTo) {
    return [];
  }

  let addFields = {};
  let match = {};
  let project = {};

  if (dateFrom || dateTo) {
    addFields.date = { $dateToString: { format: "%Y%m%d", date: "$dateTime" } };

    match.date = {};
    if (dateFrom) {
      match.date.$gte = getDateToCompare(dateFrom);
    }
    if (dateTo) {
      match.date.$lte = getDateToCompare(dateTo);
    }

    project.date = 0;
  }

  if (timeFrom || timeTo) {
    addFields.time = { $dateToString: { format: "%H%M", date: "$dateTime" } };

    match.time = {};
    if (timeFrom) {
      match.time.$gte = getTimeToCompare(timeFrom);
    }
    if (timeTo) {
      match.time.$lte = getTimeToCompare(timeTo);
    }

    project.time = 0;
  }

  return [{ $addFields: addFields }, { $match: match }, { $project: project }];

  function getDateToCompare(dateTimeString) {
    return dateTimeString.substr(0, 10).replace(/-/g, '');
  }

  function getTimeToCompare(dateTimeString) {
    return dateTimeString.substr(11, 5).replace(':', '');
  }
}

class CaloriesService {
  async get(id) {
    return await db.calories.findOne({ id });
  }
  async search(userId, skip, count, filter) {
    const aggregationPipeline = getMealsDateTimeFilter(filter);
    aggregationPipeline.unshift({
      $match: {
        userId: userId
      }
    });

    return await db.calories
      .aggregate(aggregationPipeline)
      .skip(skip)
      .limit(count)
      .toArray();
  }

  async add(meal) {
    meal.id = uuidv4();
    const result = await db.calories.insertOne(meal);
    return result.insertedCount === 1;
  }

  async update(meal) {
    const result = await db.calories.updateOne({ id: meal.id }, { $set: meal });
    return result.modifiedCount === 1;
  }

  async delete(id) {
    const result = await db.calories.deleteOne({ id });
    return result.deletedCount === 1;
  }
}

module.exports = new CaloriesService();
