/**
 * Created by Oleg Trubin on 10.10.2016.
 */

(function () {
    'use strict';

    class RequestModel {
        constructor({resource, data = {}}) {
            this._resourse = resource;
            this._data = data;
            this._eventsHandlers = {};
        }

        getData() {
            return this._data;
        }

        setData(data) {
            this._data = data;
            this.trigger('update');
        }

        trigger(name) {
            if (this._eventsHandlers[name]) {
                this._eventsHandlers[name].forEach(callback => callback());
            }
        }

        on(name, callback) {
            if (!this._eventsHandlers[name]) {
                this._eventsHandlers[name] = [];
            }

            this._eventsHandlers[name].push(callback);
        }

        fetch() {
            this._makeRequest('GET', this._resourse, this.setData.bind(this));
        }


        _makeRequest(method, resource, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, resource, true);

            xhr.onreadystatechange = function () {

                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status === 200) {
                    callback(JSON.parse(xhr.responseText));
                }

            };

            xhr.send();
        }
    }


    // export
    window.Model = RequestModel;
})();