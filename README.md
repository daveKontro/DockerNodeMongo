# DockerNodeMongo
a simple to-do list app, with a node/mongo backend, that demonstrates how to containerized and debug via docker and docker compose

## setup .env file
- add `.env` to `.gitignore` if it is not there already
- create `.env`, add contents
  ```
  NODE_ENV=development
  PORT=3000
  LOG_LEVEL=dev
  MONGODB_URI=mongodb://mongo:27017/docker-node-mongo
  ```
- NOTE: setting valid `MONGODB_URI`
  - the above uri is for running docker compose
  - to "run app directly" or "run container locally" use a valid mongo uri
      - uri can be locally running mongo, mongo atlas, etc.

## run app directly
- set valid `MONGODB_URI` (see NOTE above)
- navigate to app root dir
- install app dependencies (1st time only) `npm install`
- start app `npm start`
  - or `npm run dev` if you want to edit app files
- app running on `http://localhost:3000/`
- stop app `ctl-c`

## build image and run container locally
- set valid `MONGODB_URI` (see NOTE above)
- navigate to app root dir
- build image `docker build -t docker-node-mongo-app .`
- see image `docker images`
- start app in container `docker run -p 80:3000 -d <image id>`
- see container `docker ps`
- start shell in container `docker exec -it <container id> /bin/bash`
- app running on `http://localhost/`
- exit container shell `exit`
- stop container `docker stop <container id>`

## debug container in vscode (v1.59.1)
- leave `MONGODB_URI=mongodb://mongo:27017/docker-node-mongo` in `.env`
- install nodemon globally `npm install -g nodemon`
- install docker extension for vs code
- expose default node.js debugging port 9229 (see docker-compose.yml)
  - DO NOT expose the debugging port in production
  - [node.js debugging guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- add inspection switch to npm script (see docker-compose.yml)
- create vscode launch.json
  - in debugger pane click add configuration, docker: attach to node
    - this generates a launch.json, edit appropriately
      ```
      {
        "version": "0.2.0",
        "configurations": [
          {
            "name": "Docker: Attach to Node",
            "type": "node",
            "request": "attach",
            "restart": true,
            "port": 9229,
            "address": "localhost",
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/var/www/app",
            "protocol": "inspector"
          }
        ]
      }
      ```
- run docker compose `docker-compose up`
- press play in debugger pane
- to stop disconnect debugger then stop docker-compose with `crtl-c`

## docker-compose commands
- run `docker-compose up`
- run in background `docker-compose up -d`
- rebuild and run `docker-compose up --build`
- remove containers and network `docker-compose down`