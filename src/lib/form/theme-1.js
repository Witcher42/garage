var SuperForm = require('./form');
function Form (config) {
    var self = this;

    if (config) {
        this.init(config);
    }

    this.$el
        .on('error.field', function (e, field, errors) {
            var $field = self.$el.find('[name='+field+']');
            $field.addClass('error');

            var $tipSpan = self.$el.find($field.data('tip-span'));
            if (!$tipSpan.data('error-field')) {
                $tipSpan
                    .data('error-field', field)
                    .text(errors[Object.keys(errors)[0]])
                    .addClass('error');
            }
        })
        .on('valid.field', function (e, field) {
            var $field = self.$el.find('[name='+field+']');
            $field.removeClass('error');
            var $tipSpan = self.$el.find($field.data('tip-span'));

            if ($tipSpan.data('error-field') === field) {
                $tipSpan
                    .data('error-field', null)
                    .text('')
                    .removeClass('error');
            }
        });
}

Form.prototype = new SuperForm();
Form.prototype.construct = Form;

module.exports = Form;