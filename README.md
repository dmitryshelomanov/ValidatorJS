# ValidatorJS
## Вызов
```js
let validator = new Validator ();
validator.make (inputs, {
  //rules
  name: 'requaired|min:6' // правила для инпутов (инпутов обьект)
});
```
```js
// есть ли ошибки
validator.fails ();
// показать ошибки
validator.getErrors;
```
