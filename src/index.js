#!/usr/bin/env node
var program = require('commander');
var pkg = require('../package.json');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var util = require('util');
var chalk = require('chalk');
var Table = require('cli-table');
var shellCommand = require('./shellCommand');
var commandTable = new Table();
var warnings = [];
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

var config;


try {
    fs.statSync(LURKLE_CONFIG_PATH, fs.F_OK);
    config = loadYaml(LURKLE_CONFIG_PATH);
} catch (e) {

}

program
    .version(pkg.version)
    .option('-l, --lurkles <items>', 'A list of config files to merge', function(val) {return val.split(',')})

//
// Add tasks from the config file to the help
Object.keys(config.tasks)
    .map(function(task) {
        program
            .command(task)
            .description(config.tasks[task])
    });

program.parse(process.argv);


var lurkles = config.lurkles;
var tasks = (program.args.length) ? program.args : Object.keys(config.tasks);
var tasksRun = 0;




// Generate the order of commands
var lurkleCommands = lurkles
    // Load lurkle files while ignoring inline definitions
    .map(function(lurkle, key) {
        if(typeof lurkle === 'string') {
            lurkle = loadYaml(fileExists(path.resolve(lurkle,'lurkle.yml')));
        } else {
            lurkle.inline = true;            
        }

        return lurkle; 
    })
    // Check tasks against the main task list 
    // and preset a warning for undocumented tasks
    .map(function(lurkle) {
        Object.keys(lurkle.tasks).forEach(function(task){
            if(Object.keys(config.tasks).indexOf(task) < 0) {
                warnings.push(chalk.yellow(" * Task '" + task + "' from '" + lurkle.name + "' is not documented in lurkle-config.yml"));
            }
        });
        return lurkle;
    })
    // filter out lurkles if -l flag is defined
    .filter(function(lurkle) {
        if(program.lurkles) {
            return program.lurkles.indexOf(lurkle.name) !== -1;            
        }
        return true;
    })
    //create the command table
    .map(function(lurkle) {
        // Add row to info table
        var commandTableRow = [chalk.blue(lurkle.name)].concat(tasks.map(function(ll){
            return lurkle.tasks[ll] ? chalk.green(ll) : chalk.gray(ll) 
        }))
        commandTable.push(commandTableRow);       

        return lurkle;
    });
        
console.log(commandTable.toString());

// Start spawning the tasks in order
tasks.forEach(function(task) {
    lurkleCommands.forEach(function(lurkle){
        if(lurkle.tasks[task]) {
            var tasksToRun = [].concat(lurkle.tasks[task]);
            tableLog([chalk.green(task), chalk.blue(lurkle.name), tasksToRun.join('\n')]);

            tasksToRun.forEach(function(tt) {
                var childProcess = shellCommand(tt, {
                    cwd: (lurkle.inline) ? lurkle.cwd || './' : path.resolve(lurkle.name),
                    stdio: 'inherit'
                });          

                if(childProcess.status > 0) {
                    process.exit(childProcess.status);
                }
            });
            console.log('\r');
            
        }
    });
});

if(warnings.length) {
    console.log(chalk.yellow('Warnings:'));
    console.log(warnings.join('\n'));    
}


console.log('\r');    
process.exit();
