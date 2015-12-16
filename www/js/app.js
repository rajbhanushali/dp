angular.module('ionicApp', ['ionic', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/signup/home.html',
      controller: 'HomeCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'templates/signup/signin.html',
      controller: 'SignInCtrl'
    })
    .state('newUserPic', {
      url: '/newUserPic',
      templateUrl: 'templates/signup/newUserPic.html',
      controller: 'nupCtrl'
    })
    .state('userInfo', {
      url: '/userInfo',
      templateUrl: 'templates/signup/userInfo.html',
      //controller: 'userInfoCtrl'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.maps', {
      url: '/maps',
      views: {
        'maps-tab': {
          templateUrl: 'templates/maps.html',
          controller: 'MapsTabCtrl'
        }
      }
    })
    .state('tabs.settings', {
      url: '/settings',
      views: {
        'settings-tab': {
          templateUrl: 'templates/settings.html'
        }
      }
    })
    .state('tabs.doglist', {
      url: '/doglist',
      views: {
        'doglist-tab': {
          templateUrl: 'templates/doglist.html',
          controller: "DogListCtrl"
        }
      }
    });


   $urlRouterProvider.otherwise('/home');

})

.controller('HomeCtrl', function($scope, $state) {
  console.log("HomeCtrl fired");

  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tabs.maps');
  };

})

.controller('SignInCtrl', function($scope, $state){

  console.log("hai");

  $scope.emailNextStep = function(user){
    console.log(user);
    $state.go('tabs.maps');
  };

  $scope.takeProfilePic = function(){
    console.log("test");
  }

})

.controller('nupCtrl', function($scope, $state){
  $scope.takeProfilePic = function(){
    console.log("namasr");
    $scope.showNext = true;
  }
  $scope.afterPic = function(){
    $state.go('userInfo');
  }
})

.controller('MapsTabCtrl', function($scope, $ionicLoading, $compile, $state, $cordovaGeolocation, $ionicPopup) {

  $scope.showPopup = function() {
  $scope.data = {}

  function geocodeAddress(address, mapObject){
      var geocoder = new google.maps.Geocoder();
         geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        mapObject.setCenter(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

  }

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.location">',
    title: 'Oops, we couldn\'t find you!',
    subTitle: 'Please enter an address or location!',
    scope: $scope,
    buttons: [
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.location) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
            console.log($scope.data.location);
          } else {
            return $scope.data.location;
            geocodeAddress($scope.data.location, $scope.map);
          }
        }
      }
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
    geocodeAddress(res, $scope.map);

  });
 };

  console.log('HomeTabCtrl fired');
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  //$cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(/*position.coords.latitude*/1, /*position.coords.longitude*/1);
 
    var mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      $ionicLoading.hide();
      var updatePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.map.panTo(updatePos);
      //$scope.showPopup();

  }, function(error){
    $ionicLoading.hide();
    console.log("Could not get location");
    $scope.showPopup();
  });



})

.controller('AppBarCtrl', function($scope){

  console.log("AppBarCtrl fired");

})

.controller('DogListCtrl', function($scope){

  console.log("AboutCtrl fired");
  $scope.items = [
                  {name: "Kaya", age:"15", image:"http://www.ytv.com/sites/default/files/dog-instagram-ciscolo-lgn-76846305.jpg"},
                  {name: "Michael", age:"42", image:"http://media4.popsugar-assets.com/files/2014/04/01/009/n/1922243/9decf0e7ac73fe78_Champ-Candice.xxxlarge/i/Candice-Champ-Instagram.jpg"},
                  {name: "Bobby", age:"43", image:"http://barkpost.com/wp-content/uploads/2014/05/99ab9cd86dca11e380231275875ebd20_8.jpg"},
                  {name: "Deol", age:"24", image:"http://lynnandtonic.com/images/blog/instagram-dogs.jpg"}
                 ];

})



