var SuperForm = require('./form');
function Form (config) {
    var self = this;

    if (config) {
        this.init(config);
    }
    this
        .on('field::*::error', function (field, errors) {
            var $field = self.$el.find('[name='+field+']');
            $field.addClass('error');
            self.$el
                .find($field.data('tip-span'))
                    .text(errors[Object.keys(errors)[0]])
                    .addClass('error');
        })
        .on('field::*::valid', function (field) {
            var $field = self.$el.find('[name='+field+']');
            $field.removeClass('error');
            self.$el
                .find($field.data('tip-span'))
                    .text('')
                    .removeClass('error');
        });
}

Form.prototype = new SuperForm();
Form.prototype.construct = Form;

module.exports = Form;