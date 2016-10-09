angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $http) {
  //conectarse a la red local (todos los dispositivos)
  var URL = "http://172.20.10.14:4000/m2m/applications/Central/containers/alarmContainer/contentInstances"
  $scope.LogIn = function() {
    var request = $http({
        method: "get",
        url: URL
      },
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /*Successful HTTP post request or not */
      request.success(function (data){
        if (data == '1'){
          $scope.responseMessage = "You are in";
        }
        else {
          $scope.responseMessage = "Username or Password is incorrect";
        }
      })
  }
});