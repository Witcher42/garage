var Validator = require('./validator');
var EventEmitter = require('lib/event/event');
var $ = require('jquery');

function Field (config) {
    this.name   = config.name;
    this.form   = config.form || null;
    this.rules  = config.rules || {};
    this.$el    = $(config.$el);
    this.error = {};

    var disabled = this.$el.is(':disabled');

    this.enable = function () {
        disabled = false;
    }
    this.disable = function () {
        disabled = true;
    }
    this.isDisabled = function () {
        return disabled;
    }
}

EventEmitter.mixTo(Field);

Field.prototype.validate = function (cb, failCb) {
    var self  = this;
    var rules = this.rules;
    var value = this.val();
    var r, value, defer, defers = {};
    // clean errors
    this.error = {};
    for (r in rules) {
        if (rules.hasOwnProperty(r) && Validator[r]) {
            try {
                defer = Validator[r].call(this, value, rules[r]);
                if (defer) {
                    defers[r] = defer;
                    break;
                }
            } catch (ex) {
                this.error[r] = ex.message || ex;
                break;
            }
        }
    }

    if (Object.keys(defers).length) {
        $.each(defers, function (rule, defer) {
            defer
                .done(function () {
                    self.emit('valid', value);
                })
                .fail(function (ex) {
                    self.emit('error', rule, ex.message || ex);
                });
        })
        return $.when.apply($, defers);
    }

    if (!this.isInvalid()) {
        this.emit('valid', value);
        return true;
    } else {
        this.emit('error', this.errors);
        return false;
    }
};

Field.prototype.isInvalid = function () {
    return !!Object.keys(this.error).length;
}

Field.prototype.val = function () {
    var ret = this.$el.serializeArray().map(function (row) {
        return row.value;
    });

    if (this.$el.size() === 1 && !this.$el.is(':checkbox') && !this.$el.is('select[multiple]')) {
        ret = ret[0];
    } else {
        ret = ret.filter(function (row) {
            return row !== "";
        });
    }

    return ret;
};

module.exports = Field;