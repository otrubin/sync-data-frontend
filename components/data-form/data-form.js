/**
 * Created by Oleg Trubin on 05.10.2016.
 */
(function () {
    "use strict";

    //компонент под css - bootstrap
    class DataForm {
        constructor(options) {
            this.el = options.el;
            this.formFields = options.formFields;
            this.onSubmit = options.onSubmit; // функция, которую надо вызвать при отправке
            this._isInline = options.isInline || true;
            this._btnCaption = options.btnCaption || 'Отправить';
            this._init();
            this._initEvents();
        }

        _init() {
            this.render();
        }

        _initEvents() {
            this.el.addEventListener('click', this._onClick.bind(this));
        }

        _resetErrorState() {
            //снимаем красную рамку с инпутов
            let formGroups = this.el.querySelectorAll('.form-group');
            Array.prototype.forEach.call(formGroups, item => {
                item.classList.remove('has-error')
            });
            //прячем сообщение об ошибке
            this.el.querySelector('.data-form__error').classList.add('hidden');
        }

        _showErrorMessage(msg) {
            let errorEl = this.el.querySelector('.data-form__error');
            errorEl.innerHTML = msg;
            errorEl.classList.remove('hidden');
        }

        _checkFields() {
            let inputs = this.el.querySelectorAll('.data-form__input');
            let isSuccess = true;
            Array.prototype.forEach.call(inputs, input => {
                if (input.dataset.required) {
                    let value = input.value;
                    if (!value) {
                        isSuccess = false;
                        input.parentElement.classList.add('has-error');//для div.form-group (bootstrap)
                    }
                }
            });
            return isSuccess;
        }

        _onClick(event) {
            event.preventDefault();
            let target = event.target;

            if (target.classList.contains('data-form__btn-submit')) {
                this._resetErrorState();
                if (!this._checkFields()) {
                    this._showErrorMessage('Не все обязательные поля заполнены');
                    return;
                }
                this.onSubmit(this);
            }
        }

        _createFormGroup(field) {
            let formGroup = document.createElement('div');
            formGroup.classList.add('form-group');

            let inp = document.createElement('input');
            inp.setAttribute('type', 'text');
            inp.setAttribute('placeholder', field.caption);
            inp.setAttribute('name', field.fieldName);
            if (field.required) {
                inp.setAttribute('data-required', field.required);
            }
            inp.classList.add('form-control');
            inp.classList.add('data-form__input');

            formGroup.appendChild(inp);

            return formGroup;
        }


        render() {
            this._form = document.createElement('form');
            if (this._isInline) {
                this._form.classList.add('form-inline');
            }

            this.formFields.forEach(field => {
                let formGroup = this._createFormGroup(field);
                this._form.appendChild(formGroup);
            });

            let btn = document.createElement('button');
            btn.classList.add('data-form__btn-submit');
            btn.classList.add('btn');
            btn.classList.add('btn-primary');
            btn.innerHTML = this._btnCaption;
            this._form.appendChild(btn);

            this.el.appendChild(this._form);
        }

        getFieldValue(fieldName) {
            return this.el.querySelector(`[name="${fieldName}"]`).value;
        }
    }

    // export
    window.DataForm = DataForm;

})();