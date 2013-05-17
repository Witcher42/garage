var Validator = require('./validator');
var $ = require('jquery');

function Field (config) {
    var self = this;

    this.name   = config.name;
    this.form   = config.form || null;
    this.rules  = config.rules || {};
    this.$el    = $(config.$el);
    this.error = {};

    var next = this.$el.data('next');

    if (next) {
        this.$el.on('valid.field', function () {
            self.form.fields[next].validate();
        });
    }
}

module.exports = Field;

Field.prototype.validate = function () {
    var self  = this;
    var rules = this.rules;
    var value = this.getValue();

    // clean errors
    this.error = {};

    var defers = $.map(rules, function (setting, name) {
        return Validator.call(self, name, value, setting[1], setting[0])
            .fail(function (value, msg) {
                self.error[name] = msg;
            })
    });

    return $.when.apply($, defers)
        .done(function () {
            self.$el.trigger('valid.field', self.name);
        })
        .fail(function () {
            self.$el.trigger('error.field', [self.name, self.error]);
        });
};

Field.prototype.isInvalid = function () {
    return !!Object.keys(this.error).length;
};

Field.prototype.getValue = function () {
    var ret = this.$el.serializeArray().map(function (row) {
        return row.value;
    });

    if (this.$el.size() === 1 && !this.$el.is(':checkbox') && !this.$el.is('select[multiple]')) {
        ret = ret[0];
    } else {
        ret = ret.filter(function (row) {
            return !!row;
        });
    }

    return ret;
};