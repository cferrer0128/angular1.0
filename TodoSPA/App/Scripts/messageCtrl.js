'use strict';
angular.module('todoApp')
.controller('messageCtrl', ['$base64', '$scope', '$location', '$interval', 'todoListSvc', 'adalAuthenticationService', function ($base64, $scope, $location,$interval, todoListSvc, adalService) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.html = "No Content";
    $scope.isMessage = false;
    $scope.isHome = true;
    $scope.numGapiLoaded = 0;
    $scope.emails = [];
    $scope.chats = [];
    $scope.msgEmails = [];
    $scope.newEmails = [];


    $scope.getHTMLPart = function (arr) {
        for (var x = 0; x <= arr.length; x++) {
            if (typeof arr[x].parts === 'undefined') {
                if (arr[x].mimeType === 'text/html') {
                    return arr[x].body.data;
                }
            }
            else {
                return $scope.getHTMLPart(arr[x].parts);
            }
        }
        return '';
    };

    ///interval....
    $interval(function () {

        if (typeof gapi.client == 'undefined')
            console.log('gapi.client undefined');
        else if (typeof gapi.client.gmail === 'undefined')
            gapi.client.load('gmail', 'v1', function () {
                $scope.handleGmailAPILoaded();
                $scope.numGapiLoaded++;
            });

    }, 5000);

    ///interval....
    $interval(function () {
      
      
        //gmail
        if ($scope.isHome == true) {
                $scope.msgEmails = [];
                $scope.emails = [];
                gapi.client.load('gmail', 'v1', function () {
                    $scope.handleGmailAPILoaded();

                });

            //get emails from Microsoft.
                todoListSvc.getMessage().success(function (results) {
                    //getMessage from Microsoft
                    $scope.getEmails(results, false);
                    console.log('OK from Microsoft Email');
                    if (!$scope.$$phase) { $scope.$apply(); }
                }).error(function (err) {
                    $scope.error = err;
                    $scope.loadingMessage = "";
                    //$scope.getEmails(gmailRespond, true);
                    console.log('error from Microsoft Email')

                });

        }
           
       

    }, 120000);

    // list of videos uploaded to the currently authenticated user's channel.
    $scope.handleGmailAPILoaded = function (labelIds) {
        // See https://developers.google.com/youtube/v3/docs/channels/list
        var varlabelIds = 'INBOX';
        if (typeof labelIds !== 'undefined') varlabelIds = labelIds;
        var request = gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'pageToken': nextPageToken,
            'maxResults': 100,
            'labelIds':varlabelIds,
            'q': query
        });
        request.execute(function (response) {
            console.log('OK from Gmails');
            $scope.getEmails(response, true);
            if (!$scope.$$phase) { $scope.$apply(); }
        });
    };

    //go back
    $scope.goBack = function () {
        $scope.isMessage = false;
        $scope.leftmenu = true;
        $('.leftmenu').each(function () {
            $.show();
            //$.css('width', '75%');
        });

    }
    //
    $scope.goMessage = function (message,istext) {

      
        if (istext.length <=0) {

            $scope.html = message.email.Body;
            $scope.isMessage = true;
            $('.leftmenu').each(function () {
                $.hide();
                $.css('width', '100%');
            });
        } else if (istext === "text") {
            $scope.msgEmails = $scope.emails;
            //labelIds
            $scope.emails = [];
            $scope.handleGmailAPILoaded('CHAT');
            $scope.isHome = false;
           
        } else if (istext === "msg") {
            $scope.isHome = true;
            $scope.emails = $scope.msgEmails;
            
        }
        //if (!$scope.$$phase) { $scope.$apply(); }
       

    }

   var  getObjects = function(obj, key) {
       var newObj;
        $.each(obj, function (k,v) {
            if(v.name === key)
            {
                newObj = v;
                
            }
        });

        return typeof newObj === "undefined" ? "" : newObj.value;
       
    }

   var min_internalDate = '';
   $scope.sortByFirstName = function(a, b) {
       var sortStatus = 0;

       if (a.internalDate < b.internalDate) {
           sortStatus = -1;
       } else if (a.internalDate > b.internalDate) {
           sortStatus = 1;
       }
       return sortStatus;
   }

   $scope.findLabel = function (list, id) {

       for (var i = list.length - 1; i >= 0; i--) {
           if (list[i] === id) {
               return id;
           }
       }
   };

    $scope.getEmails = function (respondEmail, isGmail) {

        if (isGmail == true && typeof respondEmail !== 'undefined' && typeof respondEmail.messages !== 'undefined')
            //calling the Gmail gets............................
            $.each(respondEmail.messages, function (k, todo) {
                var messageId = todo.id;
                var emailRequest = gapi.client.gmail.users.messages.get({
                    'userId': 'me',
                    'id': messageId
                });
                //execute get message...
                emailRequest.execute(function (emailrespond) {
                    var labels = emailrespond.payload.headers;
                    var gmailDate = getObjects(labels, "Date");
                    var from = getObjects(labels, "From");
                    var to = getObjects(labels, "To");
                    //"UNREAD"
                    var unread = '';
                    if (emailrespond.labelIds.length >= 0)
                        unread = $scope.findLabel(emailrespond.labelIds, "UNREAD");
                    //var emailbody = Base64.decode(emailrespond.payload.parts[0].body.data);
                   // var htmlBody = typeof emailrespond.payload.parts === 'undefined' ? '' : emailrespond.payload.parts[0].body.data;
                    var htmlBody = typeof emailrespond.payload.parts === 'undefined' ? emailrespond.payload.body.data : $scope.getHTMLPart(emailrespond.payload.parts);
                    htmlBody = htmlBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
                    var emailbody = decodeURIComponent(escape(window.atob(htmlBody)));
                    //Base64.decode(htmlBody); //$base64.decode(htmlBody);
                    var Subject = getObjects(labels, "Subject");
                  
                    var jsondate = new Date(parseInt(emailrespond.internalDate));
                    if (typeof unread !== 'undefined')
                        $scope.newEmails.push({ read: unread })

                    $scope.emails.push({
                        DateTimeCreated: emailrespond.labelIds[0] === "CHAT"?moment(jsondate).startOf('minutes').fromNow(): moment(gmailDate).startOf('minutes').fromNow(),
                            Subject: Subject,
                            BodyPreview: emailrespond.snippet,
                            Body: emailbody,
                            IsRead: typeof unread !== 'undefined'?false:true,
                            Sender: from,
                            internalDate: emailrespond.internalDate,
                            Img: emailrespond.labelIds[0] === "CHAT"?'hangouts_icon32.png':'gmail_64dp.png',
                            ToRecipients: to.length > 0 ? "TO " + to : ""

                    });
                    if ($scope.emails.length >= 1)
                        $scope.emails.sort(function (a, b) {
                            return parseInt(b.internalDate) - parseInt(a.internalDate);
                        });
                    //$scope.msgEmails = $scope.emails;
                    
                   

                    
                });
            });
        else if (typeof respondEmail !== 'undefined' && typeof respondEmail.value !== 'undefined')
            $.each(respondEmail.value, function (k, todo) {
                $scope.emails.push({

                    DateTimeCreated: moment(todo.DateTimeCreated).startOf('day').fromNow(),
                    Subject: todo.Subject,
                    internalDate: todo.DateTimeCreated,
                    BodyPreview: todo.BodyPreview,
                    Body: todo.Body.Content,
                    IsRead: todo.IsRead,
                    Sender: todo.Sender.EmailAddress.Name,
                    Img: 'Logo_Outlook_22x22.png',
                    ToRecipients: todo.ToRecipients.length<=0?"":"TO "+todo.ToRecipients[0].EmailAddress.Name

                });

                if ($scope.emails.length >= 1)
                    $scope.emails.sort(function (a, b) {
                        return parseInt(b.internalDate) - parseInt(a.internalDate);
                    });

            });
        //update the scope,
        if (!$scope.$$phase) { $scope.$apply(); }

    }


   
}]);