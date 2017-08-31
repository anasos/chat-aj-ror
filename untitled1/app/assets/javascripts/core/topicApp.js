// // var app = angular.module('topicApp', ['templates', 'ngRoute']);
// // app.controller('TopicCtrl', function TopicListController($scope) {
// //     $scope.entries = [
// //         {name: 'Messi'},
// //         {name: 'Suarez'},
// //         {name: 'Neymar'}
// //     ]
// // });
//
// angular.
// module('topicApp').
// config(['$locationProvider', '$routeProvider',
//     function config($locationProvider, $routeProvider) {
//         $locationProvider.hashPrefix('!');
//
//         $routeProvider.
//         when('/topics', {
//             template: '<topic-card-list></topic-card-list>'
//         }).
//         when('/topic/:topicId', {
//             template: '<topic-detail></topic-detail>'
//         }).
//         when('/conversation/new', {
//             template: '<add-conversation></add-conversation>'
//         }).
//         otherwise('/topics');
//     }
// ]);
//
// angular.module('topicApp').controller('namesCtrl', function($scope) {
//     $scope.names = [
//         'Jani',
//         'Carl',
//         'Margareth',
//         'Hege',
//         'Joe',
//         'Gustav',
//         'Birgit',
//         'Mary',
//         'Kai'
//     ];
// });
//
//
// angular.module('topicApp').controller('topicsCtrl', function($scope) {
//         $scope.topics = [
//             {
//                 name: 'Nexus S',
//                 snippet: 'Fast just got faster with Nexus S.'
//             }, {
//                 name: 'Motorola XOOM™ with Wi-Fi',
//                 snippet: 'The Next, Next Generation tablet.'
//             }, {
//                 name: 'MOTOROLA XOOM™',
//                 snippet: 'The Next, Next Generation tablet.'
//             }
//         ];
// });
//
// // angular.
// // module('topicApp').
// // component('topicList', {
// //     template:
// //     '<ul>' +
// //     '<li ng-repeat="topic in $ctrl.topics">' +
// //     '<span>{{topic.name}}</span>' +
// //     '<p>{{topic.snippet}}</p>' +
// //     '</li>' +
// //     '</ul>',
// //     controller: function TopicListAllController() {
// //         this.topics = [
// //             {
// //                 name: 'Nexus S',
// //                 snippet: 'Fast just got faster with Nexus S.'
// //             }, {
// //                 name: 'Motorola XOOM™ with Wi-Fi',
// //                 snippet: 'The Next, Next Generation tablet.'
// //             }, {
// //                 name: 'MOTOROLA XOOM™',
// //                 snippet: 'The Next, Next Generation tablet.'
// //             }
// //         ];
// //     }
// // });
//
// angular.
// module('topicApp').
// component('topicCardList', {
//     templateUrl: 'topic-list.template.html',
//     controller: ['$http',
//         function TopicListAllController($http) {
//             var self = this;
//
//             $http.get('topics').then(function(response) {
//                 self.topics = response.data;
//             });
//
//             // this.topics = [
//             //     {
//             //         name: 'Nexus S',
//             //         snippet: 'Fast just got faster with Nexus S.',
//             //         price: 120
//             //     }, {
//             //         name: 'Motorola XOOM™ with Wi-Fi',
//             //         snippet: 'The Next, Next Generation tablet.',
//             //         price: 12
//             //     }, {
//             //         name: 'MOTOROLA XOOM™',
//             //         snippet: 'The Next, Next Generation tablet.',
//             //         price: 78
//             //     }
//             // ];
//         }]
// });
//
//
// angular.
// module('topicApp').
// component('topicDetail', {
//     templateUrl: 'topic-detail.template.html',
//     controller: ['$http', '$routeParams',
//         function TopicDetailController($http, $routeParams) {
//             var topicId = $routeParams.topicId
//             var self = this;
//
//             self.setImage = function setImage(imageUrl) {
//                 self.mainImageUrl = imageUrl;
//             };
//
//             $http.get('topic/'+topicId).then(function(response) {
//                 self.topic = response.data;
//                 self.setImage(self.topic.images[0]);
//             });
//
//             // this.topics = [
//             //     {
//             //         name: 'Nexus S',
//             //         snippet: 'Fast just got faster with Nexus S.',
//             //         price: 120
//             //     }, {
//             //         name: 'Motorola XOOM™ with Wi-Fi',
//             //         snippet: 'The Next, Next Generation tablet.',
//             //         price: 12
//             //     }, {
//             //         name: 'MOTOROLA XOOM™',
//             //         snippet: 'The Next, Next Generation tablet.',
//             //         price: 78
//             //     }
//             // ];
//         }]
// });
//
//
