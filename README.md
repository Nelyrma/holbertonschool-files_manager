# Files manager

## Description of the project

This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination and background processing.

The objective is to build a simple platform to upload and view files:

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… (utils folder will be your friend)

Of course, this kind of service already exists in the real life - it’s a learning purpose to assemble each piece and build a full product.

Enjoy!

### Resources

##### Read or watch:

- [Node JS getting started](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [Process API doc](https://node.readthedocs.io/en/latest/api/process/)
- [Express getting started](https://expressjs.com/en/starter/installing.html)
- [Mocha documentation](https://mochajs.org/)
- [Nodemon documentation](https://github.com/remy/nodemon#nodemon)
- [MongoDB](https://github.com/mongodb/node-mongodb-native)
- [Bull](https://github.com/OptimalBits/bull)
- [Image thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis](https://www.npmjs.com/package/redis/v/2.8.0)

### Learning Objectives

At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- how to create an API with Express
- how to authenticate a user
- how to store data in MongoDB
- how to store temporary data in Redis
- how to setup and use a background worker

### Requirements

- Allowed editors: vi, vim, emacs, Visual Studio Code
- All your files will be interpreted/compiled on Ubuntu 20.04 LTS using node (version 20.x.x)
- All your files should end with a new line
- A README.md file, at the root of the folder of the project, is mandatory
- Your code should use the js extension
- Your code will be verified against lint using ESLint

### Provided files

#### `package.json`

```
{
    "name": "files_manager",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "lint": "./node_modules/.bin/eslint",
      "check-lint": "lint [0-9]*.js",
      "start-server": "nodemon --exec babel-node --presets @babel/preset-env ./server.js",
      "start-worker": "nodemon --exec babel-node --presets @babel/preset-env ./worker.js",
      "dev": "nodemon --exec babel-node --presets @babel/preset-env",
      "test": "./node_modules/.bin/mocha --require @babel/register --exit"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "bull": "^3.16.0",
      "chai-http": "^4.3.0",
      "express": "^4.17.1",
      "image-thumbnail": "^1.0.10",
      "mime-types": "^2.1.27",
      "mongodb": "^3.5.9",
      "redis": "^2.8.0",
      "sha1": "^1.1.1",
      "uuid": "^8.2.0"
    },
    "devDependencies": {
      "@babel/cli": "^7.8.0",
      "@babel/core": "^7.8.0",
      "@babel/node": "^7.8.0",
      "@babel/preset-env": "^7.8.2",
      "@babel/register": "^7.8.0",
      "chai": "^4.2.0",
      "chai-http": "^4.3.0",
      "mocha": "^9.0.0",
      "nodemon": "^2.0.2",
      "eslint": "^6.8.0",
      "eslint-config-airbnb-base": "^14.0.0",
      "eslint-plugin-import": "^2.18.2",
      "eslint-plugin-jest": "^22.17.0",
      "request": "^2.88.0",
      "sinon": "^7.5.0"
    }
  }
```

#### `.eslintrc.cjs`

```
module.exports = {
    env: {
      browser: false,
      es6: true,
      jest: true,
    },
    extends: [
      'airbnb-base',
      'plugin:jest/all',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['jest'],
    rules: {
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': [
        'error',
        'LabeledStatement',
        'WithStatement',
      ],
    },
    overrides:[
      {
        files: ['*.js'],
        excludedFiles: 'babel.config.js',
      }
    ]
};
```

#### `babel.config.js`

```
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
};
```
