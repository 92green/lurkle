#!/usr/bin/env node
'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LURKLE_CONFIG_PATH = _path2.default.resolve('lurkle-config.yml');
var config;

try {
    _fs2.default.statSync(LURKLE_CONFIG_PATH, _fs2.default.F_OK);
    config = (0, _loadYaml2.default)(LURKLE_CONFIG_PATH);
} catch (e) {
    console.log(e);
    console.log(_chalk2.default.red(e.name + ':'));
    console.log(_chalk2.default.red(e.reason));
    process.exit(1);
}

_commander2.default.version(_package2.default.version).option('-l, --lurkles <items>', 'A list of config files to merge', function (val) {
    return val.split(',');
}).option('-d, --dry', 'show commands without running them');

// Add tasks from the config file to the help
Object.keys(config.tasks).map(function (task) {
    _commander2.default.command(task).description(config.tasks[task]);
});

_commander2.default.parse(process.argv);

switch (_commander2.default.args[0]) {
    case 'start':
        (0, _Start2.default)(_commander2.default, config);
        break;

    default:
        (0, _Run2.default)(_commander2.default, config);
        process.exit();
        break;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMVVJLTEVfQ09ORklHX1BBVEgiLCJyZXNvbHZlIiwiY29uZmlnIiwic3RhdFN5bmMiLCJGX09LIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJyZWQiLCJuYW1lIiwicmVhc29uIiwicHJvY2VzcyIsImV4aXQiLCJ2ZXJzaW9uIiwib3B0aW9uIiwidmFsIiwic3BsaXQiLCJPYmplY3QiLCJrZXlzIiwidGFza3MiLCJtYXAiLCJjb21tYW5kIiwidGFzayIsImRlc2NyaXB0aW9uIiwicGFyc2UiLCJhcmd2IiwiYXJncyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxxQkFBcUIsZUFBS0MsT0FBTCxDQUFhLG1CQUFiLENBQXpCO0FBQ0EsSUFBSUMsTUFBSjs7QUFFQSxJQUFJO0FBQ0EsaUJBQUdDLFFBQUgsQ0FBWUgsa0JBQVosRUFBZ0MsYUFBR0ksSUFBbkM7QUFDQUYsYUFBUyx3QkFBU0Ysa0JBQVQsQ0FBVDtBQUNILENBSEQsQ0FHRSxPQUFPSyxDQUFQLEVBQVU7QUFDUkMsWUFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0FDLFlBQVFDLEdBQVIsQ0FBWSxnQkFBTUMsR0FBTixDQUFVSCxFQUFFSSxJQUFGLEdBQVUsR0FBcEIsQ0FBWjtBQUNBSCxZQUFRQyxHQUFSLENBQVksZ0JBQU1DLEdBQU4sQ0FBVUgsRUFBRUssTUFBWixDQUFaO0FBQ0FDLFlBQVFDLElBQVIsQ0FBYSxDQUFiO0FBQ0g7O0FBRUQsb0JBQ0tDLE9BREwsQ0FDYSxrQkFBSUEsT0FEakIsRUFFS0MsTUFGTCxDQUVZLHVCQUZaLEVBRXFDLGlDQUZyQyxFQUV3RSxVQUFTQyxHQUFULEVBQWM7QUFBQyxXQUFPQSxJQUFJQyxLQUFKLENBQVUsR0FBVixDQUFQO0FBQXNCLENBRjdHLEVBR0tGLE1BSEwsQ0FHWSxXQUhaLEVBR3lCLG9DQUh6Qjs7QUFLQTtBQUNBRyxPQUNLQyxJQURMLENBQ1VoQixPQUFPaUIsS0FEakIsRUFFS0MsR0FGTCxDQUVTLGdCQUFRO0FBQ1Qsd0JBQ0tDLE9BREwsQ0FDYUMsSUFEYixFQUVLQyxXQUZMLENBRWlCckIsT0FBT2lCLEtBQVAsQ0FBYUcsSUFBYixDQUZqQjtBQUdILENBTkw7O0FBUUEsb0JBQVFFLEtBQVIsQ0FBY2IsUUFBUWMsSUFBdEI7O0FBRUEsUUFBUSxvQkFBUUMsSUFBUixDQUFhLENBQWIsQ0FBUjtBQUNJLFNBQUssT0FBTDtBQUNJLGtEQUFleEIsTUFBZjtBQUNBOztBQUVKO0FBQ0ksZ0RBQWFBLE1BQWI7QUFDQVMsZ0JBQVFDLElBQVI7QUFDQTtBQVJSIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcblxuaW1wb3J0IGxvYWRZYW1sIGZyb20gJy4vdXRpbC9sb2FkWWFtbCc7XG5pbXBvcnQgU3RhcnQgZnJvbSAnLi9TdGFydCc7XG5pbXBvcnQgUnVuIGZyb20gJy4vUnVuJztcblxudmFyIExVUktMRV9DT05GSUdfUEFUSCA9IHBhdGgucmVzb2x2ZSgnbHVya2xlLWNvbmZpZy55bWwnKTtcbnZhciBjb25maWc7XG5cbnRyeSB7XG4gICAgZnMuc3RhdFN5bmMoTFVSS0xFX0NPTkZJR19QQVRILCBmcy5GX09LKTtcbiAgICBjb25maWcgPSBsb2FkWWFtbChMVVJLTEVfQ09ORklHX1BBVEgpO1xufSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChlLm5hbWUgICsgJzonKSk7XG4gICAgY29uc29sZS5sb2coY2hhbGsucmVkKGUucmVhc29uKSk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufVxuXG5wcm9ncmFtXG4gICAgLnZlcnNpb24ocGtnLnZlcnNpb24pXG4gICAgLm9wdGlvbignLWwsIC0tbHVya2xlcyA8aXRlbXM+JywgJ0EgbGlzdCBvZiBjb25maWcgZmlsZXMgdG8gbWVyZ2UnLCBmdW5jdGlvbih2YWwpIHtyZXR1cm4gdmFsLnNwbGl0KCcsJyl9KVxuICAgIC5vcHRpb24oJy1kLCAtLWRyeScsICdzaG93IGNvbW1hbmRzIHdpdGhvdXQgcnVubmluZyB0aGVtJyk7XG5cbi8vIEFkZCB0YXNrcyBmcm9tIHRoZSBjb25maWcgZmlsZSB0byB0aGUgaGVscFxuT2JqZWN0XG4gICAgLmtleXMoY29uZmlnLnRhc2tzKVxuICAgIC5tYXAodGFzayA9PiB7XG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKHRhc2spXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oY29uZmlnLnRhc2tzW3Rhc2tdKVxuICAgIH0pO1xuXG5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG4gXG5zd2l0Y2ggKHByb2dyYW0uYXJnc1swXSkge1xuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgU3RhcnQocHJvZ3JhbSwgY29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OiBcbiAgICAgICAgUnVuKHByb2dyYW0sIGNvbmZpZyk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgICAgICBicmVhaztcbn1cblxuIl19