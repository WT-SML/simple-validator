"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _baseRule = require("./baseRule.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var wtFormCheck = function wtFormCheck(formArr) {
  clean(); //初始化

  var result = []; //定义验证结果集

  var _iterator = _createForOfIteratorHelper(formArr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var formItem = _step.value;

      var _formItem = (0, _slicedToArray2["default"])(formItem, 3),
          rules = _formItem[0],
          data = _formItem[1],
          domID = _formItem[2];

      var itemPass = true;

      var _iterator2 = _createForOfIteratorHelper(rules),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var rule = _step2.value;

          var _iterator3 = _createForOfIteratorHelper(maps),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var map = _step3.value;

              if (!map.reg) {
                return console.error('Please strictly follow the @wutong example to extend the rule');
              }

              if (map.reg.test(rule) && itemPass) {
                var res = map.method(rule, data);
                itemPass = res.pass || false;

                if (!itemPass && res.msg) {
                  msg(domID, res.msg);
                }
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      result.push(itemPass);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var _i = 0, _result = result; _i < _result.length; _i++) {
    var pass = _result[_i];

    //断言
    if (!pass) {
      return false;
    }
  }

  return true;
}; // 规则与方法的映射集合


var maps = [{
  reg: /required/,
  method: _baseRule.required
}, {
  reg: /minlength\(\d+\)/,
  method: _baseRule.minlength
}, {
  reg: /maxlength\(\d+\)/,
  method: _baseRule.maxlength
}, {
  reg: /max\(-?\d+\)/,
  method: _baseRule.max
}, {
  reg: /min\(-?\d+\)/,
  method: _baseRule.min
}, {
  reg: /mobile/,
  method: _baseRule.mobile
}, {
  reg: /url/,
  method: _baseRule.url
}, {
  reg: /int/,
  method: _baseRule["int"]
}]; // `__formCheckMsg__` 这个类名请不要在普通dom中使用了
//清空提示

var clean = function clean() {
  var msgDomArr = (0, _toConsumableArray2["default"])(document.getElementsByClassName('__formCheckMsg__'));

  if (msgDomArr.length > 0) {
    var _iterator4 = _createForOfIteratorHelper(msgDomArr),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var item = _step4.value;
        item.parentNode.removeChild(item);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
}; //提示


var msg = function msg(domID, _msg) {
  var formDom = document.getElementById(domID);
  var msgDom = document.createElement('span');

  var after = function after(newElement, targetElement) {
    var parent = targetElement.parentNode;

    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  };

  msgDom.style.color = 'red';
  msgDom.style.fontSize = '13px';
  msgDom.className = '__formCheckMsg__';
  msgDom.innerText = _msg;
  after(msgDom, formDom);
};

var _default = wtFormCheck;
exports["default"] = _default;

var extend = function extend(args) {
  if (Array.isArray(args)) {
    maps.push.apply(maps, (0, _toConsumableArray2["default"])(args));
  } else {
    maps.push(args);
  }

  return wtFormCheck;
};

exports.extend = extend;