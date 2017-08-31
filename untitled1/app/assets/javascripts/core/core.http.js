App.http = {};
App.http.statusCode = {
    404: function() {
        App.logging.error(App.errors["endpoint_not_found"].message);
    }
};
App.http.timeout = 5 * 60 * 1000;

App.http.module = angular.module('httpModule');

App.http.module.factory('httpService', ['$rootScope', '$http', '$auth', function($rootScope, $http, $auth) {
    return {
        call : function(options, data, onSuccess, onError) {
            var serverPath = App.http["server"] ? App.http["server"] : document.location.origin;
            var headers = {};

            if( typeof options.endpoint != "string" ) {
                App.logging.error(App.errors["missing_endpoint"].message);
                onError(App.errors["missing_endpoint"]);
                return;
            }

            if( typeof options.method != "string" ) {
                App.logging.error(App.errors["missing_http_method"].message);
                onError(App.errors["missing_http_method"]);
                return;
            }

            options.method = options.method.toUpperCase();

            if( options.requireAuth ) {
                // Add access token to header OR data
                if( options.customAuth ) {
                    headers = options.customAuth;
                } else {
                    headers = $auth.retrieveData('auth_headers');
                }

                if( !headers || Object.keys(headers).length == 0 ) {
                    App.logging.error(App.errors["auth_err_service"].message);
                    onError(App.errors["auth_err_service"]);
                    return;
                }
            }

            $http({
                method: options.method,
                data: options.method == "GET" ? data : JSON.stringify(data),
                url: serverPath + options.endpoint,
                headers: headers,
                timeout : App.http.timeout,
            }).then(function mySuccess(response) {
                onSuccess(response.data);
            }, function myError(response) {
                onError({ code : response.statusText, message : response });
            });

            // $.ajax({
            //     contentType: 'application/json',
            //     data: options.method == "GET" ? data : JSON.stringify(data),
            //     processData: options.method != "POST",
            //     dataType: 'json',
            //     type: options.method,
            //     method: options.method,
            //     url: serverPath + options.endpoint,
            //     success: function(data, textStatus, jqXHR) {
            //         $rootScope.safeApply( function () {
            //             onSuccess(data);
            //         } );
            //     },
            //     error: function(jqXHR, textStatus, errorThrown) {
            //         App.logging.error(App.errors["server_error"].message, {"textStatus" : textStatus, "errorThrown" : errorThrown});
            //
            //         // To do : filter errors before call callback
            //
            //         onError({ code : textStatus, message : errorThrown });
            //     },
            //     beforeSend: function(jqXHR, settings) {
            //         // To do : Check connectivity
            //         if( typeof $rootScope.safeApply == "function" ) {
            //             $rootScope.safeApply( function() {
            //                 $rootScope.$broadcast("network-loading-start", {});
            //             } );
            //         }
            //     },
            //     complete: function(jqXHR, textStatus) {
            //
            //         if( typeof $rootScope.safeApply == "function" ) {
            //             $rootScope.safeApply( function() {
            //                 $rootScope.$broadcast("network-loading-end", {});
            //             } );
            //         }
            //     },
            //     headers : headers,
            //     statusCode : App.http.statusCode,
            //     timeout : App.http.timeout,
            // });
        }
    }
} ]);