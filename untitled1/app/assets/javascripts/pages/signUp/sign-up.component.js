angular.
module('signUp').
component('signUp', {
    templateUrl: 'pages/signUp/sign-up.template.html',
    controller: ['$location','$scope', 'authService',
        function SignUpController($location, $scope, authService ) {
            $scope.signUp = function() {
                console.log('sign up');
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

                authService.signUp( data, onSuccess, onError );
            }
        }]
});