var ajaxer = {
    failCallback: null,
    successCallback: null,
    running: null,
    results: [],
    findResult: function (url) {
        let len = ajaxer.results ? ajaxer.results.length : 0;
        for (let i=0;i<len;i++) {
            if (ajaxer.results[i].url === url) {
                return ajaxer.results[i];
            }
        }
        return null;
    },
    addData: function (data) {
        if (ajaxer.results) { ajaxer.results.push(data); }
        else {ajaxer.results = []; ajaxer.results.push(data); }
    },
    clearResults: function () {
        ajaxer.results = [];
    },
    client: {
        request: null,
        headers: null,
        response: null,
        status: null,
        responseCodes: [200,400,401,402,404,405,406,409,410,429,500,501],
        hasBody: ['GET','POST','DELETE'],
        /**
         * Makes single HTTP request
         * 
         * @param {type} args
         * @returns {undefined}
         */
        call: function (args) {
            ajaxer.client.request = $.ajax({
                type: args.method,
                url: args.url,
                data: args.params,
                beforeSend: function(request) {
                    if (args.headers) {
                        let len = args.headers.length;
                        for (let i=0;i<len;i++) {
                            let keys = Object.keys(args.headers[i]);
                            keys.forEach((key, index) => {
                                request.setRequestHeader(key, args.headers[i][key]);
                            });
                        }
                    }
                },
                dataType: args.dataType,
                async: true,
                success: function(response, textStatus, xhr) {
                    if (ajaxer.client.hasBody.includes(args.method)) { ajaxer.client.response = response; }
                    else { ajaxer.client.response = null; }
                    ajaxer.client.status = xhr.status;
                    ajaxer.client.headers = xhr.getAllResponseHeaders().split(/\n/).filter(function (el) { if (el !== null) { return el;}});
                },
                error: function(xhr, textStatus, errorThrown) {
                    ajaxer.client.response = $.parseJSON(xhr.responseText);
                    ajaxer.client.status = xhr.status;
                    ajaxer.client.headers = xhr.getAllResponseHeaders().split(/\n/).filter(function (el) { if (el !== null) { return el;}});
                    console.log(textStatus, errorThrown);
                    return;
                }
            });
        },
    },
    /**
     * Single request format: {"url":"/url/or/uri/to/request", "method":"GET", "dataType":"json", "params":{"query":"string","params":"or","just":null,"for":"none"}, "headers":[{"Accept":"application/json"}]}
     * Multi request format: [...array of single request objects...]
     * 
     * @param {(Object|Array)} args
     */
    request: function (args) {
        if (args) {
            if (args instanceof Array) {
                let len = args.length;
                for (let i=0;i<len;i++) {
                    let dcg = ajaxer.client;
                    dcg.call(args[i]);
                    $.when(dcg.request).done(function () {
                        let data = {
                            url: args[i].url,
                            status:dcg.status,
                            headers:dcg.headers,
                            response:dcg.response};
                        ajaxer.addData(data);
                        if (ajaxer.successCallback) {
                            ajaxer.successCallback();
                        }
                    }).fail(function () {
                        let data = {
                            url: args[i].url,
                            status:dcg.status,
                            headers:dcg.headers,
                            response:dcg.response};
                         ajaxer.addData(data);
                        if (ajaxer.failCallback) {
                            ajaxer.failCallback();
                        }
                    });
                }
            }
            else if (args instanceof Object) {
                let dcg = ajaxer.client;
                dcg.call(args);
                $.when(dcg.request).done(function () {
                    let data = {
                        url: args.url,
                        status:dcg.status,
                        headers:dcg.headers,
                        response:dcg.response};
                    ajaxer.addData(data);
                    if (ajaxer.successCallback) {
                        ajaxer.successCallback();
                    }
                }).fail(function () {
                    let data = {
                        url: args.url,
                        status:dcg.status,
                        headers:dcg.headers,
                        response:dcg.response};
                    ajaxer.addData(data);
                    if (ajaxer.failCallback) {
                        ajaxer.failCallback();
                    }
                });
            }
            else { console.log('ERROR: Invalid arguement!'); throw 'Invalid arguement!'; }
        }
        else { console.log('ERROR: Invalid arguement!'); throw 'Invalid arguement!'; }
    }
};
