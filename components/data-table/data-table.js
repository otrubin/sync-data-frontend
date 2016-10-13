/**
 * Created by Oleg Trubin on 04.10.2016.
 */
(function () {
    'use strict';

    class DataTable {
        constructor(options) {
            this.el = options.el;
            this.data = {};
            this.captions = options.captions;
            this.rowTplEl = options.rowTplEl;
            this.theadTplEl = options.theadTplEl;
            this._eventsHandlers = {};

            this._init();
            this._initEvents();
        }

        _init() {
            this._tbody = this.el.querySelector('.data-table__tbody');
            this._thead = this.el.querySelector('.data-table__thead');
            this._initThead();
        }

        _initThead() {
            let tplFunc = Handlebars.compile(this.theadTplEl.innerHTML);
            this._thead.innerHTML = tplFunc(this.captions);
        }

        _initEvents() {

            this.el.addEventListener('click', this._onClick.bind(this));
        }

        trigger(name, data) {
            if (this._eventsHandlers[name]) {
                this._eventsHandlers[name](data);
            }
        }

        on(name, callback) {
            this._eventsHandlers[name] = callback;
        }

        _onClick(event) {
            event.preventDefault();
            if (event.target.classList.contains('data-table__remove')) {
                if (!confirm('Удалить задачу?')) {
                    return;
                }
                let id = event.target.parentElement.parentElement.dataset.id;
                this.trigger('remove', {id});//элемент -> ячейка -> строка
            }
        }


        /**
         * Добавляем элемент в таблицу
         * @param {Object} row
         */
        addRow(row) {
            this.data.rows.unshift(row);
            this.render();
        }

        /**
         * Удаляем элемент из таблицы
         * @param {number} row_id
         */
        removeRow(row_id) {
            for (let i = 0; i < this.data.rows.length; i++) {
                if (this.data.rows[i].id == row_id) {
                    this.data.rows.splice(i, 1);
                    break;
                }
            }
            this.render();
        }

        render(data) {
            if (data) {
                this.data.rows = data;
            }
            let tplFunc = Handlebars.compile(this.rowTplEl.innerHTML);
            this._tbody.innerHTML = tplFunc(this.data);
        }

    }


    // export
    window.DataTable = DataTable;
})();