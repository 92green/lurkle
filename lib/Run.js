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

var _warning = require('./util/warning');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lurkleExists(lurkle) {
    var pathLocation = _path2.default.resolve(lurkle, 'lurkle.yml');
    try {
        _fs2.default.statSync(pathLocation, _fs2.default.F_OK);
        return pathLocation;
    } catch (e) {
        (0, _warning.pushWarning)(lurkle + '/lurkle.yml' + ' does not exist');
        return false;
    }
}

function tableLog(arr) {
    var table = new _cliTable2.default();
    table.push(arr);
    console.log(table.toString());
}

function Run(program, config) {

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
            if (task === 'start') {
                (0, _warning.pushWarning)('Reserved task \'start\' found in ' + lurkle.name);
            } else if (Object.keys(config.tasks).indexOf(task) < 0) {
                (0, _warning.pushWarning)("Task '" + task + "' from '" + lurkle.name + "' is not documented in lurkle-config.yml");
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SdW4uanMiXSwibmFtZXMiOlsiUnVuIiwibHVya2xlRXhpc3RzIiwibHVya2xlIiwicGF0aExvY2F0aW9uIiwicmVzb2x2ZSIsInN0YXRTeW5jIiwiRl9PSyIsImUiLCJ0YWJsZUxvZyIsImFyciIsInRhYmxlIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJ0b1N0cmluZyIsInByb2dyYW0iLCJjb25maWciLCJjb21tYW5kVGFibGUiLCJ0YXNrcyIsImFyZ3MiLCJsZW5ndGgiLCJPYmplY3QiLCJrZXlzIiwidGFza3NSdW4iLCJsdXJrbGVDb21tYW5kcyIsImx1cmtsZXMiLCJtYXAiLCJrZXkiLCJjd2QiLCJsb2FkWWFtbCIsImlubGluZSIsImZpbHRlciIsImZvckVhY2giLCJ0YXNrIiwibmFtZSIsImluZGV4T2YiLCJjb21tYW5kVGFibGVSb3ciLCJibHVlIiwiY29uY2F0IiwibGwiLCJncmVlbiIsImdyYXkiLCJ0YXNrc1RvUnVuIiwiZ3JleSIsImpvaW4iLCJ0dCIsImRyeSIsImN5YW4iLCJjaGlsZFByb2Nlc3MiLCJzdGRpbyIsInN0YXR1cyIsInByb2Nlc3MiLCJleGl0Il0sIm1hcHBpbmdzIjoiOzs7OztrQkEwQndCQSxHOztBQTFCeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0EsU0FBU0MsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDMUIsUUFBSUMsZUFBZSxlQUFLQyxPQUFMLENBQWFGLE1BQWIsRUFBcUIsWUFBckIsQ0FBbkI7QUFDQSxRQUFJO0FBQ0EscUJBQUdHLFFBQUgsQ0FBWUYsWUFBWixFQUEwQixhQUFHRyxJQUE3QjtBQUNBLGVBQU9ILFlBQVA7QUFDSCxLQUhELENBR0UsT0FBT0ksQ0FBUCxFQUFVO0FBQ1Isa0NBQVlMLFNBQVMsYUFBVCxHQUF5QixpQkFBckM7QUFDQSxlQUFPLEtBQVA7QUFDSDtBQUNKOztBQUVELFNBQVNNLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCO0FBQ25CLFFBQUlDLFFBQVEsd0JBQVo7QUFDQUEsVUFBTUMsSUFBTixDQUFXRixHQUFYO0FBQ0FHLFlBQVFDLEdBQVIsQ0FBWUgsTUFBTUksUUFBTixFQUFaO0FBQ0g7O0FBR2MsU0FBU2QsR0FBVCxDQUFhZSxPQUFiLEVBQXNCQyxNQUF0QixFQUE4Qjs7QUFFekMsUUFBSUMsZUFBZSx3QkFBbkI7QUFDQSxRQUFJQyxRQUFTSCxRQUFRSSxJQUFSLENBQWFDLE1BQWQsR0FBd0JMLFFBQVFJLElBQWhDLEdBQXVDRSxPQUFPQyxJQUFQLENBQVlOLE9BQU9FLEtBQW5CLENBQW5EO0FBQ0EsUUFBSUssV0FBVyxDQUFmOztBQUVBO0FBQ0EsUUFBSUMsaUJBQWlCUixPQUFPUztBQUN4QjtBQURpQixLQUVoQkMsR0FGZ0IsQ0FFWixVQUFDeEIsTUFBRCxFQUFTeUIsR0FBVCxFQUFpQjtBQUNsQixZQUFHLE9BQU96QixNQUFQLEtBQWtCLFFBQXJCLEVBQStCO0FBQzNCLGdCQUFJMEIsTUFBTTFCLE1BQVY7QUFDQSxnQkFBR0QsYUFBYUMsTUFBYixDQUFILEVBQXlCO0FBQ3JCQSx5QkFBUzJCLFNBQVM1QixhQUFhQyxNQUFiLENBQVQsQ0FBVDtBQUNBQSx1QkFBTzBCLEdBQVAsR0FBYUEsR0FBYjtBQUNILGFBSEQsTUFHTztBQUNILHVCQUFPLElBQVA7QUFDSDtBQUNKLFNBUkQsTUFRTztBQUNIMUIsbUJBQU80QixNQUFQLEdBQWdCLElBQWhCO0FBQ0g7O0FBRUQsZUFBTzVCLE1BQVA7QUFDSCxLQWhCZ0IsRUFpQmhCNkIsTUFqQmdCLENBaUJUO0FBQUEsZUFBVTdCLE1BQVY7QUFBQSxLQWpCUztBQWtCakI7QUFDQTtBQW5CaUIsS0FvQmhCd0IsR0FwQmdCLENBb0JaLGtCQUFXO0FBQ1pMLGVBQ0tDLElBREwsQ0FDVXBCLE9BQU9nQixLQURqQixFQUVLYyxPQUZMLENBRWEsZ0JBQVE7QUFDYixnQkFBR0MsU0FBUyxPQUFaLEVBQXFCO0FBQ2pCLGdGQUE4Qy9CLE9BQU9nQyxJQUFyRDtBQUNILGFBRkQsTUFFTyxJQUFHYixPQUFPQyxJQUFQLENBQVlOLE9BQU9FLEtBQW5CLEVBQTBCaUIsT0FBMUIsQ0FBa0NGLElBQWxDLElBQTBDLENBQTdDLEVBQWdEO0FBQ25ELDBDQUFZLFdBQVdBLElBQVgsR0FBa0IsVUFBbEIsR0FBK0IvQixPQUFPZ0MsSUFBdEMsR0FBNkMsMENBQXpEO0FBQ0g7QUFDSixTQVJMO0FBU0EsZUFBT2hDLE1BQVA7QUFDSCxLQS9CZ0I7QUFnQ2pCO0FBaENpQixLQWlDaEI2QixNQWpDZ0IsQ0FpQ1QsVUFBQzdCLE1BQUQsRUFBYTtBQUNqQixZQUFHYSxRQUFRVSxPQUFYLEVBQW9CO0FBQ2hCLG1CQUFPVixRQUFRVSxPQUFSLENBQWdCVSxPQUFoQixDQUF3QmpDLE9BQU9nQyxJQUEvQixNQUF5QyxDQUFDLENBQWpEO0FBQ0g7QUFDRCxlQUFPLElBQVA7QUFDSCxLQXRDZ0I7QUF1Q2pCO0FBdkNpQixLQXdDaEJSLEdBeENnQixDQXdDWixVQUFDeEIsTUFBRCxFQUFhO0FBQ2Q7QUFDQSxZQUFJa0Msa0JBQWtCLENBQUMsZ0JBQU1DLElBQU4sQ0FBV25DLE9BQU9nQyxJQUFsQixDQUFELEVBQTBCSSxNQUExQixDQUFpQ3BCLE1BQU1RLEdBQU4sQ0FBVSxVQUFDYSxFQUFELEVBQVE7QUFDckUsbUJBQU9yQyxPQUFPZ0IsS0FBUCxDQUFhcUIsRUFBYixJQUFtQixnQkFBTUMsS0FBTixDQUFZRCxFQUFaLENBQW5CLEdBQXFDLGdCQUFNRSxJQUFOLENBQVdGLEVBQVgsQ0FBNUM7QUFDSCxTQUZzRCxDQUFqQyxDQUF0QjtBQUdBdEIscUJBQWFOLElBQWIsQ0FBa0J5QixlQUFsQjs7QUFFQSxlQUFPbEMsTUFBUDtBQUNILEtBaERnQixDQUFyQjs7QUFrREFVLFlBQVFDLEdBQVIsQ0FBWUksYUFBYUgsUUFBYixFQUFaOztBQUVBO0FBQ0FJLFVBQU1jLE9BQU4sQ0FBYyxVQUFDQyxJQUFELEVBQVc7QUFDckJULHVCQUFlUSxPQUFmLENBQXVCLFVBQUM5QixNQUFELEVBQVk7QUFDL0IsZ0JBQUdBLE9BQU9nQixLQUFQLENBQWFlLElBQWIsQ0FBSCxFQUF1QjtBQUNuQixvQkFBSVMsYUFBYSxHQUFHSixNQUFILENBQVVwQyxPQUFPZ0IsS0FBUCxDQUFhZSxJQUFiLENBQVYsQ0FBakI7QUFDQXpCLHlCQUFTLENBQ0wsZ0JBQU1nQyxLQUFOLENBQVlQLElBQVosSUFBb0IsSUFBcEIsR0FBNEIsZ0JBQU1VLElBQU4sQ0FBVzNCLE9BQU9FLEtBQVAsQ0FBYWUsSUFBYixDQUFYLENBRHZCLEVBRUwsZ0JBQU1JLElBQU4sQ0FBV25DLE9BQU9nQyxJQUFsQixJQUEwQixJQUExQixHQUFpQyxnQkFBTVMsSUFBTixDQUFXekMsT0FBTzBCLEdBQWxCLENBRjVCLEVBR0xjLFdBQVdFLElBQVgsQ0FBZ0IsSUFBaEIsQ0FISyxDQUFUOztBQU9BRiwyQkFBV1YsT0FBWCxDQUFtQixVQUFDYSxFQUFELEVBQVM7QUFDeEIsd0JBQUcsQ0FBQzlCLFFBQVErQixHQUFaLEVBQWlCO0FBQ2JsQyxnQ0FBUUMsR0FBUixDQUFZLFNBQVosRUFBdUIsZ0JBQU1rQyxJQUFOLENBQVdGLEVBQVgsQ0FBdkIsRUFBdUMsSUFBdkMsRUFBNkMsZ0JBQU1FLElBQU4sQ0FBVzdDLE9BQU8wQixHQUFQLElBQWMsSUFBekIsQ0FBN0M7QUFDQSw0QkFBSW9CLGVBQWUsNEJBQWFILEVBQWIsRUFBaUI7QUFDaENqQixpQ0FBSzFCLE9BQU8wQixHQUFQLElBQWMsSUFEYTtBQUVoQ3FCLG1DQUFPO0FBRnlCLHlCQUFqQixDQUFuQjs7QUFLQSw0QkFBR0QsYUFBYUUsTUFBYixHQUFzQixDQUF6QixFQUE0QjtBQUN4QkMsb0NBQVFDLElBQVIsQ0FBYUosYUFBYUUsTUFBMUI7QUFDSDtBQUNKO0FBQ0osaUJBWkQ7QUFhQXRDLHdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUVIO0FBQ0osU0ExQkQ7QUEyQkgsS0E1QkQ7QUE4QkgiLCJmaWxlIjoiUnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBUYWJsZSBmcm9tICdjbGktdGFibGUnO1xuaW1wb3J0IHNoZWxsQ29tbWFuZCBmcm9tICcuL3V0aWwvc2hlbGxDb21tYW5kJztcbmltcG9ydCB7cHVzaFdhcm5pbmd9IGZyb20gJy4vdXRpbC93YXJuaW5nJztcblxuXG5mdW5jdGlvbiBsdXJrbGVFeGlzdHMobHVya2xlKSB7XG4gICAgdmFyIHBhdGhMb2NhdGlvbiA9IHBhdGgucmVzb2x2ZShsdXJrbGUsICdsdXJrbGUueW1sJylcbiAgICB0cnkge1xuICAgICAgICBmcy5zdGF0U3luYyhwYXRoTG9jYXRpb24sIGZzLkZfT0spO1xuICAgICAgICByZXR1cm4gcGF0aExvY2F0aW9uO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcHVzaFdhcm5pbmcobHVya2xlICsgJy9sdXJrbGUueW1sJyArICcgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGFibGVMb2coYXJyKSB7XG4gICAgdmFyIHRhYmxlID0gbmV3IFRhYmxlKCk7XG4gICAgdGFibGUucHVzaChhcnIpO1xuICAgIGNvbnNvbGUubG9nKHRhYmxlLnRvU3RyaW5nKCkpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJ1bihwcm9ncmFtLCBjb25maWcpIHtcblxuICAgIHZhciBjb21tYW5kVGFibGUgPSBuZXcgVGFibGUoKTtcbiAgICB2YXIgdGFza3MgPSAocHJvZ3JhbS5hcmdzLmxlbmd0aCkgPyBwcm9ncmFtLmFyZ3MgOiBPYmplY3Qua2V5cyhjb25maWcudGFza3MpO1xuICAgIHZhciB0YXNrc1J1biA9IDA7XG5cbiAgICAvLyBHZW5lcmF0ZSB0aGUgb3JkZXIgb2YgY29tbWFuZHNcbiAgICB2YXIgbHVya2xlQ29tbWFuZHMgPSBjb25maWcubHVya2xlc1xuICAgICAgICAvLyBMb2FkIGx1cmtsZSBmaWxlcyB3aGlsZSBpZ25vcmluZyBpbmxpbmUgZGVmaW5pdGlvbnNcbiAgICAgICAgLm1hcCgobHVya2xlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBsdXJrbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN3ZCA9IGx1cmtsZTtcbiAgICAgICAgICAgICAgICBpZihsdXJrbGVFeGlzdHMobHVya2xlKSkge1xuICAgICAgICAgICAgICAgICAgICBsdXJrbGUgPSBsb2FkWWFtbChsdXJrbGVFeGlzdHMobHVya2xlKSk7XG4gICAgICAgICAgICAgICAgICAgIGx1cmtsZS5jd2QgPSBjd2Q7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsdXJrbGUuaW5saW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGx1cmtsZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihsdXJrbGUgPT4gbHVya2xlKVxuICAgICAgICAvLyBDaGVjayB0YXNrcyBhZ2FpbnN0IHRoZSBtYWluIHRhc2sgbGlzdFxuICAgICAgICAvLyBhbmQgcHJlc2V0IGEgd2FybmluZyBmb3IgdW5kb2N1bWVudGVkIHRhc2tzXG4gICAgICAgIC5tYXAobHVya2xlID0+ICB7XG4gICAgICAgICAgICBPYmplY3RcbiAgICAgICAgICAgICAgICAua2V5cyhsdXJrbGUudGFza3MpXG4gICAgICAgICAgICAgICAgLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRhc2sgPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hXYXJuaW5nKGBSZXNlcnZlZCB0YXNrICdzdGFydCcgZm91bmQgaW4gJHtsdXJrbGUubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKE9iamVjdC5rZXlzKGNvbmZpZy50YXNrcykuaW5kZXhPZih0YXNrKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hXYXJuaW5nKFwiVGFzayAnXCIgKyB0YXNrICsgXCInIGZyb20gJ1wiICsgbHVya2xlLm5hbWUgKyBcIicgaXMgbm90IGRvY3VtZW50ZWQgaW4gbHVya2xlLWNvbmZpZy55bWxcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBsdXJrbGU7XG4gICAgICAgIH0pXG4gICAgICAgIC8vIGZpbHRlciBvdXQgbHVya2xlcyBpZiAtbCBmbGFnIGlzIGRlZmluZWRcbiAgICAgICAgLmZpbHRlcigobHVya2xlKSA9PiAge1xuICAgICAgICAgICAgaWYocHJvZ3JhbS5sdXJrbGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2dyYW0ubHVya2xlcy5pbmRleE9mKGx1cmtsZS5uYW1lKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLy9jcmVhdGUgdGhlIGNvbW1hbmQgdGFibGVcbiAgICAgICAgLm1hcCgobHVya2xlKSA9PiAge1xuICAgICAgICAgICAgLy8gQWRkIHJvdyB0byBpbmZvIHRhYmxlXG4gICAgICAgICAgICB2YXIgY29tbWFuZFRhYmxlUm93ID0gW2NoYWxrLmJsdWUobHVya2xlLm5hbWUpXS5jb25jYXQodGFza3MubWFwKChsbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBsdXJrbGUudGFza3NbbGxdID8gY2hhbGsuZ3JlZW4obGwpIDogY2hhbGsuZ3JheShsbClcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGNvbW1hbmRUYWJsZS5wdXNoKGNvbW1hbmRUYWJsZVJvdyk7XG5cbiAgICAgICAgICAgIHJldHVybiBsdXJrbGU7XG4gICAgICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coY29tbWFuZFRhYmxlLnRvU3RyaW5nKCkpO1xuXG4gICAgLy8gU3RhcnQgc3Bhd25pbmcgdGhlIHRhc2tzIGluIG9yZGVyXG4gICAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4gIHtcbiAgICAgICAgbHVya2xlQ29tbWFuZHMuZm9yRWFjaCgobHVya2xlKSA9PiB7XG4gICAgICAgICAgICBpZihsdXJrbGUudGFza3NbdGFza10pIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFza3NUb1J1biA9IFtdLmNvbmNhdChsdXJrbGUudGFza3NbdGFza10pO1xuICAgICAgICAgICAgICAgIHRhYmxlTG9nKFtcbiAgICAgICAgICAgICAgICAgICAgY2hhbGsuZ3JlZW4odGFzaykgKyAnXFxuJyArICBjaGFsay5ncmV5KGNvbmZpZy50YXNrc1t0YXNrXSksXG4gICAgICAgICAgICAgICAgICAgIGNoYWxrLmJsdWUobHVya2xlLm5hbWUpICsgJ1xcbicgKyBjaGFsay5ncmV5KGx1cmtsZS5jd2QpLFxuICAgICAgICAgICAgICAgICAgICB0YXNrc1RvUnVuLmpvaW4oJ1xcbicpXG4gICAgICAgICAgICAgICAgXSk7XG5cblxuICAgICAgICAgICAgICAgIHRhc2tzVG9SdW4uZm9yRWFjaCgodHQpID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFwcm9ncmFtLmRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1J1bm5pbmcnLCBjaGFsay5jeWFuKHR0KSwgJ2luJywgY2hhbGsuY3lhbihsdXJrbGUuY3dkIHx8ICcuLycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkUHJvY2VzcyA9IHNoZWxsQ29tbWFuZCh0dCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN3ZDogbHVya2xlLmN3ZCB8fCAnLi8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZGlvOiAnaW5oZXJpdCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZFByb2Nlc3Muc3RhdHVzID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdChjaGlsZFByb2Nlc3Muc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcXHInKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxufVxuIl19