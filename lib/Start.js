'use strict';

Object.defineProperty(exports, "__esModule", {
			value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Start;

var _pm = require('pm2');

var _pm2 = _interopRequireDefault(_pm);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Start(_ref, _ref2) {
			var args = _ref.args;
			var sites = _ref2.sites;


			var ecosystem = Object.keys(sites).filter(function (ii) {
						return ii !== 'env';
			}).filter(function (ii) {
						if (args.length > 1) {
									return args.slice(1, args.length).indexOf(ii) > -1;
						}
						return true;
			}).map(function (ii) {
						var site = sites[ii];
						return _extends({
									name: ii
						}, site, {
									env: Object.assign({}, sites.env, site.env)
						});
			});

			_pm2.default.connect(true, function (err) {
						if (err) {
									console.error(_chalk2.default.red(err));
									process.exit(2);
						}
						_pm2.default.start(ecosystem, function (err, apps) {
									if (err) {
												console.error(_chalk2.default.red(err));
												process.exit(2);
									}
									_pm2.default.streamLogs('all', 0, false, 'HH:mm:ss', false);
						});
			});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdGFydC5qcyJdLCJuYW1lcyI6WyJTdGFydCIsImFyZ3MiLCJzaXRlcyIsImVjb3N5c3RlbSIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJpaSIsImxlbmd0aCIsInNsaWNlIiwiaW5kZXhPZiIsIm1hcCIsInNpdGUiLCJuYW1lIiwiZW52IiwiYXNzaWduIiwiY29ubmVjdCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlZCIsInByb2Nlc3MiLCJleGl0Iiwic3RhcnQiLCJhcHBzIiwic3RyZWFtTG9ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBR3dCQSxLOztBQUh4Qjs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTQSxLQUFULGNBQWdDO0FBQUEsT0FBaEJDLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLE9BQVJDLEtBQVEsU0FBUkEsS0FBUTs7O0FBRTlDLE9BQUlDLFlBQVlDLE9BQU9DLElBQVAsQ0FBWUgsS0FBWixFQUNYSSxNQURXLENBQ0o7QUFBQSxhQUFNQyxPQUFPLEtBQWI7QUFBQSxJQURJLEVBRVhELE1BRlcsQ0FFSixjQUFNO0FBQ2IsVUFBR0wsS0FBS08sTUFBTCxHQUFjLENBQWpCLEVBQW9CO0FBQ3RCLGdCQUFPUCxLQUFLUSxLQUFMLENBQVcsQ0FBWCxFQUFjUixLQUFLTyxNQUFuQixFQUEyQkUsT0FBM0IsQ0FBbUNILEVBQW5DLElBQXlDLENBQUMsQ0FBakQ7QUFDRztBQUNELGFBQU8sSUFBUDtBQUNBLElBUFcsRUFRWEksR0FSVyxDQVFQLGNBQU07QUFDVixVQUFJQyxPQUFPVixNQUFNSyxFQUFOLENBQVg7QUFDQTtBQUNDTSxlQUFNTjtBQURQLFNBRUlLLElBRko7QUFHQ0UsY0FBS1YsT0FBT1csTUFBUCxDQUFjLEVBQWQsRUFBa0JiLE1BQU1ZLEdBQXhCLEVBQTZCRixLQUFLRSxHQUFsQztBQUhOO0FBS0EsSUFmVyxDQUFoQjs7QUFpQkEsZ0JBQUlFLE9BQUosQ0FBWSxJQUFaLEVBQWtCLFVBQUNDLEdBQUQsRUFBUztBQUN2QixVQUFJQSxHQUFKLEVBQVM7QUFDTEMsaUJBQVFDLEtBQVIsQ0FBYyxnQkFBTUMsR0FBTixDQUFVSCxHQUFWLENBQWQ7QUFDQUksaUJBQVFDLElBQVIsQ0FBYSxDQUFiO0FBQ0g7QUFDRCxtQkFBSUMsS0FBSixDQUFVcEIsU0FBVixFQUFxQixVQUFTYyxHQUFULEVBQWNPLElBQWQsRUFBb0I7QUFDckMsYUFBSVAsR0FBSixFQUFTO0FBQ0xDLG9CQUFRQyxLQUFSLENBQWMsZ0JBQU1DLEdBQU4sQ0FBVUgsR0FBVixDQUFkO0FBQ0FJLG9CQUFRQyxJQUFSLENBQWEsQ0FBYjtBQUNIO0FBQ0Qsc0JBQUlHLFVBQUosQ0FBZSxLQUFmLEVBQXNCLENBQXRCLEVBQXlCLEtBQXpCLEVBQWdDLFVBQWhDLEVBQTRDLEtBQTVDO0FBQ0gsT0FORDtBQU9ILElBWkQ7QUFhQSIsImZpbGUiOiJTdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbTIgZnJvbSAncG0yJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0YXJ0KHthcmdzfSwge3NpdGVzfSkge1xuXG5cdHZhciBlY29zeXN0ZW0gPSBPYmplY3Qua2V5cyhzaXRlcylcbiAgICBcdC5maWx0ZXIoaWkgPT4gaWkgIT09ICdlbnYnKVxuICAgIFx0LmZpbHRlcihpaSA9PiB7XG4gICAgXHRcdGlmKGFyZ3MubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCkuaW5kZXhPZihpaSkgPiAtMVxuICAgIFx0XHR9IFxuICAgIFx0XHRyZXR1cm4gdHJ1ZTtcbiAgICBcdH0pXG4gICAgXHQubWFwKGlpID0+IHtcbiAgICBcdFx0dmFyIHNpdGUgPSBzaXRlc1tpaV07XG4gICAgXHRcdHJldHVybiB7XG4gICAgXHRcdFx0bmFtZTogaWksXG4gICAgXHRcdFx0Li4uc2l0ZSxcbiAgICBcdFx0XHRlbnY6IE9iamVjdC5hc3NpZ24oe30sIHNpdGVzLmVudiwgc2l0ZS5lbnYpXG4gICAgXHRcdH07XG4gICAgXHR9KTtcblxuXHRwbTIuY29ubmVjdCh0cnVlLCAoZXJyKSA9PiB7XG5cdCAgICBpZiAoZXJyKSB7XG5cdCAgICAgICAgY29uc29sZS5lcnJvcihjaGFsay5yZWQoZXJyKSk7XG5cdCAgICAgICAgcHJvY2Vzcy5leGl0KDIpO1xuXHQgICAgfVxuXHQgICAgcG0yLnN0YXJ0KGVjb3N5c3RlbSwgZnVuY3Rpb24oZXJyLCBhcHBzKSB7XG5cdCAgICAgICAgaWYgKGVycikge1xuXHQgICAgICAgICAgICBjb25zb2xlLmVycm9yKGNoYWxrLnJlZChlcnIpKTtcblx0ICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDIpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBwbTIuc3RyZWFtTG9ncygnYWxsJywgMCwgZmFsc2UsICdISDptbTpzcycsIGZhbHNlKTtcblx0ICAgIH0pO1xuXHR9KTtcbn0iXX0=