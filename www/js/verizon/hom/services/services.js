angular.module('homApp.services', [])
.service('UserService', ['$q', 'ParseConfig',
	function ($q, ParseConfig) {
		var parseInitialized  = false;
		return {
			/**
			 *
			 * @returns {*}
			 */
			init: function () {
				// if initialized, then return the activeUser
				if (parseInitialized === false) {
					Parse.initialize(ParseConfig.APPLICATION_ID, ParseConfig.JAVA_SCRIPT_KEY);
					parseInitialized = true;
					console.log("parse initialized in init function");
				}

				var currentUser = Parse.User.current();
				if (currentUser) {
					return $q.when(currentUser);
				} else {
					return $q.reject({error: "noUser"});
				}
			},
			/**
			 *
			 * @param _userParams
			 * @returns {Promise}
			 */
			createUser: function (_userParams) {
				var user = new Parse.User();
				user.set("username", _userParams.email);
				user.set("password", _userParams.password);
				user.set("email", _userParams.email);
				user.set("first_name", _userParams.first_name);
				user.set("last_name", _userParams.last_name);

				// should return a promise
				return user.signUp(null, {});
			},
			/**
			 *
			 * @param _parseInitUser
			 * @returns {Promise}
			 */
			currentUser: function (_parseInitUser) {
				// if there is no user passed in, see if there is already an
				// active user that can be utilized
				_parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

				console.log("_parseInitUser " + Parse.User.current());
				if (!_parseInitUser) {
					return $q.reject({error: "noUser"});
				} else {
					return $q.when(_parseInitUser);
				}
			},
			/**
			 *
			 * @param _user
			 * @param _password
			 * @returns {Promise}
			 */
			login: function (_user, _password) {
				return Parse.User.logIn(_user, _password);
			},
			/**
			 *
			 * @param _callback
			 * @returns {Promise}
			 */
			logout: function (_callback) {
				var defered = $q.defer();
				Parse.User.logOut();
				defered.resolve();
				return defered.promise;
			}
		}
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var records = [{
    id: 0,
    name: '28 State Street Parking Garage',
    lastText: '28 State Street',
    face: 'img/parking_garage.jpg'
  }, {
    id: 1,
    name: '28 State Street Parking Garage',
    lastText: '28 State Street',
    face: 'img/parking_garage.jpg'
  }, {
    id: 2,
    name: '28 State Street Parking Garage',
    lastText: '28 State Street',
    face: 'img/parking_garage.jpg'
  }, {
    id: 3,
    name: '28 State Street Parking Garage',
    lastText: '28 State Street',
    face: 'img/parking_garage.jpg'
  }, {
    id: 4,
    name: '28 State Street Parking Garage',
    lastText: '28 State Street',
    face: 'img/parking_garage.jpg'
  }];

  return {
    all: function() {
      return records;
    },
    remove: function(chat) {
      records.splice(records.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].id === parseInt(chatId)) {
          return records[i];
        }
      }
      return null;
    }
  };
})

