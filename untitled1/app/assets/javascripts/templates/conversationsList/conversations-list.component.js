angular.
module('conversationsList').
component('conversationsList', {
    templateUrl: 'conversationsList/conversations-list.template.html',
    controller: ['$location','$scope', '$rootScope', '$timeout', 'storageService', 'Conversation', 'User',
        function ConversationsListController( $location , $scope , $rootScope, $timeout, localStorage, Conversation, User ) {
            var self = this;
            this.isSexy = false ;
            this.conversations = localStorage.getObj(App.storage.conversations);
            this.belongs_conversations = localStorage.getObj(App.storage.belongs_conversations);
            this.test = 10;
            if( !(this.conversations instanceof Array) ) this.conversations = [];
            if( !(this.belongs_conversations instanceof Array) ) this.belongs_conversations = [];

            Conversation.refreshConversationsList();
            User.refreshUsersList();
            $scope.$Conversation = Conversation;

            $scope.$on("app:storage-change", function (event, args) {
                console.log("OK");
                if( args.key != App.storage.conversations && args.key != App.storage.belongs_conversations) return;
                if( args.key == App.storage.conversations ) self.conversations = localStorage.getObj(App.storage.conversations);
                if( args.key == App.storage.belongs_conversations ) self.belongs_conversations = localStorage.getObj(App.storage.belongs_conversations);
                console.log("OK");
            });

        }]

});