App.storage = {};

App.storage.conversations = "Conversations";

App.storage.belongs_conversations = "BelongsConversations";

App.storage.own_conversations = "OwnConversations";

App.storage.users = "users";

App.storage.user = "User";

App.storage.module = angular.module('storageModule');

App.storage.userKey = "userProfile";

App.storage.module.factory('storageService', ['localStorageService', function(localStorageService) {
    return {
        store : function(key, value) {
            if( !key ) return false;
            localStorageService.set( key, value );
            return true;
        },
        get : function(key) {
            if( !key ) return null;
            return localStorageService.get( key );
        },
        storeObj : function(key, value) {
            if( !key || typeof value != 'object' ) return false;

            if( !value ) {
                this.store( key, null );
            } else {
                this.store( key, value );
            }

            return true;
        },
        getObj : function(key) {
            if( !key ) return null;
            var strObj = this.get( key );
            return strObj;
        },
        storeUser : function(newUser) {
            return this.storeObj(App.storage.userKey, newUser);
        },
        getUser : function() {
            return this.getObj(App.storage.userKey);
        },
        clearUser : function() {
            return this.storeObj(App.storage.userKey, null);
        },
        clearAll : function() {
            localStorageService.clearAll();
        }
    }
} ]);

App.storage.module.config(['localStorageServiceProvider', function config(localStorageServiceProvider) {

    localStorageServiceProvider
        .setPrefix('GC')
        .setStorageType('localStorage')
        .setDefaultToCookie(false)
        .setNotify(true, true);
}
]);

// Events
App.storage.module.run( ['$rootScope', function($rootScope) {

    $rootScope.$on("LocalStorageModule.notification.setitem", function(event, args) {

        $rootScope.$broadcast("app:storage-change", args);

    });

} ] )