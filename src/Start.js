import pm2 from 'pm2';
import chalk from 'chalk';

export default function Start({args}, {sites}) {

	var ecosystem = Object.keys(sites)
    	.filter(ii => ii !== 'env')
    	.filter(ii => {
    		if(args.length > 1) {
				return args.slice(1, args.length).indexOf(ii) > -1
    		} 
    		return true;
    	})
    	.map(ii => {
    		var site = sites[ii];
    		return {
    			name: ii,
    			...site,
    			env: Object.assign({}, sites.env, site.env)
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