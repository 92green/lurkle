var {spawn, spawnSync} = require('child_process');

module.exports = function shellCommand(command, options, concurrent) {
    const commmand = concurrent ? spawn : spawnSync;
    var childProcess = commmand('sh', ['-c', command], options);
    return childProcess;
}
