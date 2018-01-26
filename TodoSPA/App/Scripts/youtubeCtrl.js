'use strict';
angular.module('todoApp')
.controller('youtubeCtrl', ['$scope', 'adalAuthenticationService', '$location', '$interval', 'todoListSvc', '$http', '$window', '$log', function ($scope, adalService, $location, $interval, todoListSvc, $http, $window, $log) {
    $scope.leftmenu = true;
    $scope.DropdownClass = 'btn-group ';
    $scope.currentPlaying = '';
    $scope.upcoming = [];
    $scope.results = [];
    $scope.history = [];
    $scope.videoFail = 0;
    $scope.videoRepeat = 0;
    $scope.RepeatList = [];

    //sowButton
    $scope.sowButton = function (xobject) {

        if ($scope.DropdownClass.indexOf('open') > 0)
            $scope.DropdownClass = 'btn-group ';
        else
            $scope.DropdownClass = 'btn-group  open';
    }
    //sowClick 
    $scope.playlist = function (list) {
        $scope.videoFail = 0;
        $scope.currentPlaying = list.listItem.snippet.title;
        $scope.getVideoLibray(list.listItem.id);
        $scope.sowButton('');
        $scope.html = '';
        console.info('click inside of sowClick');


    }
    //
    $scope.changedropdown = function () {
        if ($scope.DropdownClass.indexOf('open') > 0)
            $scope.DropdownClass = 'btn-group subGroup';
        else
            $scope.DropdownClass = 'btn-group subGroup open';
    };

    var service = this;

    var youtube = {
        ready: false,
        player: null,
        playerId: null,
        videoId: null,
        videoTitle: null,
        playerHeight: '480',
        playerWidth: '640',
        state: 'stopped'
    };
      
    //onYouTubeIframeAPIReady
    $window.onYouTubeIframeAPIReady = function () {
        $log.info('Youtube API is ready');
        youtube.ready = true;
        $scope.bindPlayer('placeholder');
        $scope.loadPlayer();
        if (!$scope.$$phase) { $scope.$apply(); }
    };

    function onYoutubeReady(event) {
        $log.info('YouTube Player is ready');
        //youtube.player.cueVideoById(history[0].id);
        //youtube.videoId = history[0].id;
        //youtube.videoTitle = history[0].title; BUFFERING
    }
   
    function onYoutubeStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            youtube.state = 'playing'; $scope.videoFail = youtube.state;
        } else if (event.data == YT.PlayerState.PAUSED) {
            youtube.state = 'paused';
        } else if (event.data == YT.PlayerState.BUFFERING) {
            youtube.state = 'BUFFERING'; $scope.videoFail = 3;
        } else if (event.data == YT.PlayerState.ENDED) {
            youtube.state = 'ended';
            $scope.videoFail = event.data;
            $scope.videoRepeat--;
            if ($scope.upcoming.length > 0) {
                $scope.launchPlayer($scope.upcoming[0].id, $scope.upcoming[0].title);
                $scope.archiveVideo($scope.upcoming[0].id, $scope.upcoming[0].title);
                $scope.deleteVideo($scope.upcoming, $scope.upcoming[0].id, false);
                if (typeof $scope.upcoming[0].repeat !=="undefined")
                    $scope.deleteVideo($scope.upcoming[0].repeat, $scope.upcoming[0].id, false);
            }
        } else if (event.data == YT.PlayerState.UNSTARTED && $scope.videoFail == 3) {
            $scope.videoFail = event.data;
            $scope.launchPlayer($scope.upcoming[0].id, $scope.upcoming[0].title);
            $scope.archiveVideo($scope.upcoming[0].id, $scope.upcoming[0].title);
            $scope.deleteVideo($scope.upcoming, $scope.upcoming[0].id,true);
          


        }

        if (!$scope.$$phase) { $scope.$apply(); }
    }

    $scope.bindPlayer = function (elementId) {
        $log.info('Binding to ' + elementId);
        youtube.playerId = elementId;
    };

    $scope.createPlayer = function () {
        $log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
        return new YT.Player(youtube.playerId, {
            height: youtube.playerHeight,
            width: youtube.playerWidth,
            playerVars: {
                rel: 0,
                showinfo: 0
            },
            events: {
                'onReady': onYoutubeReady,
                'onStateChange': onYoutubeStateChange
            }
        });
    };
    //var/www/html/javascript/youtubeapi/war/app.js
    $scope.loadPlayer = function () {
        if (youtube.ready && youtube.playerId) {
            if (youtube.player) {
                youtube.player.destroy();
            }
            youtube.player = $scope.createPlayer();
        }
    };

    $scope.launchPlayer = function (id, title) {
        youtube.player.loadVideoById(id);
        youtube.videoId = id;
        youtube.videoTitle = title;
        return youtube;
    }

    //default result....
    $scope.videoListDefault = function (data) {

        $scope.upcoming.length = 0;
        if (typeof data.items !== 'undefined')
            for (var i = data.items.length - 1; i >= 0; i--) {
                var Thumbnail = typeof data.items[i].snippet.thumbnails !== 'undefined' ? typeof data.items[i].snippet.thumbnails.default !== 'undefined' ? data.items[i].snippet.thumbnails.default.url : "" : "";
                if (Thumbnail.length > 0)
                    $scope.upcoming.push({
                        id: data.items[i].snippet.resourceId.videoId,
                        title: data.items[i].snippet.title,
                        description: data.items[i].snippet.description,
                        thumbnail: Thumbnail,
                        show: true,
                        repeat: [],
                        author: data.items[i].snippet.channelTitle
                    });
                else console.log('vidwo list out ' + data.items[i].snippet.title);
            }

        return $scope.upcoming;
    }

    $scope.videoListResults = function (data) {
        results.length = 0;

        for (var i = data.items.length - 1; i >= 0; i--) {
            results.push({
                id: data.items[i].snippet.resourceId.videoId,
                title: data.items[i].snippet.title,
                description: data.items[i].snippet.description,
                thumbnail: data.items[i].snippet.thumbnails.default.url,
                author: data.items[i].snippet.channelTitle
            });
        }

        return results;
    }

    $scope.listResults = function (data) {
        results.length = 0;
        for (var i = data.items.length - 1; i >= 0; i--) {
            results.push({
                id: data.items[i].id.videoId,
                title: data.items[i].snippet.title,
                description: data.items[i].snippet.description,
                thumbnail: data.items[i].snippet.thumbnails.default.url,
                author: data.items[i].snippet.channelTitle
            });
        }

        return results;
    }

    $scope.queueVideo = function (id, title, isdisplay) {
        $scope.upcoming.push({
            id: id,
            title: title,
            show: isdisplay
        });
       
        return $scope.upcoming;
    };

    $scope.archiveVideo = function (id, title) {
        $scope.history.unshift({
            id: id,
            title: title
        });
        return $scope.history;
    };

    $scope.deleteVideo = function (list, id, deleteAll) {
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i].id === id) {
                list.splice(i, 1);
                if (deleteAll == false) break;
            }
        }
    };

    $scope.delete = function (list, id) {
       var list = $scope.upcoming;
        $scope.deleteVideo(list, id, true);
    };
    //repeat 
    $scope.repeat = function (video) {
        $scope.videoRepeat++;
        var list = $scope.upcoming;
        video.repeat.push({id:video.id});
        $scope.queueVideo(video.id, video.title, false);
        if (!$scope.$$phase) { $scope.$apply(); }
    };

    $scope.launch = function (id, title) {
        $scope.launchPlayer(id, title);
        $scope.archiveVideo(id, title);
        //$scope.deleteVideo($scope.upcoming, id);
        $log.info('Launched id:' + id + ' and title:' + title);
    };

    this.getYoutube = function () {
        return youtube;
    };

    this.getResults = function () {
        return results;
    };

    this.getUpcoming = function () {
        return $scope.upcoming;
    };

    this.getHistory = function () {
        return history;
    };

    ///interval....
    $interval(function () {

        if (youtube.ready ===false)
                $window.onYouTubeIframeAPIReady()
        //do nothing
        if (typeof gapi.client.youtube === "undefined")
            $scope.loadAPIClientInterfaces();

    }, 10000);

  
    // Retrieve the list of videos in the specified playlist.
    $scope.requestVideoPlaylist = function () {
        $('#video-container').html('');
        var requestOptions = {
            mine: true,
            part: 'snippet',
            maxResults: 20
        };
        
        var request = gapi.client.youtube.playlists.list(requestOptions);
        request.execute(function (response) {
            // Only show pagination buttons if there is a pagination token for the
            // next or previous page of results.
            if (typeof response.result !== 'undefined' && typeof response.result.nextPageToken !== 'undefined') {
                nextPageToken = response.result.nextPageToken;
                var nextVis = nextPageToken ? 'visible' : 'hidden';
                $('#next-button').css('visibility', nextVis);
                prevPageToken = response.result.prevPageToken
                var prevVis = prevPageToken ? 'visible' : 'hidden';
                $('#prev-button').css('visibility', prevVis);
            }
            if (typeof response.result !== 'undefined')
                $scope.playlistItems = response.result.items;
            //ready to load videos for each Lib
            ////$.each(response.result.items, function (k, todo) {

            ////    $scope.getVideoLibray(todo.id);

            ////});
            
        });
    };

    //youtube.playlistItems.list
    $scope.getVideoLibray = function (listId) {

        var request = gapi.client.youtube.playlistItems.list({
            'mine': true,
            'part': 'snippet',
            'playlistId':listId,
            'maxResults': 50
            
        });
        request.execute(function (response) {
            console.log('OK from youtube.playlistItems.list' + response);
            $scope.videoListDefault(response);
            if (!$scope.$$phase) { $scope.$apply(); }
        });


    };

    $scope.loadAPIClientInterfaces = function () {

        gapi.client.load('youtube', 'v3', function () {
            
            $scope.requestVideoPlaylist();

        });
      
       

    };

   

    

}]);