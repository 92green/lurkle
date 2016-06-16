# Lurkle
Run build scripts lurking in subfolders.

Lurkle is a CLI that lets you run similar commands in multiple sub-folders. It's useful for large single-repo situations. 

## Install 
```bash
npm install -g lurkle
```

## Configuration

Create a `lurkle-config.yml` in the root of your project. This contains a list of the locations to where your lurkles reside. As well as a list of possible tasks that each can run. This doubles as both configuration and documentation. 

```yml
lurkles:
    - src/services/microservice-a
    - src/services/microservice-b
    - node_modules/microservice-c
tasks:
    - dependencies
    - test
    - build
    - package
```

Then create a `lurkle.yml` file in each subfolder. Each lurkle can then provide a command for as many tasks as they need.

```yml
# src/services/microservice-a/lurkle.yml
dependencies: npm install
test: karma start

# src/services/microservice-b/lurkle.yml
test: bash ./scripts/test.sh
package: bash ./scripts/package.sh

# node_modules/microservice-c
test: npm run test
build: npm run build
```

## Run
```sh
lurkle [tasks] [-l optional list of lurkle locations]
```

| Command                                      | Result                                         |
|----------------------------------------------|------------------------------------------------|
|`lurkle`                                      | Run all commands in all lurkles                |
|`lurkle build`                                | run the build command in all lurkles           |
|`lurkle build test`                           | run the build and test command in all lurkles  |
|`lurkle build -l src/services/microservice-b` | run the build command in microservice-b lurkle |



