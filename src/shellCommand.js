var spawnSync = require('child_process').spawnSync;

module.exports = function shellCommand(command, options) {
    return spawnSync('sh', ['-c', command], options);   
} 