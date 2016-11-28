'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Run;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _shellCommand = require('./util/shellCommand');

var _shellCommand2 = _interopRequireDefault(_shellCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addWarning(message) {
    warnings.push(_chalk2.default.yellow(' * ', message));
}

function lurkleExists(lurkle) {
    var pathLocation = _path2.default.resolve(lurkle, 'lurkle.yml');
    try {
        _fs2.default.statSync(pathLocation, _fs2.default.F_OK);
        return pathLocation;
    } catch (e) {
        addWarning(lurkle + '/lurkle.yml' + ' does not exist');
        return false;
    }
}

function tableLog(arr) {
    var table = new _cliTable2.default();
    table.push(arr);
    console.log(table.toString());
}

function Run(program, config) {

    var warnings = [];
    var commandTable = new _cliTable2.default();
    var tasks = program.args.length ? program.args : Object.keys(config.tasks);
    var tasksRun = 0;

    // Generate the order of commands
    var lurkleCommands = config.lurkles
    // Load lurkle files while ignoring inline definitions
    .map(function (lurkle, key) {
        if (typeof lurkle === 'string') {
            var cwd = lurkle;
            if (lurkleExists(lurkle)) {
                lurkle = loadYaml(lurkleExists(lurkle));
                lurkle.cwd = cwd;
            } else {
                return null;
            }
        } else {
            lurkle.inline = true;
        }

        return lurkle;
    }).filter(function (lurkle) {
        return lurkle;
    })
    // Check tasks against the main task list 
    // and preset a warning for undocumented tasks
    .map(function (lurkle) {
        Object.keys(lurkle.tasks).forEach(function (task) {
            if (Object.keys(config.tasks).indexOf(task) < 0) {
                addWarning("Task '" + task + "' from '" + lurkle.name + "' is not documented in lurkle-config.yml");
            }
        });
        return lurkle;
    })
    // filter out lurkles if -l flag is defined
    .filter(function (lurkle) {
        if (program.lurkles) {
            return program.lurkles.indexOf(lurkle.name) !== -1;
        }
        return true;
    })
    //create the command table
    .map(function (lurkle) {
        // Add row to info table
        var commandTableRow = [_chalk2.default.blue(lurkle.name)].concat(tasks.map(function (ll) {
            return lurkle.tasks[ll] ? _chalk2.default.green(ll) : _chalk2.default.gray(ll);
        }));
        commandTable.push(commandTableRow);

        return lurkle;
    });

    console.log(commandTable.toString());

    // Start spawning the tasks in order
    tasks.forEach(function (task) {
        lurkleCommands.forEach(function (lurkle) {
            if (lurkle.tasks[task]) {
                var tasksToRun = [].concat(lurkle.tasks[task]);
                tableLog([_chalk2.default.green(task) + '\n' + _chalk2.default.grey(config.tasks[task]), _chalk2.default.blue(lurkle.name) + '\n' + _chalk2.default.grey(lurkle.cwd), tasksToRun.join('\n')]);

                tasksToRun.forEach(function (tt) {
                    if (!program.dry) {
                        console.log('Running', _chalk2.default.cyan(tt), 'in', _chalk2.default.cyan(lurkle.cwd || './'));
                        var childProcess = (0, _shellCommand2.default)(tt, {
                            cwd: lurkle.cwd || './',
                            stdio: 'inherit'
                        });

                        if (childProcess.status > 0) {
                            process.exit(childProcess.status);
                        }
                    }
                });
                console.log('\r');
            }
        });
    });

    if (warnings.length) {
        console.log(_chalk2.default.yellow('Warnings:'));
        console.log(warnings.join('\n'));
    }

    console.log('\r');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdW4uanMiXSwibmFtZXMiOlsiUnVuIiwiYWRkV2FybmluZyIsIm1lc3NhZ2UiLCJ3YXJuaW5ncyIsInB1c2giLCJ5ZWxsb3ciLCJsdXJrbGVFeGlzdHMiLCJsdXJrbGUiLCJwYXRoTG9jYXRpb24iLCJyZXNvbHZlIiwic3RhdFN5bmMiLCJGX09LIiwiZSIsInRhYmxlTG9nIiwiYXJyIiwidGFibGUiLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJwcm9ncmFtIiwiY29uZmlnIiwiY29tbWFuZFRhYmxlIiwidGFza3MiLCJhcmdzIiwibGVuZ3RoIiwiT2JqZWN0Iiwia2V5cyIsInRhc2tzUnVuIiwibHVya2xlQ29tbWFuZHMiLCJsdXJrbGVzIiwibWFwIiwia2V5IiwiY3dkIiwibG9hZFlhbWwiLCJpbmxpbmUiLCJmaWx0ZXIiLCJmb3JFYWNoIiwidGFzayIsImluZGV4T2YiLCJuYW1lIiwiY29tbWFuZFRhYmxlUm93IiwiYmx1ZSIsImNvbmNhdCIsImxsIiwiZ3JlZW4iLCJncmF5IiwidGFza3NUb1J1biIsImdyZXkiLCJqb2luIiwidHQiLCJkcnkiLCJjeWFuIiwiY2hpbGRQcm9jZXNzIiwic3RkaW8iLCJzdGF0dXMiLCJwcm9jZXNzIiwiZXhpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBNEJ3QkEsRzs7QUE1QnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNDLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCO0FBQ3pCQyxhQUFTQyxJQUFULENBQWMsZ0JBQU1DLE1BQU4sQ0FBYSxLQUFiLEVBQW9CSCxPQUFwQixDQUFkO0FBQ0g7O0FBRUQsU0FBU0ksWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDMUIsUUFBSUMsZUFBZSxlQUFLQyxPQUFMLENBQWFGLE1BQWIsRUFBcUIsWUFBckIsQ0FBbkI7QUFDQSxRQUFJO0FBQ0EscUJBQUdHLFFBQUgsQ0FBWUYsWUFBWixFQUEwQixhQUFHRyxJQUE3QjtBQUNB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SixpQkFaRDtBQWFBdEMsd0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBRUg7QUFDSixTQTFCRDtBQTJCSCxLQTVCRDs7QUE4QkEsUUFBR2QsU0FBU3FCLE1BQVosRUFBb0I7QUFDaEJSLGdCQUFRQyxHQUFSLENBQVksZ0JBQU1aLE1BQU4sQ0FBYSxXQUFiLENBQVo7QUFDQVcsZ0JBQVFDLEdBQVIsQ0FBWWQsU0FBUzZDLElBQVQsQ0FBYyxJQUFkLENBQVo7QUFDSDs7QUFHRGhDLFlBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0giLCJmaWxlIjoiUnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBUYWJsZSBmcm9tICdjbGktdGFibGUnO1xuaW1wb3J0IHNoZWxsQ29tbWFuZCBmcm9tICcuL3V0aWwvc2hlbGxDb21tYW5kJztcblxuZnVuY3Rpb24gYWRkV2FybmluZyhtZXNzYWdlKSB7XG4gICAgd2FybmluZ3MucHVzaChjaGFsay55ZWxsb3coJyAqICcsIG1lc3NhZ2UpKVxufVxuXG5mdW5jdGlvbiBsdXJrbGVFeGlzdHMobHVya2xlKSB7XG4gICAgdmFyIHBhdGhMb2NhdGlvbiA9IHBhdGgucmVzb2x2ZShsdXJrbGUsICdsdXJrbGUueW1sJylcbiAgICB0cnkge1xuICAgICAgICBmcy5zdGF0U3luYyhwYXRoTG9jYXRpb24sIGZzLkZfT0spO1xuICAgICAgICByZXR1cm4gcGF0aExvY2F0aW9uO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgYWRkV2FybmluZyhsdXJrbGUgKyAnL2x1cmtsZS55bWwnICsgJyBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0YWJsZUxvZyhhcnIpIHtcbiAgICB2YXIgdGFibGUgPSBuZXcgVGFibGUoKTtcbiAgICB0YWJsZS5wdXNoKGFycik7XG4gICAgY29uc29sZS5sb2codGFibGUudG9TdHJpbmcoKSk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUnVuKHByb2dyYW0sIGNvbmZpZykge1xuICAgIFxuICAgIHZhciB3YXJuaW5ncyA9IFtdO1xuICAgIHZhciBjb21tYW5kVGFibGUgPSBuZXcgVGFibGUoKTtcbiAgICB2YXIgdGFza3MgPSAocHJvZ3JhbS5hcmdzLmxlbmd0aCkgPyBwcm9ncmFtLmFyZ3MgOiBPYmplY3Qua2V5cyhjb25maWcudGFza3MpO1xuICAgIHZhciB0YXNrc1J1biA9IDA7XG5cbiAgICAvLyBHZW5lcmF0ZSB0aGUgb3JkZXIgb2YgY29tbWFuZHNcbiAgICB2YXIgbHVya2xlQ29tbWFuZHMgPSBjb25maWcubHVya2xlc1xuICAgICAgICAvLyBMb2FkIGx1cmtsZSBmaWxlcyB3aGlsZSBpZ25vcmluZyBpbmxpbmUgZGVmaW5pdGlvbnNcbiAgICAgICAgLm1hcChmdW5jdGlvbihsdXJrbGUsIGtleSkge1xuICAgICAgICAgICAgaWYodHlwZW9mIGx1cmtsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3dkID0gbHVya2xlO1xuICAgICAgICAgICAgICAgIGlmKGx1cmtsZUV4aXN0cyhsdXJrbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGx1cmtsZSA9IGxvYWRZYW1sKGx1cmtsZUV4aXN0cyhsdXJrbGUpKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGx1cmtsZS5jd2QgPSBjd2Q7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsdXJrbGUuaW5saW5lID0gdHJ1ZTsgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGx1cmtsZTsgXG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24obHVya2xlKSB7XG4gICAgICAgICAgICByZXR1cm4gbHVya2xlO1xuICAgICAgICB9KVxuICAgICAgICAvLyBDaGVjayB0YXNrcyBhZ2FpbnN0IHRoZSBtYWluIHRhc2sgbGlzdCBcbiAgICAgICAgLy8gYW5kIHByZXNldCBhIHdhcm5pbmcgZm9yIHVuZG9jdW1lbnRlZCB0YXNrc1xuICAgICAgICAubWFwKGZ1bmN0aW9uKGx1cmtsZSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobHVya2xlLnRhc2tzKS5mb3JFYWNoKGZ1bmN0aW9uKHRhc2spe1xuICAgICAgICAgICAgICAgIGlmKE9iamVjdC5rZXlzKGNvbmZpZy50YXNrcykuaW5kZXhPZih0YXNrKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkV2FybmluZyhcIlRhc2sgJ1wiICsgdGFzayArIFwiJyBmcm9tICdcIiArIGx1cmtsZS5uYW1lICsgXCInIGlzIG5vdCBkb2N1bWVudGVkIGluIGx1cmtsZS1jb25maWcueW1sXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGx1cmtsZTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gZmlsdGVyIG91dCBsdXJrbGVzIGlmIC1sIGZsYWcgaXMgZGVmaW5lZFxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGx1cmtsZSkge1xuICAgICAgICAgICAgaWYocHJvZ3JhbS5sdXJrbGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2dyYW0ubHVya2xlcy5pbmRleE9mKGx1cmtsZS5uYW1lKSAhPT0gLTE7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLy9jcmVhdGUgdGhlIGNvbW1hbmQgdGFibGVcbiAgICAgICAgLm1hcChmdW5jdGlvbihsdXJrbGUpIHtcbiAgICAgICAgICAgIC8vIEFkZCByb3cgdG8gaW5mbyB0YWJsZVxuICAgICAgICAgICAgdmFyIGNvbW1hbmRUYWJsZVJvdyA9IFtjaGFsay5ibHVlKGx1cmtsZS5uYW1lKV0uY29uY2F0KHRhc2tzLm1hcChmdW5jdGlvbihsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGx1cmtsZS50YXNrc1tsbF0gPyBjaGFsay5ncmVlbihsbCkgOiBjaGFsay5ncmF5KGxsKSBcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgY29tbWFuZFRhYmxlLnB1c2goY29tbWFuZFRhYmxlUm93KTsgICAgICAgXG5cbiAgICAgICAgICAgIHJldHVybiBsdXJrbGU7XG4gICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgY29uc29sZS5sb2coY29tbWFuZFRhYmxlLnRvU3RyaW5nKCkpO1xuXG4gICAgLy8gU3RhcnQgc3Bhd25pbmcgdGhlIHRhc2tzIGluIG9yZGVyXG4gICAgdGFza3MuZm9yRWFjaChmdW5jdGlvbih0YXNrKSB7XG4gICAgICAgIGx1cmtsZUNvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24obHVya2xlKXtcbiAgICAgICAgICAgIGlmKGx1cmtsZS50YXNrc1t0YXNrXSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXNrc1RvUnVuID0gW10uY29uY2F0KGx1cmtsZS50YXNrc1t0YXNrXSk7XG4gICAgICAgICAgICAgICAgdGFibGVMb2coW1xuICAgICAgICAgICAgICAgICAgICBjaGFsay5ncmVlbih0YXNrKSArICdcXG4nICsgIGNoYWxrLmdyZXkoY29uZmlnLnRhc2tzW3Rhc2tdKSwgXG4gICAgICAgICAgICAgICAgICAgIGNoYWxrLmJsdWUobHVya2xlLm5hbWUpICsgJ1xcbicgKyBjaGFsay5ncmV5KGx1cmtsZS5jd2QpLCBcbiAgICAgICAgICAgICAgICAgICAgdGFza3NUb1J1bi5qb2luKCdcXG4nKVxuICAgICAgICAgICAgICAgIF0pOyAgXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0YXNrc1RvUnVuLmZvckVhY2goZnVuY3Rpb24odHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXByb2dyYW0uZHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUnVubmluZycsIGNoYWxrLmN5YW4odHQpLCAnaW4nLCBjaGFsay5jeWFuKGx1cmtsZS5jd2QgfHwgJy4vJykpXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQcm9jZXNzID0gc2hlbGxDb21tYW5kKHR0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3dkOiBsdXJrbGUuY3dkIHx8ICcuLycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RkaW86ICdpbmhlcml0J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZFByb2Nlc3Muc3RhdHVzID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdChjaGlsZFByb2Nlc3Muc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1xccicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmKHdhcm5pbmdzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFsay55ZWxsb3coJ1dhcm5pbmdzOicpKTtcbiAgICAgICAgY29uc29sZS5sb2cod2FybmluZ3Muam9pbignXFxuJykpOyAgICBcbiAgICB9XG5cblxuICAgIGNvbnNvbGUubG9nKCdcXHInKTsgICAgXG59Il19