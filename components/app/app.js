/**
 * Created by Oleg Trubin on 04.10.2016.
 */
(function () {
    'use strict';

    // import
    let DataTable = window.DataTable;

    let data = {
        captions: {
            ao_group_id: 'ID группы источника',
            target_service: 'Целевой сервис',
            target_id: 'ID группы целевого сервиса',
            tags: 'Теги'
        },
        rows: [
            {
                id: 1,
                data: {
                    ao_group_id: 276,
                    target_service: 'u',
                    target_id: 5968206,
                    tags: 'test1'
                }
            },
            {
                id: 2,
                data: {
                    ao_group_id: 277,
                    target_service: 'u',
                    target_id: 5968206,
                    tags: 'test1'
                }
            },
            {
                id: 3,
                data: {
                    ao_group_id: 280,
                    target_service: 'u',
                    target_id: 5968206,
                    tags: 'test2'
                }

            },
            {
                id: 4,
                data: {
                    ao_group_id: 273,
                    target_service: 'u',
                    target_id: 5968206,
                    tags: 'test2'
                }
            }
        ]
    };

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

    function removeRowOnServer(rowId) {
        //пока заглушка
        //пытаемся удалить данные на сервере,
        // в случае успеха сервер должен вернуть true
        //при неудаче false
        return true;
    }

    let dataTable = new DataTable({
        el: document.querySelector('.data-table'),
        rowTplEl: document.querySelector('.data-table__row-tpl'),
        theadTplEl: document.querySelector('.data-table__thead-tpl'),
        data,
        onRemove(tr){
            return removeRowOnServer(tr.dataset.id);
        }
    });

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

})();
