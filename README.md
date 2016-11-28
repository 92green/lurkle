# Lurkle
Run build scripts lurking in subfolders.

Lurkle is a CLI that lets you run similar commands in multiple sub-folders. It's useful for large single-repo situations. 

## Install 
```bash
npm install -g lurkle
```

## Tasks

Create a `lurkle-config.yml` in the root of your project. This contains a list of the locations to where your lurkles reside as well as a list of possible tasks that each can run. This doubles as both configuration and documentation. 

```yml
lurkles:
  - ./app-a
  - ./app-b
  
  - name: lurkle-1
    cwd: './app-a'
    tasks:
      test: echo "embedded test from $(pwd)"

  - name: lurkle-2
    cwd: './app-b'
    tasks:
      test: echo "embedded test from $(pwd)"
  
tasks:
  test: run the test suites
  build: build the application

```

Then create a `lurkle.yml` file in each subfolder. Each lurkle can then provide a command for as many tasks as they need.

```yml
# example/app-a/lurkle.yml
name: app-a
tasks:
  test: echo 'test from app-a'
  build: 
    - echo 'build from app-a'
    - echo 'build2 from app-a'
  thing: echo 'build from app-a'

# example/app-b/lurkle.yml
name: app-b
tasks:
  test: echo 'test from app-b'
  build: echo 'build from app-b'
  other: echo 'build from app-b'

```

## Run Tasks
```sh
lurkle [tasks] [-l optional list of lurkle locations]
```

| Command                                      | Result                                         |
|----------------------------------------------|------------------------------------------------|
|`lurkle`                                      | Run all commands in all lurkles                |
|`lurkle build`                                | run the build command in all lurkles           |
|`lurkle build test`                           | run the build and test command in all lurkles  |
|`lurkle build -l src/services/microservice-b` | run the build command in microservice-b lurkle |

## Lurkle Sites
```sh
lurkle start [sites]
```

Lurkle can be used as an interface to start a set of pm2 instances

```yml
sites:
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

| Command                     | Result                 |
|-----------------------------|------------------------|
|`lurkle start`               | Start all sites        |
|`lurkle start client`        | Start only the client  |



