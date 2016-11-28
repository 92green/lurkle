import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Table from 'cli-table';
import shellCommand from './util/shellCommand';

function addWarning(message) {
    warnings.push(chalk.yellow(' * ', message))
}

function lurkleExists(lurkle) {
    var pathLocation = path.resolve(lurkle, 'lurkle.yml')
    try {
        fs.statSync(pathLocation, fs.F_OK);
        return pathLocation;
    } catch (e) {
        addWarning(lurkle + '/lurkle.yml' + ' does not exist');
        return false;
    }
}

function tableLog(arr) {
    var table = new Table();
    table.push(arr);
    console.log(table.toString());
}


export default function Run(program, config) {
    
    var warnings = [];
    var commandTable = new Table();
    var tasks = (program.args.length) ? program.args : Object.keys(config.tasks);
    var tasksRun = 0;

    // Generate the order of commands
    var lurkleCommands = config.lurkles
        // Load lurkle files while ignoring inline definitions
        .map(function(lurkle, key) {
            if(typeof lurkle === 'string') {
                var cwd = lurkle;
                if(lurkleExists(lurkle)) {
                    lurkle = loadYaml(lurkleExists(lurkle));                
                    lurkle.cwd = cwd;            
                } else {
                    return null;
                }
            } else {
                lurkle.inline = true;            
            }

            return lurkle; 
        })
        .filter(function(lurkle) {
            return lurkle;
        })
        // Check tasks against the main task list 
        // and preset a warning for undocumented tasks
        .map(function(lurkle) {
            Object.keys(lurkle.tasks).forEach(function(task){
                if(Object.keys(config.tasks).indexOf(task) < 0) {
                    addWarning("Task '" + task + "' from '" + lurkle.name + "' is not documented in lurkle-config.yml");
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
                tableLog([
                    chalk.green(task) + '\n' +  chalk.grey(config.tasks[task]), 
                    chalk.blue(lurkle.name) + '\n' + chalk.grey(lurkle.cwd), 
                    tasksToRun.join('\n')
                ]);  

                
                tasksToRun.forEach(function(tt) {
                    if(!program.dry) {
                        console.log('Running', chalk.cyan(tt), 'in', chalk.cyan(lurkle.cwd || './'))
                        var childProcess = shellCommand(tt, {
                            cwd: lurkle.cwd || './',
                            stdio: 'inherit'
                        });          

                        if(childProcess.status > 0) {
                            process.exit(childProcess.status);
                        }                    
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
}