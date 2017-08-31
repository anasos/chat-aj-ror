angular.
module('menuBar').
component('menuBar', {
    templateUrl: 'menuBar/menu-bar.template.html',
    controller: ['$location','$scope', '$rootScope', '$timeout', 'storageService',
        function MenuBarController($location , $scope , $rootScope, $timeout, localStorage) {
            this.user = localStorage.getUser();
            var current_user = this.user;
            var self = this;
            self.myProfile = function() {
                $location.url( "/myProfile" );            }
        }]
});