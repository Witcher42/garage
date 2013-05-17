var $      = require('jquery');
var Field  = require('./field.js');

function Form (config) {
    if (config) {
        this.init(config);
    }
}

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
                    if (!field.$el.is(':disabled')) {
                        field.validate();
                    }
                });
            });
    });

    $form.on('submit', function (e) {
        if (!self.validated) {
            self.validate()
                .done(function () {
                    $form.submit();
                });

            return false;
        }

        if (config.onSubmit) {
            return config.onSubmit.call(self, e);
        }

        if (!!Object.keys(self.errors).length) {
            return false;
        }
    });
};

Form.prototype.validate = function () {
    var self   = this;
    var defers = {};

    this.validated = true;
    this.error = {};

    var deferList = $.map(this.fields, function (field, name) {
        // @TODO: check is disabled
        if (!field.$el.is(':disabled')) {
            defers[name] = field.validate()
                .fail(function () {
                    self.error[name] = field.error;
                });

            return defers[name];
        }
    });

    return $.when.call($, deferList)
        .done(function () {
            self.$el.trigger('valid.form');
        })
        .fail(function () {
            self.$el.trigger('error.form');
        });
};

Form.prototype.getValues = function () {
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