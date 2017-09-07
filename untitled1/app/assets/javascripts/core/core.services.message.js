/**
 * Created by anas on 24/07/17.
 */
var messageServices = angular.module('messageServices', ['httpModule', 'storageModule']);
messageServices.factory('Message',['httpService', 'storageService', '$rootScope','Conversation',
    function(httpService, storageService, $rootScope, Conversation) {
        return {

            topic : {},

            create : function(serviceOptions, onSuccessCallback, onErrorCallback) {

                var msg = Object.assign( {}, serviceOptions.message);

                var onSuccess = function(resData) {

                    console.log("Success ");
                    msg = resData;
                    var conversations = storageService.getObj(App.storage.conversations);
                    var conversation_index = conversations.findIndex( obj => obj.id == msg.conversation_id );
                    var msg_index = conversations[conversation_index].messages.length;
                    conversations[conversation_index].messages[msg_index] = msg;
                    storageService.storeObj(App.storage.conversations, conversations);
                    Conversation.refreshCurrentConversation(conversations[conversation_index])
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
                    endpoint: "/message",
                    requireAuth: false,
                };

                httpService.call(options, msg, onSuccess, onError);
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

                    console.log("Success get list ");

                    storageService.storeObj( App.storage.conversations, response );

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

            get_message_owner : function (messageUserId) {
                var users = storageService.getObj(App.storage.users);
                var self = this;
                message_owner = users.filter((c) => c.id === messageUserId)[0];
                return message_owner;
            }
        };
    }]
);



