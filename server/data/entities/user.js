class User {
  constructor(
    id,
    password = null,
    name = null,
    email = null,
    role = 0,
    isActivated = false,
    activationId = null,
    accessToken = null,
    isBlocked = false,
    picture = null,
    caloriesPerDay = -1
  ) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.email = email;
    this.role = role;
    this.isActivated = isActivated;
    this.activationId = activationId;
    this.accessToken = accessToken;
    this.isBlocked = isBlocked;
    this.picture = picture;
    this.caloriesPerDay = caloriesPerDay;
  }
}

module.exports = User;
