let inputs = {
    name: '',
    age: '19'
};

let rule = {
    min: 'значение :attribute меньше :min',
    max: 'значение :attribute не должно быть больше чем :max',
    required: 'значение :attribute обязательно',
};

class Validator 
{
    constructor ()
    {
        this.rule = rule;
        this.errors = [];
    }

    make (inputs, rules) 
    {
        for (let prop in rules) {
            if (typeof inputs[prop] !== "undefined") {
                let allRules = rules[prop].split ('|');
                allRules.forEach ((value) => {
                    this.callMethod (value, inputs, prop);
                });
            };
        };
    }

    callMethod (value, inputs, prop)
    {
        let moreParams = value.match (':') ?  value.split (':')[1] : null;
        this[value.split (':')[0]] (prop, [inputs[prop], moreParams]);
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
            this.setError (this.rule['required'], field);
        }
    }

    min (field, [value, num])
    {
        if (value.length < num) {
            this.setError (this.rule['min'], field, num);
        }
    }

    max (field, [value, num])
    {
        if (value.length > num) {
            this.setError (this.rule['max'], field, num);
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

let validator = new Validator ();

validator.make (inputs, {
    name: 'required|min:6',
    age: 'required|min:6'
});

if (validator.fails) {
    console.log (validator.getError);
}