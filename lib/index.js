#!/usr/bin/env node
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _loadYaml = require('./util/loadYaml');

var _loadYaml2 = _interopRequireDefault(_loadYaml);

var _Start = require('./Start');

var _Start2 = _interopRequireDefault(_Start);

var _Run = require('./Run');

var _Run2 = _interopRequireDefault(_Run);

var _warning = require('./util/warning');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LURKLE_CONFIG_PATH = _path2.default.resolve('lurkle-config.yml');
var config;

try {
    _fs2.default.statSync(LURKLE_CONFIG_PATH, _fs2.default.F_OK);
    config = (0, _loadYaml2.default)(LURKLE_CONFIG_PATH);
} catch (e) {
    console.log(_chalk2.default.red(e.name + ':'));
    console.log(_chalk2.default.red(e.reason));
    process.exit(1);
}

_commander2.default.version(_package2.default.version).option('-l, --lurkles <items>', 'A list of config files to merge', function (val) {
    return val.split(',');
}).option('-d, --dry', 'show commands without running them');

//
// Filter tasks
config.tasks = Object.keys(config.tasks).filter(function (ii) {
    if (ii === 'start') {
        (0, _warning.pushWarning)('Reserved task \'start\' found in tasks');
        return false;
    }
    return true;
})
// Add tasks from the config file to the help
.map(function (task) {
    _commander2.default.command(task).description(config.tasks[task]);

    return task;
})
// reconstruct the object
.reduce(function (rr, ii) {
    return _extends({}, rr, _defineProperty({}, ii, config.tasks[ii]));
}, {});

_commander2.default.parse(process.argv);

