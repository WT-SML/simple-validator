// 非空
export const required = (rule, data) => data === ''||data === null ? { pass: false, msg: '输入不能为空' } : { pass: true }
// 最小长度
export const minlength = (rule, data) => data.length < parseInt(rule.match(/\d+/)) ? { pass: false, msg: `最短应为${rule.match(/\d+/)}个字符` } : { pass: true }
// 最大长度
export const maxlength = (rule, data) => data.length > parseInt(rule.match(/\d+/)) ? { pass: false, msg: `最长应为${rule.match(/\d+/)}个字符` } : { pass: true }
// 最小值
export const min = (rule, data) => parseInt(data) < parseInt(rule.match(/-?\d+/)) ? { pass: false, msg: `最小值为${rule.match(/-?\d+/)}` } : { pass: true }
// // 最大值
export const max = (rule, data) => parseInt(data) > parseInt(rule.match(/-?\d+/)) ? { pass: false, msg: `最大值为${rule.match(/-?\d+/)}` } : { pass: true }
// // 手机号
export const mobile = (rule, data) => !/^[1][3456789]\d{9}$/.test(data) ? { pass: false, msg: '手机号格式不正确' } : { pass: true }
// // url
export const url = (rule, data) => !/(http|https):\/\/([\w.]+\/?)\S*/.test(data) ? { pass: false, msg: 'URL格式不正确' } : { pass: true }
// // 整数
export const int = (rule, data) => data % 1 !== 0 ? { pass: false, msg: '内容应是整数' } : { pass: true }