.factory('RoomService', ['$http', 'ServerConfig', function($http, ServerConfig) {
	var home = {};
	var numOfLights = 0;
	var numOfLocks = 0;
	var numOfCameras = 0;

	return {
		getHomeData: function() {
			return $http.get(ServerConfig.HOME_CONFIG_DATA_URL).then(function(response) {
				home = response.data.home;
				return home;
			});
		},
		getHome: function() {
			return home;
		},
		getRoom: function(index) {
			return home.rooms[index];
		},
		getRooms: function() {
			return home.rooms;
		},
		getRoomTitle: function() {
			return home && home.title ? home.title : "";
		},
		getNumOfLightsOn: function() {
			var count = 0;
			var roomsLen = home && home.rooms ? home.rooms.length : 0;
			for(var i = 0; i < roomsLen; i++) {
				var roomLightsLen = home.rooms[i] && home.rooms[i].lights ? home.rooms[i].lights.length : 0;
				var numOfLightsOn = 0;
				for(var j = 0; j < roomLightsLen; j++) {
					numOfLights++;
					if(home.rooms[i].lights[j] && home.rooms[i].lights[j].status === 1) {
						count++;
						numOfLightsOn++;
					}
				}
				home.rooms[i].numOfLightsOn = home.rooms[i] ? numOfLightsOn : 0;
			}
			return count;
		},
		getNumOfLocksLocked: function(index) {
			var count = 0;
			var roomsLen = home && home.rooms ? home.rooms.length : 0;
			for(var i = 0; i < roomsLen; i++) {
				var roomLocksLen = home.rooms[i] && home.rooms[i].locks ? home.rooms[i].locks.length : 0;
				for(var j = 0; j < roomLocksLen; j++) {
					numOfLocks++;
					if(home.rooms[i].locks[j] && home.rooms[i].locks[j].status === 1)
						count++;
				}
			}
			return count;
		},
		getNumOfCamerasOn: function(index) {
			var count = 0;
			var roomsLen = home && home.rooms ? home.rooms.length : 0;
			for(var i = 0; i < roomsLen; i++) {
				var roomCamerasLen = home.rooms[i] && home.rooms[i].cameras ? home.rooms[i].cameras.length : 0;
				var numOfCamerasOn = 0;
				for(var j = 0; j < roomCamerasLen; j++) {
					numOfCameras++;
					if(home.rooms[i].cameras[j] && home.rooms[i].cameras[j].status === 1) {
						count++;
						numOfCamerasOn++;
					}
				}
				home.rooms[i].numOfCamerasOn = home.rooms[i] ? numOfCamerasOn : 0;
			}
			return count;
		},
		getThings: function() {
			var things = [];

			var thing = {};
			thing.title = "Thermostat";
			thing.count = 1;
			thing.iconClass = "thermostat";
			thing.link = "";
			things.push(thing);

			var thing = {};
			thing.title = "Lights";
			thing.count = numOfLights;
			thing.iconClass = "light";
			thing.link = "";
			things.push(thing);

			var thing = {};
			thing.title = "Locks";
			thing.count = numOfLocks;
			thing.iconClass = "lock";
			thing.link = "#app/things/locks";
			things.push(thing);

			var thing = {};
			thing.title = "Cameras";
			thing.count = numOfCameras;
			thing.iconClass = "camera";
			thing.link = "";
			things.push(thing);

			var thing = {};
			thing.title = "Motion";
			thing.count = 0;
			thing.iconClass = "motion";
			thing.link = "";
			things.push(thing);

			var thing = {};
			thing.title = "Security";
			thing.count = 0;
			thing.iconClass = "security";
			thing.link = "";
			things.push(thing);

			var thing = {};
			thing.title = "Garage";
			thing.count = 0;
			thing.iconClass = "garage";
			thing.link = "";
			things.push(thing);

			return things;
		},
		getLocks: function() {
			var locks = [];
			var roomsLen = home && home.rooms ? home.rooms.length : 0;
			for(var i = 0; i < roomsLen; i++) {
				var roomLocksLen = home.rooms[i] && home.rooms[i].locks ? home.rooms[i].locks.length : 0;
				for(var j = 0; j < roomLocksLen; j++) {
					var lock = home.rooms[i].locks[j];
					if(lock)
						locks.push(lock);
				}
			}
			return locks;
		},
		getLockById: function(lockId) {
			var roomsLen = home && home.rooms ? home.rooms.length : 0;
			for(var i = 0; i < roomsLen; i++) {
				var roomLocksLen = home.rooms[i] && home.rooms[i].locks ? home.rooms[i].locks.length : 0;
				for(var j = 0; j < roomLocksLen; j++) {
					var lock = home.rooms[i].locks[j];
					if(lock && lock.id == lockId)
						return lock;
				}
			}
		},
		getRoomById: function(roomId) {
			var roomsLen = home && home.rooms ? home.rooms.length : 0;
			for(var i = 0; i < roomsLen; i++) {
				if(home.rooms[i] && home.rooms[i].id == roomId)
					return home.rooms[i];
			}
		}
	}
}]);