switch (_commander2.default.args[0]) {
    case 'start':
        (0, _Start2.default)(_commander2.default, config);
        break;

    default:
        (0, _Run2.default)(_commander2.default, config);
        (0, _warning.printWarning)();
        process.exit();
        break;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMVVJLTEVfQ09ORklHX1BBVEgiLCJyZXNvbHZlIiwiY29uZmlnIiwic3RhdFN5bmMiLCJGX09LIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJyZWQiLCJuYW1lIiwicmVhc29uIiwicHJvY2VzcyIsImV4aXQiLCJ2ZXJzaW9uIiwib3B0aW9uIiwidmFsIiwic3BsaXQiLCJ0YXNrcyIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJpaSIsIm1hcCIsImNvbW1hbmQiLCJ0YXNrIiwiZGVzY3JpcHRpb24iLCJyZWR1Y2UiLCJyciIsInBhcnNlIiwiYXJndiIsImFyZ3MiXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLHFCQUFxQixlQUFLQyxPQUFMLENBQWEsbUJBQWIsQ0FBekI7QUFDQSxJQUFJQyxNQUFKOztBQUVBLElBQUk7QUFDQSxpQkFBR0MsUUFBSCxDQUFZSCxrQkFBWixFQUFnQyxhQUFHSSxJQUFuQztBQUNBRixhQUFTLHdCQUFTRixrQkFBVCxDQUFUO0FBQ0gsQ0FIRCxDQUdFLE9BQU9LLENBQVAsRUFBVTtBQUNSQyxZQUFRQyxHQUFSLENBQVksZ0JBQU1DLEdBQU4sQ0FBVUgsRUFBRUksSUFBRixHQUFVLEdBQXBCLENBQVo7QUFDQUgsWUFBUUMsR0FBUixDQUFZLGdCQUFNQyxHQUFOLENBQVVILEVBQUVLLE1BQVosQ0FBWjtBQUNBQyxZQUFRQyxJQUFSLENBQWEsQ0FBYjtBQUNIOztBQUVELG9CQUNLQyxPQURMLENBQ2Esa0JBQUlBLE9BRGpCLEVBRUtDLE1BRkwsQ0FFWSx1QkFGWixFQUVxQyxpQ0FGckMsRUFFd0UsVUFBU0MsR0FBVCxFQUFjO0FBQUMsV0FBT0EsSUFBSUMsS0FBSixDQUFVLEdBQVYsQ0FBUDtBQUFzQixDQUY3RyxFQUdLRixNQUhMLENBR1ksV0FIWixFQUd5QixvQ0FIekI7O0FBS0E7QUFDQTtBQUNBWixPQUFPZSxLQUFQLEdBQWVDLE9BQ1ZDLElBRFUsQ0FDTGpCLE9BQU9lLEtBREYsRUFFVkcsTUFGVSxDQUVILGNBQU07QUFDVixRQUFHQyxPQUFPLE9BQVYsRUFBbUI7QUFDZjtBQUNBLGVBQU8sS0FBUDtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0gsQ0FSVTtBQVNYO0FBVFcsQ0FVVkMsR0FWVSxDQVVOLGdCQUFRO0FBQ1Qsd0JBQ0tDLE9BREwsQ0FDYUMsSUFEYixFQUVLQyxXQUZMLENBRWlCdkIsT0FBT2UsS0FBUCxDQUFhTyxJQUFiLENBRmpCOztBQUlBLFdBQU9BLElBQVA7QUFDSCxDQWhCVTtBQWlCWDtBQWpCVyxDQWtCVkUsTUFsQlUsQ0FrQkgsVUFBQ0MsRUFBRCxFQUFLTixFQUFMLEVBQVk7QUFDaEIsd0JBQ09NLEVBRFAsc0JBRUtOLEVBRkwsRUFFVW5CLE9BQU9lLEtBQVAsQ0FBYUksRUFBYixDQUZWO0FBSUgsQ0F2QlUsRUF1QlIsRUF2QlEsQ0FBZjs7QUF5QkEsb0JBQVFPLEtBQVIsQ0FBY2pCLFFBQVFrQixJQUF0Qjs7QUFFQSxRQUFRLG9CQUFRQyxJQUFSLENBQWEsQ0FBYixDQUFSO0FBQ0ksU0FBSyxPQUFMO0FBQ0ksa0RBQWU1QixNQUFmO0FBQ0E7O0FBRUo7QUFDSSxnREFBYUEsTUFBYjtBQUNBO0FBQ0FTLGdCQUFRQyxJQUFSO0FBQ0E7QUFUUiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwa2cgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XG5cbmltcG9ydCBsb2FkWWFtbCBmcm9tICcuL3V0aWwvbG9hZFlhbWwnO1xuaW1wb3J0IFN0YXJ0IGZyb20gJy4vU3RhcnQnO1xuaW1wb3J0IFJ1biBmcm9tICcuL1J1bic7XG5pbXBvcnQge3B1c2hXYXJuaW5nLCBwcmludFdhcm5pbmd9IGZyb20gJy4vdXRpbC93YXJuaW5nJztcblxudmFyIExVUktMRV9DT05GSUdfUEFUSCA9IHBhdGgucmVzb2x2ZSgnbHVya2xlLWNvbmZpZy55bWwnKTtcbnZhciBjb25maWc7XG5cbnRyeSB7XG4gICAgZnMuc3RhdFN5bmMoTFVSS0xFX0NPTkZJR19QQVRILCBmcy5GX09LKTtcbiAgICBjb25maWcgPSBsb2FkWWFtbChMVVJLTEVfQ09ORklHX1BBVEgpO1xufSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlLm5hbWUgICsgJzonKSk7XG4gICAgY29uc29sZS5sb2coY2hhbGsucmVkKGUucmVhc29uKSk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufVxuXG5wcm9ncmFtXG4gICAgLnZlcnNpb24ocGtnLnZlcnNpb24pXG4gICAgLm9wdGlvbignLWwsIC0tbHVya2xlcyA8aXRlbXM+JywgJ0EgbGlzdCBvZiBjb25maWcgZmlsZXMgdG8gbWVyZ2UnLCBmdW5jdGlvbih2YWwpIHtyZXR1cm4gdmFsLnNwbGl0KCcsJyl9KVxuICAgIC5vcHRpb24oJy1kLCAtLWRyeScsICdzaG93IGNvbW1hbmRzIHdpdGhvdXQgcnVubmluZyB0aGVtJyk7XG5cbi8vXG4vLyBGaWx0ZXIgdGFza3NcbmNvbmZpZy50YXNrcyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZy50YXNrcylcbiAgICAuZmlsdGVyKGlpID0+IHtcbiAgICAgICAgaWYoaWkgPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgIHB1c2hXYXJuaW5nKGBSZXNlcnZlZCB0YXNrICdzdGFydCcgZm91bmQgaW4gdGFza3NgKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC8vIEFkZCB0YXNrcyBmcm9tIHRoZSBjb25maWcgZmlsZSB0byB0aGUgaGVscFxuICAgIC5tYXAodGFzayA9PiB7XG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKHRhc2spXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oY29uZmlnLnRhc2tzW3Rhc2tdKVxuXG4gICAgICAgIHJldHVybiB0YXNrO1xuICAgIH0pXG4gICAgLy8gcmVjb25zdHJ1Y3QgdGhlIG9iamVjdFxuICAgIC5yZWR1Y2UoKHJyLCBpaSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucnIsXG4gICAgICAgICAgICBbaWldOiBjb25maWcudGFza3NbaWldXG4gICAgICAgIH1cbiAgICB9LCB7fSlcblxucHJvZ3JhbS5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5zd2l0Y2ggKHByb2dyYW0uYXJnc1swXSkge1xuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgU3RhcnQocHJvZ3JhbSwgY29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgICBSdW4ocHJvZ3JhbSwgY29uZmlnKTtcbiAgICAgICAgcHJpbnRXYXJuaW5nKCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgICAgICBicmVhaztcbn1cblxuXG5cbiJdfQ==