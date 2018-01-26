'use strict';
angular.module('todoApp')
.factory('todoListSvc', ['$http', function ($http) {
    return {
        getItems : function(){
            //return $http.get('/api/TodoList');
            return $http.get('//myappinazure.azurewebsites.net/api/contact')
        },
        getItem : function(id){
            return $http.get('//myappinazure.azurewebsites.net/api/contact/' + id);
        },
        getCalendar : function(){
            return $http.get('//outlook.office365.com/owa/?realm=yome.onmicrosoft.com&exsvurl=1&ll-cc=2057&modurl=1');
        },
        getMessage : function(){
            return $http.get('https://outlook.office365.com/api/v1.0/me/messages');
           
        },
        getProfile : function(){
            return $http.get('https://outlook.office365.com/api/v1.0/me');
           
        },
        getDrive: function () {
            return $http.get('https://graph.microsoft.com/v1.0/me/drive/root/children');

        },
        getDriveAll: function (id) {
            return $http.get('https://graph.microsoft.com/v1.0/me//drive/items/'+id+'/children');

        },
        postItem : function(item){
            return $http.post('//myappinazure.azurewebsites.net/api/contact?name=' + item.Description + '&email=' + item.Owner + '&device='+item.Device, item);
        },
        putItem : function(item){
            return $http.put('//myappinazure.azurewebsites.net/api/contact/', item);
        },
        getGDrive: function () {
            return $http.get('https://content.googleapis.com/drive/v2/files?maxResults=100&q=trashed!=true&orderby=modifiedDate,folder');

        },
        getGLogOut: function (accessToken) {
          
                return $http.get('https://accounts.google.com/o/oauth2/revoke?token=' + accessToken);

        },
        deleteItem : function(id){
            return $http({
                method: 'DELETE',
                url: '//myappinazure.azurewebsites.net/api/contact?id=' + id
            });
        }
    };
}]);