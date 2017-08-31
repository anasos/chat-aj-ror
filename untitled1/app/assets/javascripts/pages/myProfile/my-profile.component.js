angular.
module('myProfile').
component('myProfile', {
    templateUrl: 'pages/myProfile/my-profile.template.html',
    controller: ['$location','$scope', '$rootScope', '$timeout', 'storageService',
        function MyProfileController($location , $scope , $rootScope, $timeout, localStorage) {
            $scope.$user = localStorage.getUser();
        }]
});