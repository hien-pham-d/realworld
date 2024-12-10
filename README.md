# ![RealWorld Example App](logo.png)

> ### Codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://demo.realworld.io/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


## How it works

### Installation

#### Install package dependencies
```bash
$ yarn install
```


#### Prepare the `.env` file

Copying the content from the `.env.example`.

```shell
cp .env.example .env
```

#### Setup the database

```shell
# note: use it in development environments only
yarn prisma migrate reset

```

### Run

```shell

###### development

yarn start

###### watch mode

yarn start:dev

###### production mode

yarn start:prod

```

### Debug

Run the application with debug-enabled option.
```shell
yarn start:debug
```

Use a debuger client (e.g. VS Code, Chrome DevTools, ...) to `Attach` to the debugging session.

### Test

```shell

###### unit tests
# no test for now
yarn test

###### e2e tests

# no test for now
yarn test:e2e

###### test coverage

# no test for now
yarn test:cov
```
