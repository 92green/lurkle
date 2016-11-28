import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Table from 'cli-table';
import shellCommand from './util/shellCommand';
import {pushWarning} from './util/warning';


function lurkleExists(lurkle) {
    var pathLocation = path.resolve(lurkle, 'lurkle.yml')
    try {
        fs.statSync(pathLocation, fs.F_OK);
        return pathLocation;
    } catch (e) {
        pushWarning(lurkle + '/lurkle.yml' + ' does not exist');
        return false;
    }
}

function tableLog(arr) {
    var table = new Table();
    table.push(arr);
    console.log(table.toString());
}


export default function Run(program, config) {

    var commandTable = new Table();
    var tasks = (program.args.length) ? program.args : Object.keys(config.tasks);
    var tasksRun = 0;

    // Generate the order of commands
    var lurkleCommands = config.lurkles
        // Load lurkle files while ignoring inline definitions
        .map((lurkle, key) => {
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
        .filter(lurkle => lurkle)
        // Check tasks against the main task list
        // and preset a warning for undocumented tasks
        .map(lurkle =>  {
            Object
                .keys(lurkle.tasks)
                .forEach(task => {
                    if(task === 'start') {
                        pushWarning(`Reserved task 'start' found in ${lurkle.name}`);
                    } else if(Object.keys(config.tasks).indexOf(task) < 0) {
                        pushWarning("Task '" + task + "' from '" + lurkle.name + "' is not documented in lurkle-config.yml");
                    }
                });
            return lurkle;
        })
        // filter out lurkles if -l flag is defined
        .filter((lurkle) =>  {
            if(program.lurkles) {
                return program.lurkles.indexOf(lurkle.name) !== -1;
            }
            return true;
        })
        //create the command table
        .map((lurkle) =>  {
            // Add row to info table
            var commandTableRow = [chalk.blue(lurkle.name)].concat(tasks.map((ll) => {
                return lurkle.tasks[ll] ? chalk.green(ll) : chalk.gray(ll)
            }));
            commandTable.push(commandTableRow);

            return lurkle;
        });

    console.log(commandTable.toString());

    // Start spawning the tasks in order
    tasks.forEach((task) =>  {
        lurkleCommands.forEach((lurkle) => {
            if(lurkle.tasks[task]) {
                var tasksToRun = [].concat(lurkle.tasks[task]);
                tableLog([
                    chalk.green(task) + '\n' +  chalk.grey(config.tasks[task]),
                    chalk.blue(lurkle.name) + '\n' + chalk.grey(lurkle.cwd),
                    tasksToRun.join('\n')
                ]);


                tasksToRun.forEach((tt) =>  {
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

}
