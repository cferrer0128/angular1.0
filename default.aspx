<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="TodoSPA._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>A Service</title>
   
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="//view.jquerymobile.com/1.4.5/css/themes/default/jquery.mobile-1.4.5.min.css">
	<link rel="stylesheet" href="//view.jquerymobile.com/1.4.5/_assets/css/jqm-demos.css">
	<script src="//view.jquerymobile.com/1.4.5/js/jquery.js"></script>
	<script src="//view.jquerymobile.com/1.4.5/_assets/js/index.js"></script>
	<script src="//view.jquerymobile.com/1.4.5/js/jquery.mobile-1.4.5.min.js"></script>
     <script src="TodoSPA/App/Scripts/adal.js"></script>
    <script type="text/javascript">

        txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
        txt+= "<p>Browser Name: " + navigator.appName + "</p>";
        txt+= "<p>Browser Version: " + navigator.appVersion + "</p>";
        txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
        txt+= "<p>Platform: " + navigator.platform + "</p>";
        txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
        console.log("from console: " + txt);
        //navigator.appVersion
        if (txt.indexOf('Opera') === -1) {

           window.location.href = "index.html";
        }
        

</script>
     <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
       <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">AZURE SERVICES@</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">

                    <li class="ms-NavBar-item vp-NavBar-item active">
                        <a role="link" aria-label="Home" href="#/Home">
                            <div class="vp-NavBar-buttonInner">
                                <i class="vp-NavBar-icon ms-Icon--home"></i>
                                <span class="vp-NavBar-commandText ms-font-m ms-font-weight-regular ms-u-hiddenMdDown" aria-hidden="true">Home</span>
                            </div>
                        </a>
                    </li>
                    <li ><a href="#/TodoList">Todo List</a></li>
                    <li ><a href="#/UserData">User</a></li>

                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li class="dropdown-header">Nav header</li>
                            <li><a href="#">Separated link</a></li>
                            <li><a href="#">My task list</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                   <li class="ms-NavBar-item vp-NavBar-item active" id="loginId">
                        <a role="link" aria-label="Home" href="#">
                            <div class="vp-NavBar-buttonInner">
                                <i class="vp-NavBar-icon ms-Icon--person"></i>
                                <span ng-show="userInfo.isAuthenticated" ng-click="logout()" class="vp-NavBar-commandText ms-font-m ms-font-weight-regular ms-u-hiddenMdDown" aria-hidden="true">Logout</span>
                                <span ng-hide=" userInfo.isAuthenticated" ng-click="login()" class="vp-NavBar-commandText ms-font-m ms-font-weight-regular ms-u-hiddenMdDown" aria-hidden="true">Login</span>


                            </div>
                        </a>
                    </li>

                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav> </br>
      <div class="container" role="main">
        <div class="row" style="margin-top: 25px;">
        
        <div class="row" align="right" style="display:">
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0" class=""></li>
                <li data-target="#carousel-example-generic" data-slide-to="1" class=""></li>
                <li data-target="#carousel-example-generic" data-slide-to="2" class="active"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div class="item">
                    <img data-src="holder.js/1140x500/auto/#777:#555/text:First slide" alt="First slide [1140x500]" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTE0MCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMTQwIDUwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvMTE0MHg1MDAvYXV0by8jNzc3OiM1NTUvdGV4dDpGaXJzdCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1MjM3NzQwMzZkIHRleHQgeyBmaWxsOiM1NTU7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NTdwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTUyMzc3NDAzNmQiPjxyZWN0IHdpZHRoPSIxMTQwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzc3NyIvPjxnPjx0ZXh0IHg9IjM5MC41MDc4MTI1IiB5PSIyNzUuMzk2ODc1Ij5GaXJzdCBzbGlkZTwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" data-holder-rendered="true">
                </div>
                <div class="item">
                    <img data-src="holder.js/1140x500/auto/#666:#444/text:Second slide" alt="Second slide [1140x500]" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTE0MCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMTQwIDUwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvMTE0MHg1MDAvYXV0by8jNjY2OiM0NDQvdGV4dDpTZWNvbmQgc2xpZGUKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTIzNzc0NjkyMyB0ZXh0IHsgZmlsbDojNDQ0O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjU3cHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1MjM3NzQ2OTIzIj48cmVjdCB3aWR0aD0iMTE0MCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiM2NjYiLz48Zz48dGV4dCB4PSIzMzUuNjAxNTYyNSIgeT0iMjc1LjM5Njg3NSI+U2Vjb25kIHNsaWRlPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true">
                </div>
                <div class="item active">
                    <img data-src="holder.js/1140x500/auto/#555:#333/text:Third slide" alt="Third slide [1140x500]" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTE0MCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMTQwIDUwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvMTE0MHg1MDAvYXV0by8jNTU1OiMzMzMvdGV4dDpUaGlyZCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1MjM3NzQzNzhhIHRleHQgeyBmaWxsOiMzMzM7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NTdwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTUyMzc3NDM3OGEiPjxyZWN0IHdpZHRoPSIxMTQwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzU1NSIvPjxnPjx0ZXh0IHg9IjM3Ny44NjcxODc1IiB5PSIyNzUuMzk2ODc1Ij5UaGlyZCBzbGlkZTwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" data-holder-rendered="true">
                </div>
            </div>
            <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>

        <div class="row" style="display:">
            <div class="jumbotron" style="height: 100px;">
                <h1 style="text-align: -webkit-center;margin-top: -25px;">
                    Recommended for you
                </h1>

            </div>
    </div>
    
        <div class="row" align="right" style="display:">
        <div class="col-md-4" style="">
            <h3>
                Published on Nov 6, 2012 In this lesson, we begin the process of understanding
                how to utilize data in our app. We begin by looking at this from the
                GroupedItemsPage.xaml's perspective, and how it utilizes the
                CollectionViewSource to bind to a View Model provided in the LayoutAwarePage.cs
            </h3>
        </div>

        <div class="col-md-8">
            <iframe style="width:640px;height:350px"  src="https://www.youtube.com/embed/dr02rT0gBXE" type="text/html"></iframe>

        </div>
    </div>
        </div>
       
    </div>  
     
</body>
</html>
