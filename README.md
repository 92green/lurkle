# Lurkle
Lurkle is a CLI for managing the development environment of micro-services. It coordinates running scripts and starting services across multiple directories.

* [Install](#install)
* [Tasks](#tasks)
    * [Configuring Tasks](#configuring-tasks)
    * [Running Tasks](#running-tasks)
* [Services](#services)
    * [Configuring Services](#configuring-services)
    * [Starting Services](#starting-services)


## Install 
```sh
npm install -g lurkle
yarn global add lurkle
```


## Tasks

The lurkle CLI can be used to coordinate the running of tasks in multiple directories. `Lurkles` are groups of tasks that lurk in sub-folders. You can configure them either directly in a `lurkle-config.yml` file from your project root or you can create `lurkle.yml` files that are imported into your config.


### Configuring Tasks

Create a `lurkle-config.yml` a root folder above your services. This contains a list of the locations to where your lurkles reside as well as a list of possible tasks that each can run. This doubles as both configuration and documentation. 

```yaml
lurkles:
  - ./app-a
  - ./app-b
  
  - name: app-c
    cwd: './app-c'
    tasks:
      test: echo "running test from $(pwd)"

  - name: app-d
    cwd: './app-d'
    tasks:
      test: echo "running test from $(pwd)"
  
tasks:
  test: run the test suites
  build: build the application

```

Then create a `lurkle.yml` file in each sub-folder. Each lurkle can then provide a command for as many tasks as they need.

```yaml
# example/app-a/lurkle.yml
name: app-a
tasks:
  test: echo 'test from app-a'

# example/app-b/lurkle.yml
name: app-b
tasks:
  test: echo 'test from app-b'
  build: echo 'build from app-b'

```

## Running Tasks

We can now run our commands from the `example` folder.

Running `lurkle --help` will list each command.

```sh
lurkle [tasks] [-l optional list of lurkle locations]
```

| Command                                       | Result                                          |
|-----------------------------------------------|-------------------------------------------------|
|`lurkle`                                       | Run all commands in all lurkles                 |
|`lurkle build`                                 | run the build command in all lurkles            |
|`lurkle build test`                            | run the build and test command in all lurkles   |
|`lurkle build -l src/services/micro-service-b` | run the build command in micro-service-b lurkle |

## Services
Lurkle provides a `start` command that serves as a wrapper around [pm2]. This allows you to coordinate ENV vars and choose which services you would like to start.

### Configuring Services
Each key on `sites` creates a new service to start. The value object is passed directly to [pm2] so any [valid pm2 attribute] is allowed.
To minimise re-declaring environment variables the root `env` object will be used as defaults for each service.

```yaml
services:
  env:
    CLIENT_HOST: 'localhost'
    CLIENT_PORT: 3000
    SERVER_HOST: 'localhost'
    SERVER_PORT: 3001

  server:
    env:
      SERVER_ONLY_ENV: 12345
    cwd: server
    script: 'index.js'

  client:
  server:
    cwd: client
    script: 'index.js'
```


### Starting Services
```sh
lurkle start [sites]
```

| Command                     | Result                       |
|-----------------------------|------------------------------|
|`lurkle start`               | Start all sites              |
|`lurkle start client`        | Start only the client        |
|`lurkle start client server` | Start the client and server  |


[valid pm2 atrribute]: http://pm2.keymetrics.io/docs/usage/application-declaration/#attributes-available
[pm2]: http://pm2.keymetrics.io/
