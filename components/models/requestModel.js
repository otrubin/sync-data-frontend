/**
 * Created by Oleg Trubin on 10.10.2016.
 */

(function () {
    'use strict';

    class RequestModel {
        constructor(options) {
            this.url = options.url;
            this.params = options.params;
            this.responseFormat = options.responseFormat || 'text';
            this._eventsHandlers = {};
        }

        _processResponse(response) {
            switch (this.responseFormat) {
                case 'json':
                    response = JSON.parse(response);
                    break;
            }
            this.trigger('update', response);
        }

        trigger(name, response) {
            if (this._eventsHandlers[name]) {
                this._eventsHandlers[name].forEach(callback => callback(response));
            }
        }

        on(name, callback) {
            if (!this._eventsHandlers[name]) {
                this._eventsHandlers[name] = [];
            }
            this._eventsHandlers[name].push(callback);
        }

        fetch() {
            this._makeRequest('POST', this.url, this._processResponse.bind(this));
        }

        _getRequestBody() {
            let resultArr = [];
            let paramArr = this.params.split('&');
            paramArr.forEach(param => {
                let arr = param.split('=');
                arr[1] = encodeURIComponent(arr[1]);
                resultArr.push(arr.join('='))
            });
            return resultArr.join('&');
        }


        _makeRequest(method, resource, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, resource, true);

            xhr.onreadystatechange = function () {

                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status === 200) {
                    callback(xhr.responseText);
                }

            };
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            let body = this._getRequestBody();
            xhr.send(body);
        }
    }


    // export
    window.RequestModel = RequestModel;
})();