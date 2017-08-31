angular.
module('conversationShow').
component('conversationShow', {
    templateUrl: 'conversationShow/conversation-show.template.html',
    controller: ['$location','$scope', '$rootScope', '$timeout', 'storageService', 'Conversation', 'Message',
        function ConversationShowController($location , $scope , $rootScope, $timeout, localStorage, Conversation, Message) {
            var self = this;
            this.editing = false;
            var conversationId = $location.conversationId;
            var conversations = localStorage.getObj(App.storage.conversations);
            if( !(this.conversations instanceof Array) ) this.conversations = [];
            this.topic = Conversation.getCurrentTopic();

            self.enableEdit = function enableEdit() {
                this.editing = true;
            };

            $scope.$on("app:storage-change", function (event, args) {
                console.log("OK");
                if( args.key != App.storage.conversations ) return;
                self.conversations = localStorage.getObj(App.storage.conversations);
                console.log("OK");
            });

            $scope.$on("app:current-topic-change", function (event, args){
                self.topic = Conversation.getCurrentTopic();
                console.log("self.topic ",self.topic);
            });

            $scope.updateConversation = function() {
                conversation = Conversation.update($scope.conversation);
                self.editing = false;
                $scope.conversation = {};
            }

            $scope.addMessage = function () {
                $scope.msg.message.conversation_id = self.topic.id;
                message = Message.create( $scope.msg )
                $scope.msg = {}
            }
        }]
});