var spawnSync = require('child_process').spawnSync;

module.exports = function shellCommand(command, options) {
    var childProcess = spawnSync('sh', ['-c', command], options);   
    return childProcess;
} 