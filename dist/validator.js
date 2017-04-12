'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inputs = {
    name: '',
    age: '19'
};

var rule = {
    min: 'значение :attribute меньше :min',
    max: 'значение :attribute не должно быть больше чем :max',
    required: 'значение :attribute обязательно'
};

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);

        this.rule = rule;
        this.errors = [];
    }

    _createClass(Validator, [{
        key: 'make',
        value: function make(inputs, rules) {
            var _this = this;

            var _loop = function _loop(prop) {
                if (typeof inputs[prop] !== "undefined") {
                    var allRules = rules[prop].split('|');
                    allRules.forEach(function (value) {
                        _this.callMethod(value, inputs, prop);
                    });
                };
            };

            for (var prop in rules) {
                _loop(prop);
            };
        }
    }, {
        key: 'callMethod',
        value: function callMethod(value, inputs, prop) {
            var moreParams = value.match(':') ? value.split(':')[1] : null;
            this[value.split(':')[0]](prop, [inputs[prop], moreParams]);
        }
    }, {
        key: 'fails',
        value: function fails() {
            if (this.errors.length > 0) {
                return true;
            }
            return false;
        }
    }, {
        key: 'required',
        value: function required(field, _ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                value = _ref2[0];

            if (value.length === 0) {
                this.setError(this.rule['required'], field);
            }
        }
    }, {
        key: 'min',
        value: function min(field, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                value = _ref4[0],
                num = _ref4[1];

            if (value.length < num) {
                this.setError(this.rule['min'], field, num);
            }
        }
    }, {
        key: 'max',
        value: function max(field, _ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                value = _ref6[0],
                num = _ref6[1];

            if (value.length > num) {
                this.setError(this.rule['max'], field, num);
            }
        }
    }, {
        key: 'setError',
        value: function setError(message, field) {
            var num = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var value = message.replace(/:attribute/gmi, field).replace(/:min|:max/gmi, num);
            this.errors.push(value);
        }
    }, {
        key: 'getError',
        get: function get() {
            return this.errors;
        }
    }]);

    return Validator;
}();

;

var validator = new Validator();

validator.make(inputs, {
    name: 'required|min:6',
    age: 'required|min:6'
});

if (validator.fails) {
    console.log(validator.getError);
}