### 安装

```javascript
npm i wt-form-check -S
```
### 基本使用

1.在您的表单 dom 上，添加合适的id
```html
<input type="text" class="form-control" id="name" placeholder="姓名">
```
2.导入 check 方法, (如果需要扩展请往下看),此方法按照下方例子接收一个二维数组，需依次放入`验证规则集`，`表单数据`，`选择器id`，然后方法返回一个 `boolean` 值

```javascript
import { default as check } from 'wt-form-check'

submit() {
    if (!check([
        [['required', 'minlength(1)', 'maxlength(6)'],form.name, 'name'],
        [['required', 'minlength(1)', 'maxlength(18)'],form.password, 'password'],
        [['required', 'mobile'],form.mobile, 'mobile'],
        [['required', 'min(1)', 'max(200)', 'int'],form.age, 'age'],
        [['required', 'minlength(1)', 'maxlength(20)'],form.city, 'city'],
        [['required', 'url'],form.url, 'url'],
    ])) {
        return false
    }
    window.alert('表单验证通过')
}

```

### 扩展规则

1.导入 `extend` 方法，并且传入一个对象或者数组来扩展规则，方法返回一个扩展后的 `check` 方法

```javascript
import { extend } from 'wt-form-check'

let check = extend([
     { reg: /iswt/, method: (rule, data) => parseInt(data) !== 100 ? { pass: false, msg: '数据必须是wutong' } : { pass: true } }
])

submit() {
    if (!check([
        [['required', 'iswt'],form.name, 'name'],
        [['required', 'minlength(1)', 'maxlength(18)'],form.password, 'password'],
        [['required', 'mobile'],form.mobile, 'mobile'],
        [['required', 'min(1)', 'max(200)', 'int'],form.age, 'age'],
        [['required', 'minlength(1)', 'maxlength(20)'],form.city, 'city'],
        [['required', 'url'],form.url, 'url'],
    ])) {
        return false
    }
    window.alert('表单验证通过')
}
```