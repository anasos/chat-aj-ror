angular.
module('addConversation').
component('addConversation', {
    templateUrl: 'pages/addConversation/add-conversation.template.html',
    controller: ['$location','$scope', 'Conversation', 'User',
        function AddConversationController($location , $scope, Conversation, User ) {
        var self = $(this);
            $scope.$users = User.getRecipients();
            Conversation.refreshConversationsList();
            $scope.addConversation = function() {
                debugger;
                conversation = Conversation.create($scope.newConversation);
                $scope.newConversation = {};
            }

            self.getConversation = function getConversation(conversationId) {
                var self = this;
                var conversations = localStorage.getObj(App.storage.conversations);
                if( !(this.conversations instanceof Array) ) this.conversations = [];
                this.topic = conversations.filter((c) => c.id === conversationId)[0];
            };
        }]
});