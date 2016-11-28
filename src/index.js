#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import pkg from '../package.json';
import program from 'commander';

import loadYaml from './util/loadYaml';
import Start from './Start';
import Run from './Run';

var LURKLE_CONFIG_PATH = path.resolve('lurkle-config.yml');
var config;

try {
    fs.statSync(LURKLE_CONFIG_PATH, fs.F_OK);
    config = loadYaml(LURKLE_CONFIG_PATH);
} catch (e) {
    console.log(e);
    console.log(chalk.red(e.name  + ':'));
    console.log(chalk.red(e.reason));
    process.exit(1);
}

program
    .version(pkg.version)
    .option('-l, --lurkles <items>', 'A list of config files to merge', function(val) {return val.split(',')})
    .option('-d, --dry', 'show commands without running them');

// Add tasks from the config file to the help
Object
    .keys(config.tasks)
    .map(task => {
        program
            .command(task)
            .description(config.tasks[task])
    });

program.parse(process.argv);
 
switch (program.args[0]) {
    case 'start':
        Start(program, config);
        break;

    default: 
        Run(program, config);
        process.exit();
        break;
}

