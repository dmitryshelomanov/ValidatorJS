# ValidatorJS
## Вызов

```js
let validator = new Validator ();
validator.make (inputs, {
  //rules
  name.alias: 'requaired|min:6' // правила для инпутов (инпутов обьект)
})
```
```js
//возможные проверки
ru: {
    min: 'значение :attribute меньше :min',
    max: 'значение :attribute не должно быть больше чем :max',
    required: 'значение :attribute обязательно',
    email: 'значение :attribute должно быть типом email',
    numbers: 'значение :attribute должно содержать только числа',
    string: 'значение :attribute должно содержать только буквы',
},
eng: {
    
}
```
```js
// есть ли ошибки
validator.fails ();
// показать ошибки
validator.getErrors;
```
## валидатор можно использовать с vue (nuxt)
```js
import Vue from "vue";
import validator from "validatores6";
Vue.use(validator);
// теперь методы доступны через
this.$validatores6 // this.$validatores6.make() и тд
```