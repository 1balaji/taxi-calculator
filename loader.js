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
            if (undefined !== response.css && response.css.length) {
                var cssPath;
                for (cssPath in response.css) {
                    if (response.css.hasOwnProperty(cssPath)) {
                        document.body.appendChild('<link href="' + response.css[cssPath] + '" type="text/css" rel="stylesheet">');
                    }
                }
            }
        }
    });

})(window.jQuery);