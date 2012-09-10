/**
 * global (jQuery, alert)
 * @global {jQuery}
 */
(function ($) {
    "use strict";

    $.getJSON("app.json", null, function (response) {
        if (Object.prototype.toString.call(response) === "[object Object]") {
            if (undefined !== response.js && response.js.length) {
                var scriptPath, script;
                for (scriptPath in response.js) {
                    if (response.js.hasOwnProperty(scriptPath)) {
                        script          = document.createElement('script');
                        script.type     = 'text/javascript';
                        script.src      = response.js[scriptPath];
                        document.body.appendChild(script);

                    }
                }
            }
        }
    });

})(window.jQuery);