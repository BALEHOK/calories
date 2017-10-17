## The Calories tracking app.

Client app listens to http://localhost:3000

Server app listens to http://localhost:3100

The server app expects MongoDb available at localhost:27017

The fastest way to preview the product is to deploy as Docker containers. To do so run `docker-compose up` at the root of the repository.

3 users are created in the new DB:
- admin@calories.com / 1234
- manager@calories.com / 1234
- user@calories.com / 1234
