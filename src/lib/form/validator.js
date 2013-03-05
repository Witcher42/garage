function requireValidator (value, setting) {
    if (Array.isArray(value) && !value.length) {
        throw setting[1];
    }
    if (setting[0] && !value && value !== 0) {
        throw setting[1];
    }
}

function maxLengthValidator (value, setting) {
    if (!value || value.length > setting[0]) {
        throw setting[1];
    }
}

function minLengthValidator (value, setting) {
    if (value && value.length < setting[0]) {
        throw setting[1];
    }
}

function maxValidator (value, setting) {
    if (value > setting[0]) {
        throw setting[1];
    }
}

function minValidator (value, setting) {
    if (value < setting[0]) {
        throw setting[1];
    }
}

function formatValidator (value, setting) {
    if (setting[0] === 'email') {
        emailValidator.call(this, value, setting[1]);
    }
}

function emailValidator (value, message) {
    if (!/^[_a-z0-9\-]+(\.[_a-z0-9\-]+)*@[a-z0-9\-]+(\.[a-z0-9\-]+)*(\.[a-z]+)$/.test(value)) {
        throw message;
    }
}

function compareValidator (value, setting) {
    var fn = new Function('data', 'with(data){ return ' + setting[0] + '}');
    if (!fn.call(value, this.form.val())) {
        throw setting[1];
    }
}

module.exports = {
    required: requireValidator,
    minLength: minLengthValidator,
    maxLength: maxLengthValidator,
    max: maxValidator,
    min: minValidator,
    format: formatValidator,
    compare: compareValidator
};