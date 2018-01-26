'use strict';
angular.module('todoApp', ['ngRoute', 'AdalAngular', 'base64'])
.run(function () {
    var tag = document.createElement('script');
    tag.src = location.protocol + "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

  
    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "TodoSPA/App/Views/Home.html",
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "TodoSPA/App/Views/TodoList.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "TodoSPA/App/Views/UserData.html",
    }).when("/Message", {
        controller: "messageCtrl",
        templateUrl: "TodoSPA/App/Views/Messages.html",
    }).when("/Drive", {
        controller: "driveCtrl",
        templateUrl: "TodoSPA/App/Views/Drive.html",
    }).when("/youtube", {
        controller: "youtubeCtrl",
        templateUrl: "TodoSPA/App/Views/youtube.html",
    }).when("/Test", {
        controller: "testListCtrl",
        templateUrl: "TodoSPA/App/Views/Test.html",
    }).otherwise({ redirectTo: "/Home" });
    //instance: 'https://login.microsoftonline.com/', 
    // clientId: '8dd89e9e-edcf-477e-b18b-a03a254a68de',
    // clientId: '95ec1e53-eccb-48a6-8c0e-05cb3d705afb',
    // clientId: 'd1028527-9139-4e39-9cac-479435a11ce9',
    //d1028527-9139-4e39-9cac-479435a11ce9--95ec1e53-eccb-48a6-8c0e-05cb3d705afb

    var endpoints = {
        'https://outlook.office365.com': 'https://outlook.office365.com',
        'https://graph.microsoft.com': 'https://graph.microsoft.com'
    };

    adalProvider.init(
        {

            instance: 'https://login.microsoftonline.com/',
            tenant: 'yome.onmicrosoft.com',
            clientId: 'd1028527-9139-4e39-9cac-479435a11ce9',
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            cacheLocation: 'localStorage'

        },
        $httpProvider
        );

}])
.directive('compile', ['$timeout', '$compile', '$http',function ($timeout, $compile, $http) {
                // directive factory creates a link function
                return function (scope, element, attrs) {

                    scope.$watch(function (scope) {
                        // watch the 'compile' expression for changes
                        return scope.$eval(attrs.compile);
                    }, function (value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);

                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    });

                }
            }
 ]);