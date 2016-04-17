// Ionic hom app

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'homApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var homApp = angular.module('homApp', ['ionic', 'ngCordova', 'homApp.controllers', 'homApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignUpCtrl'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'SignInCtrl'
  })
  .state('setup-scan', {
    url: '/setup-scan',
    templateUrl: 'templates/setup-scan.html',
    controller: 'SetupScanCtrl'
  })
  .state('setup-connect', {
    url: '/setup-connect',
    templateUrl: 'templates/setup-connect.html',
    controller: 'SetupConnectCtrl'
  })

  //Here to integrate tabs functionality --start
 .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
 .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
 .state('tab.dashdetails', {
    url: '/dash/dashdetails',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-parking-details.html'        
      }
    }
  })
 .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html'
        //controller: 'ProfileCtrl'
      }
    }
  })
.state('tab.favorite', {
    url: '/favorite',
    views: {
      'tab-favorite': {
        templateUrl: 'templates/tab-favorite.html',
        //controller: 'FavoriteCtrl'
      }
    }
  })

.state('tab.reservation', {
    url: '/reservation',
    views: {
      'tab-reservation': {
        templateUrl: 'templates/tab-reservation.html',
        controller: 'ReservationCtrl'
      }
    }
  })
.state('tab.chat-detail', {
      url: '/reservation/:chatId',
      views: {
        'tab-reservation': {
          templateUrl: 'templates/chat-detail.html',
          //controller: 'ChatDetailCtrl'
        }
      }
    })

.state('tab.alert', {
    url: '/alert',
    views: {
      'tab-alert': {
        templateUrl: 'templates/tab-alert.html',
        //controller: 'AlertCtrl'
      }
    }
  })

  //--Tabs End
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.dashboard', {
    url: '/dashboard',
    views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        }
    }
  })
  .state('app.rooms', {
    url: '/rooms',
    views: {
        'menuContent': {
          templateUrl: 'templates/rooms.html',
          controller: 'RoomsCtrl'
        }
    }
  })
  .state('app.things', {
    url: '/things',
    views: {
        'menuContent': {
          templateUrl: 'templates/things.html',
          controller: 'ThingsCtrl'
        }
    }
  })
  .state('app.things.locks', {
    url: '/locks',
    views: {
        'menuContent@app': {
          templateUrl: 'templates/locks.html',
          controller: 'LocksCtrl'
        }
    }
  })
  .state('app.things.lock-details', {
    url: '/locks/:lockId',
    views: {
        'menuContent@app': {
          templateUrl: 'templates/lock-details.html',
          controller: 'LockDetailsCtrl'
        }
    }
  })
  .state('app.things.add-newdevice', {
    url: '/add-newdevice',
    views: {
        'menuContent@app': {
          templateUrl: 'templates/add-newdevice.html',
          controller: 'AddNewDeviceCtrl'
        }
    }
  })
  .state('app.things.add-connect', {
    url: '/add-connect',
    views: {
        'menuContent@app': {
          templateUrl: 'templates/add-connect.html',
          controller: 'AddConnectCtrl'
        }
    }
  })
  .state('app.room-details', {
    url: '/rooms/:roomId',
    views: {
        'menuContent@app': {
          templateUrl: 'templates/room-details.html',
          controller: 'RoomDetailsCtrl'
        }
    }
  });

  $urlRouterProvider.otherwise("/");

  // check browser support
  /*if(window.history && window.history.pushState) {
	  $locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
	  });
  }*/
}])
