# Lurkle
Run build scripts lurking in subfolders.

Lurkle is a CLI that lets you run similar commands in multiple sub-folders. It's useful for large single-repo situations. 

## Install 
```bash
npm install --save lurkle # ./node_modules/.bin/lurkle [command]
npm install -g lurkle     # lurkle [command]
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

