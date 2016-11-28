'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pushWarning = pushWarning;
exports.printWarning = printWarning;

var _pm = require('pm2');

var _pm2 = _interopRequireDefault(_pm);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var warnings = [];

function pushWarning(warning) {
    warnings.push(_chalk2.default.yellow(' * ', warning));
}

function printWarning() {
    if (warnings.length) {
        console.log(_chalk2.default.yellow('Warnings:'));
        console.log(warnings.join('\n'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3dhcm5pbmcuanMiXSwibmFtZXMiOlsicHVzaFdhcm5pbmciLCJwcmludFdhcm5pbmciLCJ3YXJuaW5ncyIsIndhcm5pbmciLCJwdXNoIiwieWVsbG93IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7O1FBS2dCQSxXLEdBQUFBLFc7UUFJQUMsWSxHQUFBQSxZOztBQVRoQjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQyxXQUFXLEVBQWY7O0FBRU8sU0FBU0YsV0FBVCxDQUFxQkcsT0FBckIsRUFBOEI7QUFDakNELGFBQVNFLElBQVQsQ0FBYyxnQkFBTUMsTUFBTixDQUFhLEtBQWIsRUFBb0JGLE9BQXBCLENBQWQ7QUFDSDs7QUFFTSxTQUFTRixZQUFULEdBQXdCO0FBQzNCLFFBQUdDLFNBQVNJLE1BQVosRUFBb0I7QUFDaEJDLGdCQUFRQyxHQUFSLENBQVksZ0JBQU1ILE1BQU4sQ0FBYSxXQUFiLENBQVo7QUFDQUUsZ0JBQVFDLEdBQVIsQ0FBWU4sU0FBU08sSUFBVCxDQUFjLElBQWQsQ0FBWjtBQUNIO0FBQ0oiLCJmaWxlIjoid2FybmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbTIgZnJvbSAncG0yJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5cbnZhciB3YXJuaW5ncyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaFdhcm5pbmcod2FybmluZykge1xuICAgIHdhcm5pbmdzLnB1c2goY2hhbGsueWVsbG93KCcgKiAnLCB3YXJuaW5nKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludFdhcm5pbmcoKSB7XG4gICAgaWYod2FybmluZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLnllbGxvdygnV2FybmluZ3M6JykpO1xuICAgICAgICBjb25zb2xlLmxvZyh3YXJuaW5ncy5qb2luKCdcXG4nKSk7XG4gICAgfVxufVxuIl19