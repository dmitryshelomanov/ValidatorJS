import rule from "./rules";

export default class Validator 
{
    constructor (inputs, rules)
    {
        this.rule = rule;
        this.errors = [];
    }
    /**
     * ВЫзов валидирующей функции
     * @param {*поля для валидации} inputs 
     * @param {*правила} rules 
     */
    make (inputs, rules) 
    {
        for (let prop in rules) {
            let name = prop.split ('.')[0];
            let attribute = prop.split ('.')[1] ? prop.split ('.')[1] : prop.split ('.')[0];

            if (typeof inputs[name] !== "undefined") {
                let allRules = rules[prop].split ('|');
                allRules.forEach ((value) => {
                    this.callMethod (value, inputs, name, attribute);
                });
            };
        };
    }
    /**
     * 
     * @param {*значение} value 
     * @param {*все поля} inputs 
     * @param {*ключ} prop 
     * @param {*алиас} attribute 
     */
    callMethod (value, inputs, prop, attribute)
    {
        let moreParams = value.match (':') ?  value.split (':')[1] : null;
        if (typeof this[value.split (':')[0]] !== "undefined") {
            this[value.split (':')[0]] (attribute, [inputs[prop], moreParams]);
        }
    }
    /**
     * Проверка есть ли ошибки
     */
    fails ()
    {
        if (this.errors.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * Обязательное к заполнению
     * @param {*название поля} field 
     * @param {*значение} param1 
     */
    required (field, [value]) 
    {   
        if (value.length === 0) {
            this.setError (this.rule.ru['required'], field);
        }
    }

    /**
     * Если меньше заданного значения то ошибка
     * @param {*название поля} field 
     * @param {*значение, с чем сравнить} param1 
     */
    min (field, [value, num])
    {
        if (value.length < num) {
            this.setError (this.rule.ru['min'], field, num);
        }
    }

    /**Если больше заданного значения ошибка
     * 
     * @param {*название поля} field 
     * @param {*значение, с чем сравнить} param1 
     */
    max (field, [value, num])
    {
        if (value.length > num) {
            this.setError (this.rule.ru['max'], field, num);
        }
    }

    /**
     * Проверить инпут на тип почты
     * @param {*поле} field 
     * @param {*значение} param1 
     */
    email (field, [value])
    {
        if (value.match (/([@][a-z]+[\.][a-z]{2,4})/ig) === null) {
             this.setError (this.rule.ru['email'], field);
        }
    }

    /**
     * проверить одни ли числа в поле
     * @param {*поле} field 
     * @param {*значение} param1 
     */
    numbers (field, [value])
    {
        if (value.match (/[a-zА-я]+/ig) !== null) {
             this.setError (this.rule.ru['numbers'], field);
        }
    }

    /**
     * ПРоверить что бы небыло цифр
     * @param {*поле} field 
     * @param {*значение} param1 
     */
    string (field, [value])
    {
        if (value.match (/[0-9]+/ig) !== null) {
             this.setError (this.rule.ru['string'], field);
        }
    }

    /**
     * ПВпушить ошибки
     * @param {*сообщение} message 
     * @param {*поле} field 
     * @param {*атрибут после : (для min * max)} num 
     */
    setError (message, field, num = null)
    {
        let value = message.replace (/:attribute/gmi, field)
                           .replace (/:min|:max/gmi, num);
        this.errors.push (value);
    }   

    /**
     * Получить все ошибки
     */
    get getError ()
    {
        return  this.errors;
    }
    /**
     * Статический метод для внедрения зависимости во вью
     * @param {*Vue} Vue 
     */
    static install (Vue) 
    {
        let validator = new Validator ();
        Object.defineProperty(Vue.prototype, "$validatores6", {
            get () { return validator; }
        });
    }
};