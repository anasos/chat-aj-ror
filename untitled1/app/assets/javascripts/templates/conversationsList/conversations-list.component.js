angular.
module('conversationsList').
component('conversationsList', {
    templateUrl: 'conversationsList/conversations-list.template.html',
    controller: ['$location','$scope', '$rootScope', '$timeout', 'storageService', 'Conversation',
        function ConversationsListController($location , $scope , $rootScope, $timeout, localStorage, Conversation) {
            var self = this;
            this.isSexy = false ;
            this.conversations = localStorage.getObj(App.storage.conversations);
            this.test = 10;
            if( !(this.conversations instanceof Array) ) this.conversations = [];

            Conversation.refreshConversationsList();

            $scope.$Conversation = Conversation;


            $scope.$on("app:storage-change", function (event, args) {
                console.log("OK");
                if( args.key != App.storage.conversations ) return;
                self.conversations = localStorage.getObj(App.storage.conversations);
                console.log("OK");
            });

        }]

});