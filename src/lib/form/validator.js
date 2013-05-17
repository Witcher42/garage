var $ = require('jquery');

module.exports = function (rule, value, msg, setting) {
    var defer = $.Deferred();

    if (map[rule]) {
        map[rule].call(this, defer, value, msg, setting);
    } else {
        defer.resolve(value, msg, setting);
    }

    return defer.promise();
};

var map = {
    required: requireValidator,
    minLength: minLengthValidator,
    maxLength: maxLengthValidator,
    max: maxValidator,
    min: minValidator,
    format: formatValidator,
    compare: compareValidator
};

function requireValidator (defer, value, msg, setting) {
    if (
        setting &&
        ((Array.isArray(value) && !value.length) || (!value))
    ) {
        return defer.reject(value, msg, setting);
    }

    defer.resolve(value, msg, setting);
}

function maxLengthValidator (defer, value, msg, setting) {
    if (!value || value.length > setting) {
        defer.reject(value, msg, setting);
    } else {
        defer.resolve(value, msg, setting);
    }
}

function minLengthValidator (defer, value, msg, setting) {
    if (value && value.length < setting) {
        defer.reject(value, msg, setting);
    } else {
        defer.resolve(value, msg, setting);
    }
}

function maxValidator (defer, value, msg, setting) {
    if (value > setting) {
        defer.reject(value, msg, setting);
    } else {
        defer.resolve(value, msg, setting);
    }
}

function minValidator (defer, value, msg, setting) {
    if (value < setting) {
        defer.reject(value, msg, setting);
    } else {
        defer.resolve(value, msg, setting);
    }
}

function formatValidator (defer, value, msg, setting) {
    if (setting === 'email') {
        if (!/^[_a-z0-9\-]+(\.[_a-z0-9\-]+)*@[a-z0-9\-]+(\.[a-z0-9\-]+)*(\.[a-z]+)$/.test(value)) {
            defer.reject(value, msg, setting);
        } else {
            defer.resolve(value, msg, setting);
        }
    }
}

function compareValidator (defer, value, msg, setting) {
    var fn = new Function('data', 'with(data){ return ' + setting + '}');
    if (!fn.call(value, this.form.getValues())) {
        defer.reject(value, msg, setting);
    }
}