#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import pkg from '../package.json';
import program from 'commander';

import loadYaml from './util/loadYaml';
import Start from './Start';
import Run from './Run';
import {pushWarning, printWarning} from './util/warning';

var LURKLE_CONFIG_PATH = path.resolve('lurkle-config.yml');
var config;


try {
    fs.statSync(LURKLE_CONFIG_PATH, fs.F_OK);
    config = loadYaml(LURKLE_CONFIG_PATH);
} catch (e) {
    console.log(chalk.red(e.name  + ':'));
    console.log(chalk.red(e.reason));
    process.exit(1);
}

program
    .version(pkg.version)
    .option('-l, --lurkles <items>', 'A list of config files to merge', val => val.split(','))
    .option('-d, --dry', 'show commands without running them')
    .option('-c, --concurrent', 'run commands concurrently')

program
    .command('start')
    .description('run the sites from lurkle-config.yml')

//
// Filter tasks
config.tasks = Object
    .keys(config.tasks)
    .filter(ii => {
        if(ii === 'start') {
            pushWarning(`Reserved task 'start' found in tasks`);
            return false;
        }
        return true;
    })
    // Add tasks from the config file to the help
    .map(task => {
        program
            .command(task)
            .description(config.tasks[task])

        return task;
    })
    // reconstruct the object
    .reduce((rr, ii) => {
        return {
            ...rr,
            [ii]: config.tasks[ii]
        }
    }, {})

program.parse(process.argv);

switch (program.args[0]) {
    case 'start':
        Start(program, config);
        break;

    default:
        Run(program, config);
        printWarning();
        break;
}



