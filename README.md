## Description
NestJS POC - User Service

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# start mongo db
$ docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo:4.4.6

# update Mongo DB URI
inspect the mongo instance ip address and update the Mongo URI of .env file
$ docker ps
$ docker inspect <container_id>

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

To test the APIs manually you can use [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) with my manual test [file](https://github.com/thathsara404/NestJS-UserAPI/blob/master/ManualTest.txt) 

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support
[read more here](https://docs.nestjs.com/support).

