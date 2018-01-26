'use strict';
angular.module('todoApp')
.controller('calendarCtrl', ['$scope', '$location', 'todoListSvc', 'adalAuthenticationService', function ($scope, $location, todoListSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.html = "No Content";
   
    todoListSvc.getCalendar().success(function (results) {
        $scope.html = results;
        $scope.loadingMessage = "";

    }).error(function (err) {
        $scope.error = err;
        $scope.html = err;
        $scope.loadingMessage = "";

    })

   
   
}]);