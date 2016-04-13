#!/usr/bin/env node
var program = require('commander');
var pkg = require('./package.json');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var util = require('util');
var exec = require('child_process').exec;
var chalk = require('chalk');

var Table = require('cli-table');
var table = new Table();

var LURKLE_CONFIG_PATH = path.resolve('lurkle-config.yml');
 
function list(val) {
  return val.split(',');
}

function logExec(error, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
}

function loadYaml(path) {
    return yaml.load(fs.readFileSync(path));
}

function fileExists(path) {
    try {
        fs.accessSync(path, fs.F_OK);
        return path;
    } catch (e) {
        console.log(chalk.red(path, 'does not exist'));
    }
}
 
program
    .version(pkg.version)
    .usage('[options] <tasks ...>')
    .option('-l, --lurkles <items>', 'A list of config files to merge', list)
    .parse(process.argv);

var config;

try {
    fs.accessSync(LURKLE_CONFIG_PATH, fs.F_OK);
    config = loadYaml(LURKLE_CONFIG_PATH);
} catch (e) {}

var lurkles = program.lurkles || config.lurkles;
var tasks = (program.args.length) ? program.args : config.tasks;

lurkles.map(function(lurklePath, key) {    
    var lurkle = loadYaml(fileExists(path.resolve(lurklePath,'lurkle.yml')));
    table.push([lurklePath].concat(tasks.map(function(ll){ return lurkle[ll] ? chalk.green(ll) : chalk.gray(ll) })));
    return Object.keys(lurkle).forEach(function(taskKey) {
        if (lurkle[taskKey]) {
            exec(lurkle[taskKey], {cwd: path.resolve(lurklePath)}, logExec);
        }
    });
});
console.log(table.toString());
