import { required, minlength, maxlength, min, max, mobile, url, int } from './baseRule.js'
const wtFormCheck = (formArr) => {
  console.log(maps)
  clean()//初始化
  let result = []//定义验证结果集
  for (let formItem of formArr) {
    let [rules, data, domID] = formItem
    let itemPass = true
    for (let rule of rules) {
      for (let map of maps) {
        if(!map.reg){
          return console.error('Please strictly follow the @wutong example to extend the rule')
        }
        if (map.reg.test(rule) && itemPass) {
          let res = map.method(rule, data)
          itemPass = res.pass || false
          if (!itemPass && res.msg) {
            msg(domID, res.msg)
          }
        }
      }
    }
    result.push(itemPass)
  }
  for (let pass of result) {//断言
    if (!pass) {
      return false
    }
  }
  return true
}

// 规则与方法的映射集合
const maps = [
  { reg: /required/, method: required },
  { reg: /minlength\(\d+\)/, method: minlength },
  { reg: /maxlength\(\d+\)/, method: maxlength },
  { reg: /max\(-?\d+\)/, method: max },
  { reg: /min\(-?\d+\)/, method: min },
  { reg: /mobile/, method: mobile },
  { reg: /url/, method: url },
  { reg: /int/, method: int }
]
// `__formCheckMsg__` 这个类名请不要在普通dom中使用了
//清空提示
const clean = () => {
  let msgDomArr = [...document.getElementsByClassName('__formCheckMsg__')]
  if (msgDomArr.length > 0) {
    for (let item of msgDomArr) {
      item.parentNode.removeChild(item)
    }
  }
}
//提示
const msg = (domID, msg) => {
  let formDom = document.getElementById(domID)
  let msgDom = document.createElement('span')
  const after = (newElement, targetElement) => {
    var parent = targetElement.parentNode
    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement)
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling)
    }
  }
  msgDom.style.color = 'red'
  msgDom.style.fontSize = '13px'
  msgDom.className = '__formCheckMsg__'
  msgDom.innerText = msg
  after(msgDom, formDom)
}
export default wtFormCheck
export const extend=(args)=>{
  if(Array.isArray(args)){
    maps.push(...args)
  }else{
    maps.push(args)
  }
  return wtFormCheck
}