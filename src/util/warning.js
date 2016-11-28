import pm2 from 'pm2';
import chalk from 'chalk';

var warnings = [];

export function pushWarning(warning) {
    warnings.push(chalk.yellow(' * ', warning));
}

export function printWarning() {
    if(warnings.length) {
        console.log(chalk.yellow('Warnings:'));
        console.log(warnings.join('\n'));
    }
}
