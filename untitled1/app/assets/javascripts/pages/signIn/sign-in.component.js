angular.
module('signIn').
component('signIn', {
    templateUrl: 'pages/signIn/sign-in.template.html',
    controller: ['$location','$scope', 'authService', 'User',
        function SignInController($location, $scope, authService, User ) {
            $scope.signIn = function() {
                var self = this;
                var data = {
                    email : this.$ctrl.email,
                    password : this.$ctrl.password,
                };
                console.log(data);
                var onSuccess = function() {
                    $location.url('/');
                };

                var onError = function(error) {
                    //  dialogService.showAlert(ev, "Unkown error occured");
                };

                authService.signIn( data, onSuccess, onError );
            }
        }]
});