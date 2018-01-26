'use strict';
angular.module('todoApp')
.controller('driveCtrl', ['$base64', '$scope', '$location', '$interval', 'todoListSvc', 'adalAuthenticationService', function ($base64, $scope, $location,$interval, todoListSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.html = "No Content";
    $scope.isMessage = false;
    $scope.btnGoback = false;
    $scope.isAction = false;
    $scope.fileDeleted = false;
    $scope.files = [];
    $scope.drives = [];
    $scope.lastId = '';
    $scope.lastIds = [];
    $scope.numGapiLoaded = 0;
   
    ///interval....
    $interval(function () {
        
        if (typeof gapi.client == 'undefined')
            console.log('gapi.client undefined');
        else if (typeof gapi.client.drive === 'undefined')
            gapi.client.load('drive', 'v2', function () {
                $scope.handleDriveAPILoaded();
                $scope.numGapiLoaded++;
            });

    }, 5000);

    ///interval....
    $interval(function () {
        $scope.files = [];
        //refresh files and folders
        gapi.client.load('drive', 'v2', function () {
            $scope.handleDriveAPILoaded();

        });
        //MIcrosoft
        todoListSvc.getDrive()
          .success(function (results) {
              //var mymomentExp = moment(todo.ghwExpires).startOf('day').fromNow();
              $scope.files = $scope.getFiles(results, false);
              console.log('OK from Microsoft SkyDrive')
              $scope.loadingMessage = "";
              if (!$scope.$$phase) { $scope.$apply(); }
          })
          .error(function (err) {
              console.log('Error from Microsoft SkyDrive')

          });

    }, 120000);

    //DriveGetFile
    $scope.DriveGetFile = function(fileId) {
        var request = gapi.client.drive.files.get({
            'fileId': fileId
        });
        request.execute(function (resp) {
            console.log('Title: ' + resp.title);
            console.log('Description: ' + resp.description);
            console.log('MIME type: ' + resp.mimeType);
        });
    };

    // list of videos uploaded to the currently authenticated user's channel.
    $scope.handleDriveAPILoaded = function (id) {
        // See https://developers.google.com/youtube/v3/docs/channels/list
        //parents
        if (typeof id !== 'undefined') query = 'trashed !=true and "me" in owners and  "' + id + '" in parents';
        else query = 'trashed !=true and "me" in owners';

        var request = gapi.client.drive.files.list({
            'maxResults': 200,
            'orderby': 'folder,modifiedTime desc',
            'q': query
        });
        request.execute(function (response) {
          
            $scope.getGDrive(response, id);
            if (!$scope.$$phase) { $scope.$apply(); }
        });
    };

    //go back
    $scope.goBack = function () {

        if (typeof $scope.lastId !== 'undefined') {

            if ($scope.lastparentReference.Gmail !== true)
                $scope.getDriveAll($scope.lastId);
            else
                $scope.handleDriveAPILoaded($scope.lastId);

            //$scope.getDriveAll($scope.lastId);
            $scope.isMessage = false;
            var index = $scope.lastIds.indexOf($scope.lastId);
            $scope.lastIds.splice(index, 1);
            $scope.lastId = $scope.lastIds[$scope.lastIds.length - 1];
            if ($scope.lastIds.length <=0) {
                $scope.btnGoback = false;
            }
        }
       
      
    }

    //go action for th current file.

    $scope.goAction = function (drive) {
        drive.file.isAction = !drive.file.isAction;
    };

    $scope.goDrive = function (drive) {
        $scope.btnGoback = true;
        // $scope.drives = drive.file;
        if (drive.file.id !== $scope.lastId) {
            //$scope.lastId = drive.file.Gmail !== true ? drive.file.parentReference : drive.file.id;
            $scope.lastId = drive.file.parentReference;
            $scope.lastparentReference = drive.file;
            $scope.lastIds.push($scope.lastId);
            
        }
        //just call the rest APi....
        if(drive.file.Gmail !== true)
                $scope.getDriveAll(drive.file.id);
        else
                $scope.handleDriveAPILoaded(drive.file.id);
        
        
    }

    $scope.getDriveAll = function (id) {

        todoListSvc.getDriveAll(id).success(function (results) {
            $scope.loadingMessage = "";
            //$scope.drives = $scope.getFiles(results, false);
            $scope.files = $scope.getFiles(results, false);

        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
          
        })

    }

   var  getObjects = function(obj, key) {
       var newObj;
        $.each(obj, function (k,v) {
            if(v.name === key)
            {
                newObj = v;
            }
        });

        return newObj
       
    }

   $scope.getParent = function (child) {
       //looping the parents...
       $.each(child.parents, function (i, value) {


           if (value.isRoot == true) {
               $scope.isRoot = value.isRoot;

           } 
           //var request = gapi.client.drive.files.get({
           //    'fileId': value.id
           //});
           //request.execute(function (resp) {
           //    console.log('Title: ' + resp.title);
           //    console.log('Description: ' + resp.description);
           //    console.log('MIME type: ' + resp.mimeType);
           //    if (resp.parents.length <= 0 && $scope.counterParents <= 1) {
           //        $scope.ParentId = resp.id; $scope.counterParents = 0;

           //    } else { $scope.getParent(resp); $scope.counterParents++; }
           //});
       });
   };

   $scope.getFilesFromFolder = function (respond , isGmail , parentId) {
       if (isGmail == true && typeof respond !== 'undefined') 
               $.each(respond, function (k, todo) {
                   if (todo.parentReference == parentId) {


                   }
               });

       
   };

   $scope.counterParents = 0;

   $scope.getFiles = function (respondEmail, isGmail , parentId) {

        var xfiles = [];
        if (isGmail == true && typeof respondEmail !== 'undefined' && typeof respondEmail.items !== 'undefined')
            //calling the Gmail gets............................
            $.each(respondEmail.items, function (k, todo) {
                var longdate = moment(todo.modifiedDate).format('MMMM Do YYYY, h:mm:ss a');
                var alternateLink = typeof todo.alternateLink === 'undefined' ? '' : todo.alternateLink;
                ////if (alternateLink.indexOf('folder') >= 0) {
                ////    console.log(todo.alternateLink);
                ////    //looping the parents...
                ////    $scope.counterParents++;
                ////    $scope.getParent(todo);

                ////}
                //real logic for Parents and Children...........
                if (todo.parents.length > 0) {
                    $scope.isRoot = false;
                    $scope.getParent(todo);
                }
               
                if ($scope.isRoot || typeof parentId !== 'undefined')
                    xfiles.push({
                        id: todo.id,
                        DateTimeCreated: moment(todo.createdDate).startOf('day').fromNow(),
                        LongDate: longdate,
                        Subject: todo.title,
                        CreatedBy: "",
                        ModifiedBy:todo.lastModifyingUser.displayName,
                        IsRead: true,
                        Gmail:isGmail,
                        Folder: "",
                        Img:  todo.mimeType.indexOf('image/jpeg')>=0?todo.thumbnailLink:todo.iconLink,
                        size: typeof todo.fileSize === 'undefined' ? 0 : todo.fileSize,
                        isFile: alternateLink.indexOf('folder') >= 0 ? false : true,
                        parentReference: typeof todo.parents[0] === 'undefined' ? 0 : todo.parents[0].id,
                        webUrl: todo.embedLink,
                        alternateLink: alternateLink
                    });

            });

        else if (typeof respondEmail !== 'undefined' && typeof respondEmail.value !== 'undefined')
            $.each(respondEmail.value, function (k, todo) {
                var longdate = moment(todo.lastModifiedDateTime).format('MMMM Do YYYY, h:mm:ss a');
                var partImg = todo.name.substring(todo.name.lastIndexOf('.')+1);
                xfiles.push({
                    id: todo.id,
                    DateTimeCreated: moment(todo.lastModifiedDateTime).startOf('day').fromNow(),
                    LongDate: longdate,
                    Subject: todo.name,
                    CreatedBy: todo.createdBy.user.displayName,
                    ModifiedBy: todo.lastModifiedBy.user.displayName,
                    IsRead: true,
                    Gmail: isGmail,
                    Folder: typeof todo.folder === 'undefined' ? todo.file : todo.folder,
                    Img: '/TodoSPA/App/Images/'+ partImg + '.png',
                    size: todo.size,
                    isFile: todo.size <= 0 ? false : true,
                    parentReference:todo.parentReference.id,
                    webUrl: todo.webUrl

                });

            });
        return xfiles;
    }
    //sowClickModal 
   $scope.goModalDelete = function (drive) {
        var myjson = '{"EmailLabel":"Email","CompanyLabel":"Company Name","sowDateLabel":"Choose Cancellation Efective Date","TerminationLabel":"Select SOW Termination","sowTermination":"Select Contract","sowVisible":"","Title":" ' + drive.file.Subject +'","hClass":"label label-primary","bClass":"btn btn-danger"}';
        var sowArr = '[{"sowType":"SOW#1"},{"sowType":"SOW#2"},{"sowType":"SOW#3"}]'
        $scope.targetElm = JSON.parse(myjson);
        $scope.targetElm.sowTypeList = JSON.parse(sowArr);
        $scope.html = '';
        $scope.file = drive.file;
        console.info('click inside of sowClickModal');
        $('.subGroup').show();
        $('#exampleModal').modal('show');

        $('.form-control').each(function () {
            $(this).val('');

        })
    }
    //goDelete
    $scope.goDelete = function (drive) {
       
        $scope.file.isDeleted = true;
        var request = gapi.client.drive.files.delete({
            'fileId': drive.file.id
        });
        request.execute(function (resp) {

            //$scope.file.isDeleted = true;

        });

        $('#exampleModal').modal('hide');
    }
    //getGDrive
    $scope.getGDrive = function (response, id) {
        var tempArray = $scope.getFiles(response, true, id);
        if (typeof id !== 'undefined') $scope.files = [];
            $.each(tempArray, function (k, todo) {
                $scope.files.push({
                    id: todo.id,
                    DateTimeCreated: todo.DateTimeCreated,
                    LongDate: todo.LongDate,
                    Subject: todo.Subject,
                    CreatedBy: "",
                    ModifiedBy: todo.ModifiedBy,
                    IsRead: todo.IsRead,
                    Gmail: todo.Gmail,
                    Folder: todo.Folder,
                    Img: todo.Img,
                    size: todo.size,
                    isFile: todo.isFile,
                    isDeleted:false,
                    isAction:false,
                    parentReference: todo.parentReference,
                    webUrl: todo.alternateLink
                });
            });
                
            if (!$scope.$$phase) { $scope.$apply(); }

                        

       
    };

   
}]);