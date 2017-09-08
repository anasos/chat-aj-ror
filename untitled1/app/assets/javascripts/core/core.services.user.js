var usersServices = angular.module('userServices', ['ngRoute', 'ng-token-auth', 'storageModule', 'httpModule']);

usersServices.factory('authService', ['$auth', 'storageService', 'httpService', function($auth, storageService, httpService) {
    return {
        signIn: function (data, onSuccessCallback, onErrorCallback) {

            if (!data || !data.email || !data.password) {
                var error = App.errors["service_args_error"];
                //App.logging.error("usersServices - signIn", error, data);
                if (typeof onErrorCallback == "function")
                    onErrorCallback(error);
                return;
            }

            var onSuccess = function (profile) {

                storageService.storeUser(profile);

                if (typeof onSuccessCallback == "function")
                    onSuccessCallback.apply(null, arguments);
            }

            var onError = function () {

                //App.logging.debug("Error > usersServices - signIn", arguments);
                // Call onError callback
                if (typeof onErrorCallback == "function")
                    onErrorCallback.apply(null, arguments);
            }

            $auth.submitLogin(data).then(onSuccess).catch(onError);
        },


        logout : function() {

            var onError = function() {
                App.logging.debug("Error > usersServices - logout", arguments);
            }

            $auth.signOut().catch( onError );

            storageService.clearUser(null);
            storageService.clearAll();
        },

        signUp : function(data, onSuccessCallback, onErrorCallback) {
            debugger

            if( !data || !data.email || !data.password ) {
                //var error = App.errors["service_args_error"];
                //App.logging.error("usersServices - signUpService", error, data);
                if( typeof onErrorCallback == "function" )
                    //onErrorCallback(error);
                return;
            }

            var onSuccess = function(profile) {

                // Nothing to do for now

                if( typeof onSuccessCallback == "function" )
                    onSuccessCallback.apply(null, arguments);
            }

            var onError = function() {

                //App.logging.debug("Error > usersServices - signUpService", arguments);
                // Call onError callback
                if( typeof onErrorCallback == "function" )
                    onErrorCallback.apply(null, arguments);
            }

            $auth.submitRegistration(data).then(onSuccess).catch(onError);
        },

    }
}]);

usersServices.factory('User', ['$auth', 'storageService', 'httpService', function($auth, storageService, httpService) {
    return {
        getUser: function () {
            return storageService.getUser();
        },

        refreshUsersList : function(onSuccessCallback, onErrorCallback) {
            var onSuccess = function(response) {

                console.log("Success get users list ");

                storageService.storeObj( App.storage.users, response );

                // Call onSucces callback
                if( typeof onSuccessCallback == "function" )
                    onSuccessCallback.apply(null, arguments);
            };

            var onError = function(error) {
                console.log('error user list');
            };

            var options = {
                method: "GET",
                endpoint: "/recipients",
                requireAuth: false,
            };

            httpService.call(options,{}, onSuccess, onError);
        },

        getRecipients : function () {
            return storageService.getObj(App.storage.users);
        }
    }
}
])