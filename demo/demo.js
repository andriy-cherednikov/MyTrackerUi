var app = angular.module('MobileAngularUiExamples', [
  "ngRoute",
  "ngTouch",
  "mobile-angular-ui",
  "ui.calendar",
    "ngTouch"

]);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/',          {templateUrl: "home.html"});
  $routeProvider.when('/login',    {templateUrl: "signin.html"}); 
  $routeProvider.when('/save',    {templateUrl: "save.html"}); 
  $routeProvider.when('/calendar',    {templateUrl: "calendar.html"}); 
  $routeProvider.when('/scroll',    {templateUrl: "scroll.html"}); 
  $routeProvider.when('/toggle',    {templateUrl: "toggle.html"}); 
  $routeProvider.when('/tabs',      {templateUrl: "tabs.html"}); 
  $routeProvider.when('/accordion', {templateUrl: "accordion.html"}); 
  $routeProvider.when('/overlay',   {templateUrl: "overlay.html"}); 
  $routeProvider.when('/forms',     {templateUrl: "forms.html"});
  $routeProvider.when('/carousel',  {templateUrl: "carousel.html"});
  $routeProvider.when('/demo',  {templateUrl: "demo.html"});
});

app.service('analytics', [
  '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
    var send = function(evt, data) {
      ga('send', evt, data);
    }
  }
]);

app.directive( "carouselExampleItem", function($rootScope, $swipe){
  return function(scope, element, attrs){
      var startX = null;
      var startY = null;
      var endAction = "cancel";
      var carouselId = element.parent().parent().attr("id");

      var translateAndRotate = function(x, y, z, deg){
        element[0].style["-webkit-transform"] = "translate3d("+x+"px,"+ y +"px," + z + "px) ";
        element[0].style["-moz-transform"] = "translate3d("+x+"px," + y +"px," + z + "px) ";
        element[0].style["-ms-transform"] = "translate3d("+x+"px," + y + "px," + z + "px) ";
        element[0].style["-o-transform"] = "translate3d("+x+"px," + y  + "px," + z + "px) ";
        element[0].style["transform"] = "translate3d("+x+"px," + y + "px," + z + "px) ";
      }

      $swipe.bind(element, {
        start: function(coords) {
          endAction = null;
          startX = coords.x;
          startY = coords.y;
        },

        cancel: function(e) {
          endAction = null;
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        end: function(coords, e) {
          if (endAction == "prev") {

            translateAndRotate(0, 0, 0, 0);



          } else if (endAction == "next") {
              translateAndRotate(0, 0, 0, 0);



          }
            if (coords.x < 0)
            {
                translateAndRotate(0, 0, 0, 0);
            }


          //
          e.stopPropagation();
        },

        move: function(coords) {
          if( startX != null) {
            var deltaX = coords.x - startX;
            var deltaXRatio = deltaX / element[0].clientWidth;
            if (deltaXRatio > 0.3) {
              endAction = "next";
            } else if (deltaXRatio < -0.3){
              endAction = "prev";
            } else {
              endAction = null;
            }
            translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
          }
        }
      });
    }
});

app.controller('MainController', function($rootScope, $scope, analytics){

  $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        }
        // dayClick: $scope.alertEventOnClick,
        // eventDrop: $scope.alertOnDrop,
        // eventResize: $scope.alertOnResize
      }
    };

  $scope.eventSources = [];

  $scope.events = [
    {id: 1, show: true, icon: "fa-stethoscope", address: "123 Kings Street, Sydney", title: "Free drinks at 77!", start: new Date(2015, 5, 13, 12, 00, 00), paid:true},
    {id: 2, show: true, icon: "fa-tachometer", address: "123 Darling Habour, Sydney", title: "Garage Sale at 23 Kings Street Sydney.", start: new Date(2015, 5, 13, 14, 00, 00),  paid:false},
    {id: 3, show: true, icon: "fa-expand", address: "123 Kings Cross, Sydney", title: "Redfern Markets all day today!", start: new Date(2015, 5, 14, 12, 00, 00), paid:false},
    {id: 4, show: true, icon: "fa-stethoscope", address: "123 Hunter Street, Sydney", title: "Free beer forever IndustrieIT", start: new Date(2015, 5, 15, 11, 00, 00), paid:false},
  ]

  $scope.filterFunction = function(event){
    return event.show;
  }

  $scope.clickedItem = function(eventId){
    for (var i=0; i<$scope.events.length; i++){
      if ($scope.events[i].id == eventId){
        $scope.events[i].active = true;
        console.log($scope.events[i]);
      }  
    }
  }

  $rootScope.$on("$routeChangeStart", function(){
    $rootScope.loading = true;
  });

  $rootScope.$on("$routeChangeSuccess", function(){
    $rootScope.loading = false;
  });

  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push("Item " + i);
  }

  $scope.scrollItems = scrollItems;
  $scope.invoice = {payed: true};
  
  $scope.userAgent =  navigator.userAgent;
  $scope.chatUsers = [
    { name: "Carlos  Flowers", online: true },
    { name: "Byron Taylor", online: true },
    { name: "Jana  Terry", online: true },
    { name: "Darryl  Stone", online: true },
    { name: "Fannie  Carlson", online: true },
    { name: "Holly Nguyen", online: true },
    { name: "Bill  Chavez", online: true },
    { name: "Veronica  Maxwell", online: true },
    { name: "Jessica Webster", online: true },
    { name: "Jackie  Barton", online: true },
    { name: "Crystal Drake", online: false },
    { name: "Milton  Dean", online: false },
    { name: "Joann Johnston", online: false },
    { name: "Cora  Vaughn", online: false },
    { name: "Nina  Briggs", online: false },
    { name: "Casey Turner", online: false },
    { name: "Jimmie  Wilson", online: false },
    { name: "Nathaniel Steele", online: false },
    { name: "Aubrey  Cole", online: false },
    { name: "Donnie  Summers", online: false },
    { name: "Kate  Myers", online: false },
    { name: "Priscilla Hawkins", online: false },
    { name: "Joe Barker", online: false },
    { name: "Lee Norman", online: false },
    { name: "Ebony Rice", online: false }
  ];

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();



  $scope.eventSources = [$scope.events];


});