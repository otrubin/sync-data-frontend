/**
 * Created by Oleg Trubin on 04.10.2016.
 */
(function () {
    'use strict';

    // import
    let RequestModel = window.RequestModel;
    let DataTable = window.DataTable;
    let DataForm = window.DataForm;


    let formFields = [
        {
            fieldName: 'ao_group_id',
            caption: 'ID группы источника',
            required: true
        },
        {
            fieldName: 'target_service',
            caption: 'Целевой сервис',
            required: true
        },
        {
            fieldName: 'target_id',
            caption: 'ID группы целевого сервиса',
            required: true
        },
        {
            fieldName: 'tags',
            caption: 'Тэги'
        }
    ];

    function addRowOnServer(data) {
        //пока заглушка
        //пытаемся добавить данные на сервере,
        // в случае успеха сервер должен вернуть id добавленной строки
        //при неудаче null
        return 5;
    }


    class App {

        constructor(options) {
            this._table = null;
            this._init();
        }

        _init() {
            this._table = new DataTable({
                el: document.querySelector('.data-table'),
                rowTplEl: document.querySelector('.data-table__row-tpl'),
                theadTplEl: document.querySelector('.data-table__thead-tpl'),
                captions: {
                    ao_group_id: 'ID группы источника',
                    target_service: 'Целевой сервис',
                    target_id: 'ID группы целевого сервиса',
                    tags: 'Теги'
                }
            });
            this._table.on('remove', this.removeRowOnServer.bind(this));
            this.listRowsFromServer();
        }

        /**
         * пытаемся удалить данные на сервере, в случае успеха сервер должен вернуть true, при неудаче false
         * @param rowId
         * @returns {boolean}
         */
        removeRowOnServer(option) {
            let requestModel = new RequestModel({
                url: 'taskAjax.php',
                params: 'action=remove&id=' + option.id,
                responseFormat: 'json'
            });
            requestModel.on('update', function (response) {
                if (response.success) {
                    this._table.removeRow(response.rowId);
                }
            }.bind(this));
            requestModel.fetch();
        }

        _renderTable(response) {
            if (response.success) {
                this._table.render(response.list);
            }
        }

        listRowsFromServer() {
            let requestModel = new RequestModel({
                url: 'taskAjax.php',
                params: 'action=list',
                responseFormat: 'json'
            });
            requestModel.on('update', this._renderTable.bind(this));
            requestModel.fetch();
        }
    }

    let app = new App();


    /*    let dataTable = new DataTable({
        el: document.querySelector('.data-table'),
        rowTplEl: document.querySelector('.data-table__row-tpl'),
        theadTplEl: document.querySelector('.data-table__thead-tpl'),
        data,
        onRemove(tr){
            return removeRowOnServer(tr.dataset.id);
        }
     });*/

    let dataForm = new DataForm({
        el: document.querySelector('.add-form'),
        isInline: true,
        btnCaption: 'Добавить',
        formFields,
        onSubmit(dataForm){
            let data = {
                ao_group_id: dataForm.getFieldValue('ao_group_id'),
                target_service: dataForm.getFieldValue('target_service'),
                target_id: dataForm.getFieldValue('target_id'),
                tags: dataForm.getFieldValue('tags')
            };

            let id = addRowOnServer(data);
            if (id) {
                let row = {id, data};
                dataTable.addRow(row);
            }

        }
    });


    let btnTest = document.querySelector('.btn__test');
    btnTest.addEventListener('click', function (event) {
        let requestModel = new RequestModel({
            url: 'taskAjax.php',
            params: 'action=add&ao_group_id=555',
            responseFormat: 'text'
        });
        requestModel.on('update', function (response) {
            console.log(response);
        });
        requestModel.fetch();
    });

})();
