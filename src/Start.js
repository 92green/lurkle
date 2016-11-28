import pm2 from 'pm2';
import chalk from 'chalk';
import {pushWarning, printWarning} from './util/warning';

export default function Start({args}, {services}) {
    if(!services) {
        console.log(chalk.red('Error:'), 'No services found in lurkle-config');
        process.exit(1);
    }
    var ecosystem = Object.keys(services)
        .filter(ii => ii !== 'env')
        .filter(ii => {
            if(args.length > 1) {
                return args.slice(1, args.length).indexOf(ii) > -1
            }
            return true;
        })
        .map(ii => {
            var site = services[ii];
            return {
                name: ii,
                ...site,
                env: Object.assign({}, services.env, site.env)
            };
        });

    pm2.connect(true, (err) => {
        if (err) {
            console.error(chalk.red(err));
            process.exit(2);
        }
        pm2.start(ecosystem, function(err, apps) {
            if (err) {
                console.error(chalk.red(err));
                process.exit(2);
            }
            pm2.streamLogs('all', 0, false, 'HH:mm:ss', false);
        });
    });
}
