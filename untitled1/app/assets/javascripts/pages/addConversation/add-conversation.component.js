angular.
module('addConversation').
component('addConversation', {
    templateUrl: 'pages/addConversation/add-conversation.template.html',
    controller: ['$location','$scope', 'Conversation', 'User',
        function AddConversationController($location , $scope, Conversation, User ) {
        var self = $(this);
            User.refreshUsersList();
            $scope.$users = [];
            Conversation.refreshConversationsList();
            $scope.addConversation = function() {
                conversation = Conversation.create($scope.newConversation);
                $scope.newConversation = {};
            }

            self.getConversation = function getConversation(conversationId) {
                var self = this;
                var conversations = localStorage.getObj(App.storage.conversations);
                if( !(this.conversations instanceof Array) ) this.conversations = [];
                this.topic = conversations.filter((c) => c.id === conversationId)[0];
            };

            $scope.$on("app:storage-change", function (event, args) {
                console.log("OK");
                if( args.key == App.storage.users ) $scope.$users = User.getRecipients();
            });
        }]
}).config(function($mdThemingProvider){

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

});