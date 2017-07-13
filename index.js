(function ($) {

    if (!$) {
        throw Error('jquery-parallel-ajax: jQuery not found');
    }

    var defalutOption = {
        type: 'GET',
        cache: true
    };

    var reqAmount = 0;
    var resList = {
        length: 0
    };
    var timeoutTimer = null;
    var timeoutDefault = 3000;

    function reqCallBackSuccess(idx, res, successCallback) {
        resList[idx] = res;
        resList.length++;
        if (resList.length === reqAmount) {
            successCallback(resList);
            clearTimeout(timeoutTimer);
        }
    }

    function reqCallBackError(idx, err, errorCallback) {
        if (resList.length === -1) {
            return;
        }
        resList.length = -1;
        console.error('reqCallBackError', {
            index: idx,
            error: err
        });
        errorCallback(err);
        clearTimeout(timeoutTimer);
    }

    function parallelAjax(options, success, error, timeout) {
        var ajaxOptions = [];
        if (options instanceof Array) {
            ajaxOptions = options;
        }
        else {
            ajaxOptions.push(options);
        }
        // set ajax amount
        reqAmount = ajaxOptions.length;
        for (var i = 0; i < ajaxOptions.length; i++) {
            (function(arg){
                // combine defalut option
                $.extend(ajaxOptions[i], defalutOption);
                // add success callback
                ajaxOptions[i].success = function (res) {
                    reqCallBackSuccess(arg, res, success);
                }
                // add fail callback
                ajaxOptions[i].error = function(err) {
                    reqCallBackError(arg, err, error);
                }
            })(i);
        }

        // do the reqests
        for (var i = 0; i < ajaxOptions.length; i++) {
            $.ajax(ajaxOptions[i]);
        }

        // set timeout
        timeoutTimer = setTimeout(function(){
            resList.length = -1;
            error({msg: 'timeout'});
        }, timeout || timeoutDefault);
    }

    $.extend({
        'parallelAjax': parallelAjax
    })
})(window.jQuery);

/* (function(global, factory) {
    if (typeof module === 'object' && module.exports) {
      module.exports = factory(global);
    } else if (typeof define === 'function') {
      define(function() { return factory(global) });
    } else factory(global);        
}(typeof window !== "undefined" ? window : this, function(window) {
   //do something...
})) */
