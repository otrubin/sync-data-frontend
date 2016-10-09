/**
 * Created by Oleg Trubin on 04.10.2016.
 */
(function () {
    'use strict';

    class DataTable {
        constructor(options) {
            this.el = options.el;
            this.data = options.data;
            this.rowTplEl = options.rowTplEl;
            this.theadTplEl = options.theadTplEl;
            this._onRemove = options.onRemove;

            this._init();
            this._initEvents();
        }

        _init() {
            this._tbody = this.el.querySelector('.data-table__tbody');
            this._thead = this.el.querySelector('.data-table__thead');
            this._initThead();
            this.render();
        }

        _initThead() {
            let tplFunc = Handlebars.compile(this.theadTplEl.innerHTML);
            this._thead.innerHTML = tplFunc(this.data.captions);
        }

        _initEvents() {

            this.el.addEventListener('click', this._onClick.bind(this));
        }

        _onClick(event) {
            event.preventDefault();
            if (event.target.classList.contains('data-table__remove')) {
                this.removeRow(event.target.parentElement.parentElement);//элемент -> ячейка -> строка
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
         * @param {Object} tr
         */
        removeRow(tr) {
            if (!confirm('Удалить задачу?')) {
                return;
            }
            if (this._onRemove(tr)) {
                for (let i = 0; i < this.data.rows.length; i++) {
                    if (this.data.rows[i].id == tr.dataset.id) {
                        this.data.rows.splice(i, 1);
                        break;
                    }
                }
                this.render();
            }
        }

        render() {
            if (!this.data) {
                return;
            }
            let tplFunc = Handlebars.compile(this.rowTplEl.innerHTML);
            this._tbody.innerHTML = tplFunc(this.data);
        }

    }


    // export
    window.DataTable = DataTable;
})();