import { default as check } from '../index.js'
/* 需要扩展规则？ 请查看下面的例子 ，导入 extend 方法，调用这个方法将返回一个扩展规则后的check */
// import { extend } from '../index.js'
// let check = extend([
//     { reg: /iswt/, method: (rule, data) => parseInt(data) !== 100 ? { pass: false, msg: '数据必须是wutong' } : { pass: true } }
// ])
new Vue({
    el: '#app',
    data: {
        form: {
            name: '',
            password: '',
            mobile: '',
            age: '',
            city: '',
            url: ''
        }

    },
    methods: {
        submit() {
            if (!check([
                [['required', 'minlength(1)', 'maxlength(6)'], this.form.name, 'name'],
                [['required', 'minlength(1)', 'maxlength(18)'], this.form.password, 'password'],
                [['required', 'mobile'], this.form.mobile, 'mobile'],
                [['required', 'min(1)', 'max(200)', 'int'], this.form.age, 'age'],
                // [['required', 'iswt'], this.form.age, 'age'],
                [['required', 'minlength(1)', 'maxlength(20)'], this.form.city, 'city'],
                [['required', 'url'], this.form.url, 'url'],
            ])) {
                return false
            }
            window.alert('表单验证通过')
        }
    }
})