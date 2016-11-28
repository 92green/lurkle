'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadYaml;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadYaml(path) {
    return _jsYaml2.default.load(_fs2.default.readFileSync(path));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2xvYWRZYW1sLmpzIl0sIm5hbWVzIjpbImxvYWRZYW1sIiwicGF0aCIsImxvYWQiLCJyZWFkRmlsZVN5bmMiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUd3QkEsUTs7QUFIeEI7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBU0EsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0I7QUFDbkMsV0FBTyxpQkFBS0MsSUFBTCxDQUFVLGFBQUdDLFlBQUgsQ0FBZ0JGLElBQWhCLENBQVYsQ0FBUDtBQUNIIiwiZmlsZSI6ImxvYWRZYW1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB5YW1sIGZyb20gJ2pzLXlhbWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkWWFtbChwYXRoKSB7XG4gICAgcmV0dXJuIHlhbWwubG9hZChmcy5yZWFkRmlsZVN5bmMocGF0aCkpO1xufVxuIl19