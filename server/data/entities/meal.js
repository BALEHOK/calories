class Meal {
  constructor(
    id,
    userId,
    dateTime,
    text,
    calories,
  ) {
    this.id = id;
    this.userId = userId;
    if (typeof dateTime === 'string') {
      dateTime = new Date(dateTime);
    }
    this.dateTime = dateTime;
    this.text = text;
    this.calories = calories;
  }
}

module.exports = Meal;
