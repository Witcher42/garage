var $      = require('jquery');
var Events = require('lib/event/event.js');

var Field  = require('./field.js');

function Form (config) {
    if (config) {
        this.init(config);
    }
}

Events.mixTo(Form);

Form.prototype.init = function (config) {
    var self = this;
    var $form = $(config.$el);
    var field;

    var fields = self.fields = config.fields || {};
    self.$el    = $form;

    $form.find('input[name], textarea[name], select[name]').each(function () {
        var $field = $(this);
        var name = $field.attr('name');

        if (fields[name]) {
            fields[name].$el = $(fields[name].$el).add($field);
            return;
        }

        field = new Field({
            $el : $field,
            name: name,
            form: self,
            rules: $field.data()
        });

        fields[name] = field;

        field
            .on('error', function (errors) {
                self.emit('field::'+name+'::error', errors);
                self.emit('field::*::error', name, errors);
            })
            .on('valid', function () {
                self.emit('field::'+name+'::valid');
                self.emit('field::*::valid', name);
            });
    });

    $.each(fields, function (fieldName, field) {
        (field.$el.data('validate-event') || 'blur')
            .split(',')
            .map(function (event) {
                return event.trim();
            })
            .filter(function (event) {
                return !!event;
            })
            .forEach(function (event) {
                field.$el.on(event, function () {
                    if (!field.isDisabled() && field.validate() && field.$el.data('next')) {
                        fields[field.$el.data('next')].validate();
                    }
                });
            });
    });

    $form.on('submit', function (e) {
        if (config.onSubmit) {
            return config.onSubmit(e);
        }
    });
};

Form.prototype.validate = function () {
    var error, name, field;
    this.errors = {};

    for (name in this.fields) {
        // @TODO: check is disabled
        field = this.fields[name];
        if (!field.isDisabled() && !field.validate()) {
            error = this.fields[name].error;
            this.errors[name] = error;
            this.emit('error', name, error);
        }
    }

    if (!Object.keys(this.error).length) {
        this.emit('valid');
        return true;
    } else {
        return false;
    }
};

Form.prototype.val = function () {
    var data = this.$el.serializeArray();
    var row, ret = {};
    for (var i = data.length - 1; i >= 0; i--) {
        row = data[i];
        if (ret[row.name]) {
            if (ret[row.name].push) {
                ret[row.name].push(row.value);
            } else {
                ret[row.name] = [ret[row.name], row.value];
            }
        } else {
            ret[row.name] = row.value;
        }
    }
    return ret;
};

module.exports = Form;