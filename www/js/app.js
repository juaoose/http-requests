// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'chart.js'])
 
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
 
.controller('AppCtrl', function($scope, $http) {
  
    $scope.data;
    $scope.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    $scope.series = [];

    $scope.submit = function(){
      var array;
      //Limpio arreglo chambonisimamente
      $scope.data = [ [],
                    [],
                    []];
      //Contenedor de eventos importantes (por eje, temp > 37.5)
      var URL_Alertas = 'http://172.20.10.14:4000/m2m/applications/Central/containers/alarmContainer/contentInstances/';
      //Contenedor de todas las medidas que el sensor envía
      var URL_Todo = 'http://172.20.10.14:4000/m2m/applications/TempSensor1/containers/tempContainer/contentInstances/';
 
    $http({
      method: 'GET',
      url: URL_Todo
    }).then(function successCallback(response) {
    console.log('Llamado HTTP exitoso');
    array = response.data.contentInstances.contentInstanceCollection.contentInstance;
    //Cualquier valor para probar
    $scope.response = atob(response.data.contentInstances.contentInstanceCollection.contentInstance[2].content.binaryContent);
    //Solo 10 de los valores para q no muera tan rapido
    array = array.slice(Math.max(array.length - 10, 0));
    for( var i = 0; i < array.length; i++){
      dataContent = JSON.parse(atob(array[i].content.binaryContent));
      $scope.data[0].push(dataContent.temperature);
      $scope.data[1].push(dataContent.presion);      
    }

    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('Error al hacer el llamado HTTP');
    $scope.response = 'Error al hacer el llamado HTTP';
    });

    };
});

