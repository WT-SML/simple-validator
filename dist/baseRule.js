"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["int"] = exports.url = exports.mobile = exports.max = exports.min = exports.maxlength = exports.minlength = exports.required = void 0;

// 非空
var required = function required(rule, data) {
  return data === '' || data === null ? {
    pass: false,
    msg: '输入不能为空'
  } : {
    pass: true
  };
}; // 最小长度


exports.required = required;

var minlength = function minlength(rule, data) {
  return data.length < parseInt(rule.match(/\d+/)) ? {
    pass: false,
    msg: "\u6700\u77ED\u5E94\u4E3A".concat(rule.match(/\d+/), "\u4E2A\u5B57\u7B26")
  } : {
    pass: true
  };
}; // 最大长度


exports.minlength = minlength;

var maxlength = function maxlength(rule, data) {
  return data.length > parseInt(rule.match(/\d+/)) ? {
    pass: false,
    msg: "\u6700\u957F\u5E94\u4E3A".concat(rule.match(/\d+/), "\u4E2A\u5B57\u7B26")
  } : {
    pass: true
  };
}; // 最小值


exports.maxlength = maxlength;

var min = function min(rule, data) {
  return parseInt(data) < parseInt(rule.match(/-?\d+/)) ? {
    pass: false,
    msg: "\u6700\u5C0F\u503C\u4E3A".concat(rule.match(/-?\d+/))
  } : {
    pass: true
  };
}; // // 最大值


exports.min = min;

var max = function max(rule, data) {
  return parseInt(data) > parseInt(rule.match(/-?\d+/)) ? {
    pass: false,
    msg: "\u6700\u5927\u503C\u4E3A".concat(rule.match(/-?\d+/))
  } : {
    pass: true
  };
}; // // 手机号


exports.max = max;

var mobile = function mobile(rule, data) {
  return !/^[1][3456789]\d{9}$/.test(data) ? {
    pass: false,
    msg: '手机号格式不正确'
  } : {
    pass: true
  };
}; // // url


exports.mobile = mobile;

var url = function url(rule, data) {
  return !/(http|https):\/\/([\w.]+\/?)\S*/.test(data) ? {
    pass: false,
    msg: 'URL格式不正确'
  } : {
    pass: true
  };
}; // // 整数


exports.url = url;

var _int = function _int(rule, data) {
  return data % 1 !== 0 ? {
    pass: false,
    msg: '内容应是整数'
  } : {
    pass: true
  };
};

exports["int"] = _int;