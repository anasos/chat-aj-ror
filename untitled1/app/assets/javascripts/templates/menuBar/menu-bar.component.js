angular.
module('menuBar').
component('menuBar', {
    templateUrl: 'menuBar/menu-bar.template.html',
    controller: ['$location','$scope', '$rootScope', '$timeout', 'storageService', 'authService', '$mdDialog',
        function MenuBarController($location , $scope , $rootScope, $timeout, localStorage, authService, $mdDialog) {
            this.user = localStorage.getUser();
            var current_user = this.user;
            var self = this;
            self.myProfile = function() {
                $location.url( "/myProfile" );
            }

            self.logout = function() {
                authService.logout();
                $location.url( "/signIn" );
            }

            var originatorEv;

            self.openMenu = function($mdMenu, ev) {
                debugger;
                originatorEv = ev;
                $mdMenu.open(ev);
            };
        }]
});