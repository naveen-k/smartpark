angular.module('homApp.controllers', [])

.controller('LandingCtrl', ['$scope', '$state', 'UserService', 'RoomService', function($scope, $state, UserService, RoomService) {
	$scope.doSignUpAction = function() {
		$state.go('signup');
	};

	$scope.doSignInAction = function() {
		$state.go('signin');
	};

	RoomService.getHomeData().then(function(home) {
	});
}])

//DashController to Show Map
.controller('DashCtrl', function($scope, $state, $cordovaGeolocation) {
	$scope.doParkingDetailsAction = function() {
		$state.go('signup');
	};
  /*var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });*/
})

.controller('SignUpCtrl', ['$scope', '$state', '$ionicLoading', '$rootScope', 'UserService', function($scope, $state, $ionicLoading, $rootScope, UserService) {
  // ng-model holding values from view/html
  $scope.creds = {};

  $scope.doSignUpAction = function() {
	  $ionicLoading.show({
		  template: 'Signing up...'
	  });
	  UserService.init();
	  UserService.createUser($scope.creds).then(function (_data) {
	  	  $ionicLoading.hide();
		  $rootScope.first_name = $scope.creds.first_name;
		  $scope.user = _data;
		  $state.go('setup-scan');
		  }, function (_error) {
			  $ionicLoading.hide();
			  alert("Error Creating User Account " + _error.debug);
	  });
  };

  $scope.doGoBackAction = function() {
	  $state.go('landing');
  };
}])

.controller('SignInCtrl', ['$scope', '$state', '$ionicLoading', '$rootScope', 'UserService', function($scope, $state, $ionicLoading, $rootScope, UserService) {
  // ng-model holding values from view/html
  $scope.creds = {};

  $scope.doSignInAction = function() {
  	 //$state.go('app.dashboard');
  	 $state.go('tab.dash');
  	 return;
	  $ionicLoading.show({
		  template: 'Signing in...'
	  });
	  UserService.init();
	  UserService.login($scope.creds.email, $scope.creds.password).then(function (_response) {
		  $ionicLoading.hide();
		  $rootScope.first_name = _response.attributes.first_name;
		  $state.go('app.dashboard');
		  }, function (_error) {
			  $ionicLoading.hide();
			  alert("Error signing in " + _error.message);
	  });
  };

  $scope.doSignOutAction = function() {
	  UserService.logout().then(function (_response) {
		  // transition to next state
		  $state.go('landing');
		  }, function (_error) {
			  alert("Error signing out " + _error.message);
	  });
  };
  
  $scope.doBackAction = function() {
	  $state.go('landing');
  };
  
  $scope.doForgotPasswordAction = function() {
  };
}])



//Reservation
.controller('ReservationCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('DashboardCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', 'UserService', 'RoomService', function($scope, $state, $ionicSideMenuDelegate, UserService, RoomService) {
	$scope.homeTitle = RoomService.getRoomTitle();
	var room;
	try {
		room = RoomService.getRoom(0);
	} catch (e) {
	}
	$scope.roomTitle = room ? room.title : "";
	$scope.thermostatValue = room ? (room.thermostatValue + "°") : "";
	$scope.scene = room ? room.scene : "";

	$scope.numOfLightsOn = RoomService.getNumOfLightsOn();
	$scope.numOfLocksLocked = RoomService.getNumOfLocksLocked();
	$scope.numOfCamerasOn = RoomService.getNumOfCamerasOn();
	
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}])

.controller('AppCtrl', function($scope, $state, $rootScope, UserService) {
	$scope.$on('$ionicView.enter', function(e) {
		$scope.first_name = $rootScope.first_name;
	});
	$scope.doSignOutAction = function() {
	  UserService.logout().then(function (_response) {
		  // transition to next state
		  $state.go('landing');
		  }, function (_error) {
			  alert("Error signing out " + _error.message);
	  });
  };
})

.controller('RoomsCtrl', function($scope, $state, RoomService) {
	$scope.rooms = RoomService.getRooms();
})

.controller('RoomDetailsCtrl', function($scope, $state, $stateParams, RoomService) {
	$scope.room = RoomService.getRoomById($stateParams.roomId);
})

.controller('SetupScanCtrl', function($scope, $state, RoomService) {
	$scope.navigateToSetupConnect = function() {
		$state.go('setup-connect');
	};
})

.controller('SetupConnectCtrl', function($scope, $state, RoomService) {
	$scope.navigateToDashboard = function() {
		$state.go('app.dashboard');
	};
})

.controller('AddConnectCtrl', function($scope, $state, RoomService) {
})

.controller('AddNewDeviceCtrl', function($scope, $state, RoomService) {
})

.controller('LocksCtrl', function($scope, $state, RoomService) {
	$scope.locks = RoomService.getLocks();
})

.controller('LockDetailsCtrl', function($scope, $state, $stateParams, RoomService) {
	$scope.lock = RoomService.getLockById($stateParams.lockId);
})

.controller('ThingsCtrl', function($scope, $state, RoomService) {
	$scope.things = RoomService.getThings();
})

.controller('AddNewDeviceCtrl', function($scope, $state, RoomService) {
	$scope.navigateToAddConnect = function() {
		$state.go('app.things.add-connect');
	};
})

.controller('AddConnectCtrl', function($scope, $state, RoomService) {
})
