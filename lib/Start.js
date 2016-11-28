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

var _warning = require('./util/warning');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Start(_ref, _ref2) {
    var args = _ref.args;
    var sites = _ref2.sites;

    if (!sites) {
        console.log(_chalk2.default.red('Error:'), 'No sites found in lurkle-config');
        process.exit(1);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TdGFydC5qcyJdLCJuYW1lcyI6WyJTdGFydCIsImFyZ3MiLCJzaXRlcyIsImNvbnNvbGUiLCJsb2ciLCJyZWQiLCJwcm9jZXNzIiwiZXhpdCIsImVjb3N5c3RlbSIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJpaSIsImxlbmd0aCIsInNsaWNlIiwiaW5kZXhPZiIsIm1hcCIsInNpdGUiLCJuYW1lIiwiZW52IiwiYXNzaWduIiwiY29ubmVjdCIsImVyciIsImVycm9yIiwic3RhcnQiLCJhcHBzIiwic3RyZWFtTG9ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBSXdCQSxLOztBQUp4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFZSxTQUFTQSxLQUFULGNBQWdDO0FBQUEsUUFBaEJDLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLFFBQVJDLEtBQVEsU0FBUkEsS0FBUTs7QUFDM0MsUUFBRyxDQUFDQSxLQUFKLEVBQVc7QUFDUEMsZ0JBQVFDLEdBQVIsQ0FBWSxnQkFBTUMsR0FBTixDQUFVLFFBQVYsQ0FBWixFQUFpQyxpQ0FBakM7QUFDQUMsZ0JBQVFDLElBQVIsQ0FBYSxDQUFiO0FBQ0g7QUFDRCxRQUFJQyxZQUFZQyxPQUFPQyxJQUFQLENBQVlSLEtBQVosRUFDWFMsTUFEVyxDQUNKO0FBQUEsZUFBTUMsT0FBTyxLQUFiO0FBQUEsS0FESSxFQUVYRCxNQUZXLENBRUosY0FBTTtBQUNWLFlBQUdWLEtBQUtZLE1BQUwsR0FBYyxDQUFqQixFQUFvQjtBQUNoQixtQkFBT1osS0FBS2EsS0FBTCxDQUFXLENBQVgsRUFBY2IsS0FBS1ksTUFBbkIsRUFBMkJFLE9BQTNCLENBQW1DSCxFQUFuQyxJQUF5QyxDQUFDLENBQWpEO0FBQ0g7QUFDRCxlQUFPLElBQVA7QUFDSCxLQVBXLEVBUVhJLEdBUlcsQ0FRUCxjQUFNO0FBQ1AsWUFBSUMsT0FBT2YsTUFBTVUsRUFBTixDQUFYO0FBQ0E7QUFDSU0sa0JBQU1OO0FBRFYsV0FFT0ssSUFGUDtBQUdJRSxpQkFBS1YsT0FBT1csTUFBUCxDQUFjLEVBQWQsRUFBa0JsQixNQUFNaUIsR0FBeEIsRUFBNkJGLEtBQUtFLEdBQWxDO0FBSFQ7QUFLSCxLQWZXLENBQWhCOztBQWlCQSxpQkFBSUUsT0FBSixDQUFZLElBQVosRUFBa0IsVUFBQ0MsR0FBRCxFQUFTO0FBQ3ZCLFlBQUlBLEdBQUosRUFBUztBQUNMbkIsb0JBQVFvQixLQUFSLENBQWMsZ0JBQU1sQixHQUFOLENBQVVpQixHQUFWLENBQWQ7QUFDQWhCLG9CQUFRQyxJQUFSLENBQWEsQ0FBYjtBQUNIO0FBQ0QscUJBQUlpQixLQUFKLENBQVVoQixTQUFWLEVBQXFCLFVBQVNjLEdBQVQsRUFBY0csSUFBZCxFQUFvQjtBQUNyQyxnQkFBSUgsR0FBSixFQUFTO0FBQ0xuQix3QkFBUW9CLEtBQVIsQ0FBYyxnQkFBTWxCLEdBQU4sQ0FBVWlCLEdBQVYsQ0FBZDtBQUNBaEIsd0JBQVFDLElBQVIsQ0FBYSxDQUFiO0FBQ0g7QUFDRCx5QkFBSW1CLFVBQUosQ0FBZSxLQUFmLEVBQXNCLENBQXRCLEVBQXlCLEtBQXpCLEVBQWdDLFVBQWhDLEVBQTRDLEtBQTVDO0FBQ0gsU0FORDtBQU9ILEtBWkQ7QUFhSCIsImZpbGUiOiJTdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbTIgZnJvbSAncG0yJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQge3B1c2hXYXJuaW5nLCBwcmludFdhcm5pbmd9IGZyb20gJy4vdXRpbC93YXJuaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RhcnQoe2FyZ3N9LCB7c2l0ZXN9KSB7XG4gICAgaWYoIXNpdGVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZCgnRXJyb3I6JyksICdObyBzaXRlcyBmb3VuZCBpbiBsdXJrbGUtY29uZmlnJyk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gICAgdmFyIGVjb3N5c3RlbSA9IE9iamVjdC5rZXlzKHNpdGVzKVxuICAgICAgICAuZmlsdGVyKGlpID0+IGlpICE9PSAnZW52JylcbiAgICAgICAgLmZpbHRlcihpaSA9PiB7XG4gICAgICAgICAgICBpZihhcmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCkuaW5kZXhPZihpaSkgPiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoaWkgPT4ge1xuICAgICAgICAgICAgdmFyIHNpdGUgPSBzaXRlc1tpaV07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGlpLFxuICAgICAgICAgICAgICAgIC4uLnNpdGUsXG4gICAgICAgICAgICAgICAgZW52OiBPYmplY3QuYXNzaWduKHt9LCBzaXRlcy5lbnYsIHNpdGUuZW52KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICBwbTIuY29ubmVjdCh0cnVlLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsucmVkKGVycikpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDIpO1xuICAgICAgICB9XG4gICAgICAgIHBtMi5zdGFydChlY29zeXN0ZW0sIGZ1bmN0aW9uKGVyciwgYXBwcykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsucmVkKGVycikpO1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBtMi5zdHJlYW1Mb2dzKCdhbGwnLCAwLCBmYWxzZSwgJ0hIOm1tOnNzJywgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiJdfQ==