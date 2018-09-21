angular.module('userApp', [])
  .controller('userAppController', function ($http) {
    var userApp = this;
    var mainInfo = null;
    userApp.update = "0";

    userApp.getUser = function () {
      $http.get('/api/user').then(function (response) {
        userApp.users = []
        userApp.users = response.data;
      });
    }
    this.getUser();

    userApp.updateUser = function (user, update) {
      userApp.update = update;
      userApp.userID = user.userID;
      userApp.email = user.email;
      userApp.phoneNumber = parseInt(user.phoneNumber);
      userApp.name = user.name;
      userApp.address = user.address;
    }

    userApp.addUser = function () {
      console.log(userApp.update);
      var user = {
        "userID": userApp.userID,
        "name": userApp.name,
        "email": userApp.email,
        "phoneNumber": userApp.phoneNumber,
        "address": userApp.address,
      }
      if (userApp.update == "1") {
        $http.put('/api/user/edit', user).then(function (response) {
          alert('Success editing user ' + response.data.userID);
          userApp.getUser();
        });
      } else if (userApp.update == "0") {
        $http.post('/api/user/add', user).then(function (response) {
          alert('Success input data ' + response.data.userID);
          userApp.getUser();
        });
      }

    };

    //Angular cannot accept body from delete request
    userApp.deleteUser = function (userID) {
      console.log(userID);
      var req = {
        method: "DELETE",
        url: "/api/user",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        params: {
          "userID": userID
        }
      }
      $http(req).then(function (response) {
        if (response.data == 0) {
          alert('Delete data failed');
        } else {
          alert('Delete data successful');
          userApp.getUser();
        }
      });
    };
  });