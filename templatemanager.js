/* global $, _ */

(function (global) {
    'use strict';

    var _TemplateManager = global.TemplateManager;

    function TemplateManager() {
        return {
            cache: {},

            template: function (path) {

                var _this = this,
                    deferred = new $.Deferred(),
                    resolvePromise = function (template) {
                        deferred.resolveWith( null, [  _.template( template ) ] );
                    };

                if (_this.cache[path]) {
                    resolvePromise( _this.cache[path] );
                } else {
                    $.ajax({
                        url: path,
                        success: function (data) {
                            _this.cache[path] = data;
                            resolvePromise( data );
                        },
                        error: function () {
                            deferred.reject();
                        }
                    });
                }

                return deferred.promise();
            },

            noConflict: function () {
                global.TemplateManager = _TemplateManager;
                return TemplateManager;
            }
        };
    }

    global.TemplateManager = TemplateManager;

})(window);
