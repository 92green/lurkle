#!/usr/bin/env node
var program = require('commander');
var pkg = require('./package.json');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var util = require('util');
var chalk = require('chalk');
var Table = require('cli-table');
var shellCommand = require('./src/shellCommand');
var commandTable = new Table();
var LURKLE_CONFIG_PATH = path.resolve('lurkle-config.yml');

function loadYaml(path) {
    return yaml.load(fs.readFileSync(path));
}

function fileExists(path) {
    try {
        fs.statSync(path, fs.F_OK);
        return path;
    } catch (e) {
        console.log(chalk.red(path, 'does not exist'));
    }
}

function tableLog(arr) {
    var table = new Table();
    table.push(arr);
    console.log(table.toString());
}

// Generate CLI 
program
    .version(pkg.version)
    .usage('[options] <tasks ...>')
    .option('-l, --lurkles <items>', 'A list of config files to merge', function(val) {return val.split(',')})
    .parse(process.argv);

// Parse cli arguments
var config;
try {
    fs.statSync(LURKLE_CONFIG_PATH, fs.F_OK);
    config = loadYaml(LURKLE_CONFIG_PATH);
} catch (e) {}

var lurkles = program.lurkles || config.lurkles;
var tasks = (program.args.length) ? program.args : config.tasks;
var tasksRun = 0;


// Generate the order of commands
var lurkleCommands = lurkles.map(function(lurklePath, key) {    
    var lurkle = loadYaml(fileExists(path.resolve(lurklePath,'lurkle.yml')));
    commandTable.push([lurklePath].concat(tasks.map(function(ll){ return lurkle[ll] ? chalk.green(ll) : chalk.gray(ll) })));

    return tasks.reduce(function(reduction, taskKey) {
        if (lurkle[taskKey]) {
            tasksRun++;
            reduction[taskKey] = lurkle[taskKey];
            return reduction;
            
        }
        return reduction;
    }, {lurklePath: lurklePath})
});

// Pre info
console.log(commandTable.toString());

// Start spawning the tasks in order
tasks.forEach(function(task) {
    lurkleCommands.forEach(function(cc){
        if(cc[task]) {
            tableLog([chalk.blue(task), chalk.green(cc.lurklePath), cc[task]]);

            var childProcess = shellCommand(cc[task], {
                cwd: path.resolve(cc.lurklePath),
                stdio: 'inherit'
            });          

            if(childProcess.status > 0) {
                process.exit(childProcess.status);
            }
        }
    });
})

process.exit();
