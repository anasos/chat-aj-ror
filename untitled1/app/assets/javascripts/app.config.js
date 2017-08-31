var app = angular.
module('topicApp').
controller('protectedRoute', ['$location', 'User', function($location, userService) {
    var user = userService.getUser();
    if( !user ) {
        $location.url( "/signIn" );
    }
}]).
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/topics', {
            template: '<topic-card-list></topic-card-list>'
        }).
        when('/topic/:topicId', {
            template: '<topic-detail></topic-detail>'
        }).
        when('/home', {
            template: '<add-conversation></add-conversation>',
            controller: 'protectedRoute',
        }).
        when('/conversation/:conversationID', {
            template: '<conversation-show></conversation-show>'
        }).
        when('/signIn', {
            template: '<sign-in></sign-in>'
        }).
        when('/signUp', {
            template: '<sign-up></sign-up>'
        }).
        when('/myProfile', {
            template: '<my-profile></my-profile>'
        }).
        otherwise('/home');
    }
]).
run([ '$rootScope', function ($rootScope) {
    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
} ]);
