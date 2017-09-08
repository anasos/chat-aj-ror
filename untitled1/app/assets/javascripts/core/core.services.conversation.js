/**
 * Created by anas on 24/07/17.
 */
var conversationServices = angular.module('conversationServices', ['httpModule', 'storageModule', 'ng-token-auth']);
conversationServices.factory('Conversation',['httpService', 'storageService', '$rootScope',
    function(httpService, storageService, $rootScope) {
        return {

            topic : {},

            create : function(serviceOptions, onSuccessCallback, onErrorCallback) {
                debugger;
                var conversation = Object.assign( {}, serviceOptions.conversation );

                var onSuccess = function(resData) {

                    console.log("Success ");
                    var conversations = storageService.getObj(App.storage.conversations);
                    var belongs_conversations = storageService.getObj(App.storage.belongs_conversations);
                    if( !(conversations instanceof Array) ) conversations = [];
                    if( !(belongs_conversations instanceof Array) ) belongs_conversations = [];
                    conversations[Object.keys(conversations).length] = resData.conversation;
                    belongs_conversations[Object.keys(belongs_conversations).length] = resData.conversation;
                    storageService.storeObj(App.storage.conversations, conversations);
                    storageService.storeObj(App.storage.belongs_conversations, belongs_conversations);

                    // Call onSucces callback
                    if( typeof onSuccessCallback == "function" )
                        onSuccessCallback.apply(null, arguments);
                };

                var onError = function(error) {
                    // To do
                    //App.logging.debug(error);
                    // Call onError callback
                    if( typeof onErrorCallback == "function" )
                        onErrorCallback.apply(null, arguments);
                };

                var options = {
                    method: "POST",
                    endpoint: "/conversation",
                    requireAuth: false,
                };

                httpService.call(options, { conversation : conversation }, onSuccess, onError);
            },

            update : function(serviceOptions, onSuccessCallback, onErrorCallback) {

                var conversation = Object.assign( {}, serviceOptions.conversation);
                var self = this

                var onSuccess = function(resData) {

                    console.log("Success ");
                    var conversations = storageService.getObj(App.storage.conversations);
                    var conversationIndex = conversations.findIndex(obj => obj.id == resData.id);
                    if( conversationIndex > -1 ) {
                        conversations[conversationIndex] = resData;
                        self.topic = conversations[conversationIndex];
                        console.log("before :",self.topic);
                        $rootScope.$broadcast("app:current-topic-change", self.topic);
                    }

                    storageService.storeObj(App.storage.conversations, conversations);

                    // Call onSucces callback
                    if( typeof onSuccessCallback == "function" )
                        onSuccessCallback.apply(null, arguments);
                };

                var onError = function(error) {
                    // To do
                    //App.logging.debug(error);
                    // Call onError callback
                    if( typeof onErrorCallback == "function" )
                        onErrorCallback.apply(null, arguments);
                };

                var options = {
                    method: "PUT",
                    endpoint: "/conversation/"+this.getCurrentTopic().id,
                    requireAuth: false,
                };

                httpService.call(options, conversation, onSuccess, onError);
            },


            refreshConversationsList : function(onSuccessCallback, onErrorCallback) {

                var onSuccess = function(response) {
                    var conversations = storageService.getObj(App.storage.conversations);
                    if( !(conversations instanceof Array) ) conversations = [];
                    conversations = response.conversations;
                    storageService.storeObj( App.storage.conversations, conversations);
                    storageService.storeObj( App.storage.belongs_conversations, response.belongs_conversations );

                    // Call onSucces callback
                    if( typeof onSuccessCallback == "function" )
                        onSuccessCallback.apply(null, arguments);
                };

                var onError = function(error) {
                    // To do
                    //App.logging.debug(error);
                    // Call onError callback
                    if( typeof onErrorCallback == "function" )
                        onErrorCallback.apply(null, arguments);
                };

                var options = {
                    method: "GET",
                    endpoint: "/conversations",
                    requireAuth: false,
                };

                httpService.call(options,{}, onSuccess, onError);
            },

            getConversation : function (conversationId) {
                    var conversations = storageService.getObj(App.storage.conversations);
                    if( !(this.conversations instanceof Array) ) this.conversations = [];
                    this.topic = conversations.filter((c) => c.id === conversationId)[0];
                    var self = this;

                        var onSuccess = function(resData) {
                        var conversations = storageService.getObj(App.storage.conversations);
                        var conversationIndex = conversations.findIndex( obj => obj.id == conversationId );
                        if( conversationIndex > -1 ) {
                            conversations[conversationIndex].messages = resData;
                            self.topic = conversations[conversationIndex];
                            $rootScope.$broadcast("app:current-topic-change", self.topic);
                            storageService.storeObj(App.storage.conversations, conversations);
                        }
                        // Call onSucces callback
                        if( typeof onSuccessCallback == "function" )
                            onSuccessCallback.apply(null, arguments);
                        };

                        var onError = function(error) {
                            // To do
                            App.logging.debug(error);
                            // Call onError callback
                            if( typeof onErrorCallback == "function" )
                                onErrorCallback.apply(null, arguments);
                        };

                        var options = {
                            method: "GET",
                            endpoint: "/conversation/"+this.getCurrentTopic().id,
                            requireAuth: false,
                        };

                        httpService.call(options, {}, onSuccess, onError);

            },

            getCurrentTopic : function () {
                console.log("this.topic getCurrentTopic :", this.topic);
                return this.topic;
            },

            refreshCurrentConversation : function ( conversation ) {
                this.topic = conversation;
                $rootScope.$broadcast("app:current-topic-change", this.topic);
            },

            get_owner : function (userId) {
                var users = storageService.getObj(App.storage.users);
                var self = this;
                conversationOwner = users.filter((c) => c.id === userId)[0];
                return conversationOwner;
            }

            // create: function(conversation) {
            //
            //     console.log(conversation.subject)
            //     var data = $.param({
            //         'conversation[subject]': conversation.subject,
            //     });
            //
            //     var config = {
            //         headers : {
            //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            //         }
            //     }
            //
            //     $http.post('conversation', data, config)
            //         .success(function (data, status, headers, config) {
            //             console.log('rrrr')
            //         })
            // },

        };
    }]
);



