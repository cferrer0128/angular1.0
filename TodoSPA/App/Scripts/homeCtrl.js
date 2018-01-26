'use strict';
angular.module('todoApp')
.controller('homeCtrl', ['$scope', 'adalAuthenticationService', '$location', '$interval', 'todoListSvc', '$http', function ($scope, adalService, $location, $interval, todoListSvc, $http) {
    $scope.leftmenu = true;
    $scope.login = function () {
        adalService.login();
    };
    $scope.logout = function () {
        adalService.logOut();
    };
    $scope.isActive = function (viewLocation) {        
        return viewLocation === $location.path();
    };


    ///interval....
    $interval(function () {

        if (AUTHED.length > 0){

            $('.pre-auth').hide();
            $('.pos-auth').show();
        }else {

            $('.pre-auth').show();
            $('.pos-auth').hide();
        }


    }, 1000);

    //get the current User...
    $.when(runCrossDomainRequest())
    .done(function (jsonObject) {
        $scope.currentUser = jsonObject;
    })
    .fail(function (err) {
        console.info(JSON.stringify(err));
    })

    

    $scope.getContactsCORS = function (url) {      
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) 
                console.log(xhr.response);
            
        };
        xhr.onerror = function () {
            console.log("Error xhr " + xhr);
           
        };
        xhr.send();

    };

    $scope.getContacts = function () {
        //$scope.getUrl('https://api-default-east-us7a9bcef58a9043768deaf3925a0fd634.azurewebsites.net');
        //https://myappinazure.azurewebsites.net/api/contact
        //$scope.getUrl('https://myappinazure.azurewebsites.net/.auth/login/aad/callback');
         $scope.getContactsCORS('https://myappinazure.azurewebsites.net/api/contact');

       


    };
    //createCORSRequest
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr && $.browser != "IE") {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.withCredentials = true;

            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }

    $scope.getUrl = function (uri) {
        var deferred = $.Deferred();
        var uriUrl = decodeURIComponent(uri);
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];
        $http.get(uriUrl, {
            headers: {
                'Content-type': 'application/json'
            }
        }).success(function (data) {
            deferred.resolve(data);
            console.log("data " + data);
        }).error(function (error) {
            console.log("error " + error);
        });
        return deferred;
    };

    // Build and send the HTTP request.
    function runCrossDomainRequest() {

              
    }

    $scope.loadAPIClientInterfaces = function () {

        gapi.client.load('youtube', 'v3', function () {
            handleAPILoaded();


        });
      
       

    };

    $scope.handleAuthResult = function (authResult) {

        if (authResult && !authResult.error) {
            //loadAPIClientInterfaces
            $scope.isGauth = true;
            AUTHED = authResult.access_token;
            $scope.loadAPIClientInterfaces();
        }

    };

    $scope.googleSignOut = function () {
        var token = gapi.auth.getToken();
        if (token) {
            var accessToken = gapi.auth.getToken().access_token;
            if (accessToken) {
                //calling getGLogOut
                todoListSvc.getGLogOut(accessToken).success(function (results) {
                    $scope.loadingMessage = "";
                    console.log(results);

                }).error(function (err) {
                    console.log(err);
                    $scope.loadingMessage = "";
                   
                })

                
            }
        }
        gapi.auth.setToken(null);
        gapi.auth.signOut();
        $scope.isGauth = false;
        AUTHED = '';
    }

    $scope.googleLogin = function () {
        $scope.isGauth = true;
        gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: false
        }, $scope.handleAuthResult);
    };


    //getProfile from Microsoft...
    todoListSvc.getProfile()
     .success(function (results) {
         $scope.profile = results.Id;
         $scope.tenant = results.Id.substring(results.Id.indexOf('@') + 1);
         $scope.subtenant = $scope.tenant.substring(0, $scope.tenant.indexOf('.'));
         $scope.loadingMessage = "";
         console.log('profile ' + results)
     })
     .error(function (err) {
         $scope.error = err;
         

     });
   
    


}]);