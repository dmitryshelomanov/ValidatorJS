import rule from "./rules";

export default class Validator 
{
    constructor (inputs, rules)
    {
        this.rule = rule;
        this.errors = [];
        this.make (inputs, rules);
    }

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

    callMethod (value, inputs, prop, attribute)
    {
        let moreParams = value.match (':') ?  value.split (':')[1] : null;
        if (typeof this[value.split (':')[0]] !== "undefined") {
            this[value.split (':')[0]] (attribute, [inputs[prop], moreParams]);
        }
    }

    fails ()
    {
        if (this.errors.length > 0) {
            return true;
        }
        return false;
    }

    required (field, [value]) 
    {   
        if (value.length === 0) {
            this.setError (this.rule.ru['required'], field);
        }
    }

    min (field, [value, num])
    {
        if (value.length < num) {
            this.setError (this.rule.ru['min'], field, num);
        }
    }

    max (field, [value, num])
    {
        if (value.length > num) {
            this.setError (this.rule.ru['max'], field, num);
        }
    }

    email (field, [value])
    {
        if (value.match (/([@][a-z]+[\.][a-z]{2,4})/ig) === null) {
             this.setError (this.rule.ru['email'], field);
        }
    }

    numbers (field, [value])
    {
        if (value.match (/[a-zА-я]+/ig) !== null) {
             this.setError (this.rule.ru['numbers'], field);
        }
    }

    string (field, [value])
    {
        if (value.match (/[0-9]+/ig) !== null) {
             this.setError (this.rule.ru['string'], field);
        }
    }

    setError (message, field, num = null)
    {
        let value = message.replace (/:attribute/gmi, field)
                           .replace (/:min|:max/gmi, num);
        this.errors.push (value);
    }

    get getError ()
    {
        return  this.errors;
    }
};