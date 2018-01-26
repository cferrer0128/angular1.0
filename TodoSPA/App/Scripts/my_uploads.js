// Define some variables used to remember state.
var playlistId, nextPageToken, prevPageToken, query;
var gmailRespond, driveResponse;
//// After the API loads, call a function to get the uploads playlist ID.
//function handleGmailAPILoaded() {
//    requestUserUploadsEmaillistId();
//}

// After the API loads, call a function to get the uploads playlist ID.
////function handleAPILoaded() {
////    requestUserUploadsPlaylistId();
////    //requestYouTubeBroadcastList();
 
////}
//// After the API loads, call a function to get the uploads playlist ID.
//function handleDriveAPILoaded() {
//    requestUserFilesListId();
//}
/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 gapi.client.drive.files.list
 */
//Call the Data API to retrieve the playlist ID that uniquely identifies the
//// list of videos uploaded to the currently authenticated user's channel.
//function requestUserUploadsEmaillistId() {
//    // See https://developers.google.com/youtube/v3/docs/channels/list
//    var request = gapi.client.gmail.users.messages.list({
//        'userId': 'me',
//        'pageToken': nextPageToken,
//        'maxResults':10,
//        'q': query
//    });
//    request.execute(function(response) {
//        gmailRespond = response;
        
//    });
//}
// Call the Data API to retrieve the playlist ID that uniquely identifies the
// list of videos uploaded to the currently authenticated user's channel.
//youtube.liveBroadcasts.insert
//function requestUserUploadsPlaylistId() {
//  // See https://developers.google.com/youtube/v3/docs/channels/list
//  var request = gapi.client.youtube.channels.list({
//    mine: true,
//    part: 'contentDetails'
//  });
//  request.execute(function(response) {
//    playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
//    requestVideoPlaylist(playlistId);
//  });
//}
////youtube.liveBroadcasts.insert
////function requestYouTubeBroadcastList() {
////    // See https://developers.google.com/youtube/v3/docs/channels/list
   
////    var request = gapi.client.youtube.liveBroadcasts.insert({
////        part: 'snippet,status',
////        resource: {
////            snippet: {
////                title: 'Test YouTube BroadCastList',
////                description: 'A private YouTube BroadCastList with the YouTube API',
////                scheduledEndTime: "2016-03-16T21:00:00.000Z",
////                scheduledStartTime: "2016-03-15T21:00:00.000Z"
////            },
////            status: {
////                privacyStatus: 'private'
////            }
////        }
////    });
////    request.execute(function (response) {
       
////    });
////}
//// Retrieve the list of videos in the specified playlist.
//function requestVideoPlaylist(playlistId, pageToken) {
//  $('#video-container').html('');
//  var requestOptions = {
//    mine: true,
//    part: 'snippet',
//    maxResults: 10
//  };
//  if (pageToken) {
//    requestOptions.pageToken = pageToken;
//  }

//  var request = gapi.client.youtube.playlists.list(requestOptions);
//  request.execute(function(response) {
//    // Only show pagination buttons if there is a pagination token for the
//    // next or previous page of results.
//    nextPageToken = response.result.nextPageToken;
//    var nextVis = nextPageToken ? 'visible' : 'hidden';
//    $('#next-button').css('visibility', nextVis);
//    prevPageToken = response.result.prevPageToken
//    var prevVis = prevPageToken ? 'visible' : 'hidden';
//    $('#prev-button').css('visibility', prevVis);

//    playlistItems = response.result.items;
//	//getDataFRomAuth(playlistItems);
//    if (playlistItems) {
//      $.each(playlistItems, function(index, item) {
//        displayResult(item.snippet , item.id);
//      });
//    } else {
//      $('#video-container').html('Sorry you have no uploaded videos');
//    }
//  });
//}
//// Create a listing for a video.
//function displayResult(videoSnippet , listId) {
//  var title = videoSnippet.title;
//  var videoId = listId;
//  //<li role="menuitem"  class="ng-scope"><a href="" ng-click="sowClick(this)"class="ng-binding">SOW#3</a></li>
//  $('#video-container').append('<li role="menuitem"><a href="#" ng-click="playMyList('+videoId+')">' + title + '</a></li>');
//}

//// Retrieve the next page of videos in the playlist.
//function nextPage() {
//  requestVideoPlaylist(playlistId, nextPageToken);
//}

//// Retrieve the previous page of videos in the playlist.
//function previousPage() {
//  requestVideoPlaylist(playlistId, prevPageToken);
//}