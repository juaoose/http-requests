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

.controller('AppCtrl', function($scope, $http, $timeout) {

  $scope.data;
  $scope.dataEcg;
  $scope.dataEmg;
  $scope.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  $scope.series = ['Diastolic', 'Systolic', 'Pulse'];
  $scope.seriesEcg = ['ECG'];
  $scope.seriesEmg = ['EMG'];

  $scope.stateG1 = false;
  $scope.stateG2 = false;
  $scope.stateG3 = false;

  $scope.click1 = function(){
    $scope.stateG1 = !$scope.stateG1; 
  }

  $scope.click2 = function(){
    $scope.stateG2 = !$scope.stateG2; 
  }

  $scope.click3 = function(){
    $scope.stateG3 = !$scope.stateG3; 
  }

  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      var array;
      var alertArray;
      var emgArray;
      var ecgArray;
    //Limpio arreglo chambonisimamente
    $scope.data = [
      [],
      [],
      []
    ];

    $scope.dataEcg = [
      []
    ];

    $scope.dataEmg = [
      []
    ];

    //Esto todavia no lo he hecho pero toca...
    //JSON.parse(atob("BINARY_CONTENT_HERE").replace('\"', '').replace(/\\/g,'').replace('n"',''))
    //Contenedor de eventos importantes (por eje, temp > 37.5)
    //sudo java -jar server-sensor-0.0.1-SNAPSHOT.jar server server -sensor-develop.yml
    var URL_Alertas = 'http://172.20.10.14:4000/m2m/applications/Central/containers/alarmContainer/contentInstances/';
    var URL_Todo = 'http://172.20.10.14:4000/m2m/applications/TempSensor1/containers/presContainer/contentInstances/';
    var URL_EMG = 'http://172.20.10.14:4000/m2m/applications/TempSensor1/containers/emgContainer/contentInstances/';
    var URL_ECG = 'http://172.20.10.14:4000/m2m/applications/TempSensor1/containers/ecgContainer/contentInstances/'
    /**
     * Metodo para recibir todos los valores en los contenedores y graficar los ultimos 10.
     */
    $http({
      method: 'GET',
      url: URL_Todo
    }).then(function successCallback(response) {
      console.log('Llamado HTTP exitoso');
      array = response.data.contentInstances.contentInstanceCollection.contentInstance;
      //Cualquier valor para probar
      //$scope.response = atob(response.data.contentInstances.contentInstanceCollection.contentInstance[2].content.binaryContent);
      //Solo 10 de los valores para q no muera tan rapido
      array = array.slice(Math.max(array.length - 10, 0));
      for (var i = 0; i < array.length; i++) {
        dataContent = JSON.parse(atob(array[i].content.binaryContent).replace('\"', '').replace(/\\/g,'').replace('n"',''));
        for (var j = 0; j < dataContent.length ; j++){
          $scope.data[0].push(dataContent[j].Diastolic);
          $scope.data[1].push(dataContent[j].Systolic);
          $scope.data[2].push(dataContent[j].Pulse);
        }
      }

    }, function errorCallback(response) {
      console.log('Error al hacer el llamado HTTP');
      //$scope.response = 'Error al hacer el llamado HTTP';
    });

    /**
     * Metodo para consumir los valores del electrocardiograma
     */
    $http({
      method: 'GET',
      url: URL_ECG
    }).then(function successCallback(response) {
      console.log('Llamado HTTP exitoso');
      ecgArray = response.data.contentInstances.contentInstanceCollection.contentInstance;
      ecgArray = ecgArray.slice(Math.max(ecgArray.length - 10, 0));
      for (var i = 0; i < ecgArray.length; i++) {
        dataContent = JSON.parse(atob(ecgArray[i].content.binaryContent).replace('\"', '').replace(/\\/g,'').replace('n"',''));
        for (var j = 0; j < dataContent.length ; j++){
          $scope.dataEcg[0].push(dataContent[j].value);
        }        
      }

    }, function errorCallback(response) {
      console.log('Error al hacer el llamado HTTP');
      //$scope.response = 'Error al hacer el llamado HTTP';
    });

    /**
     * Metodo para consumir los valores del electromiograma
     */
    $http({
      method: 'GET',
      url: URL_EMG
    }).then(function successCallback(response) {
      console.log('Llamado HTTP exitoso');
      emgArray = response.data.contentInstances.contentInstanceCollection.contentInstance;
      emgArray = emgArray.slice(Math.max(emgArray.length - 10, 0));
      for (var i = 0; i < emgArray.length; i++) {
        dataContent = JSON.parse(atob(emgArray[i].content.binaryContent).replace('\"', '').replace(/\\/g,'').replace('n"',''));
        for (var j = 0; j < dataContent.length ; j++){
          $scope.dataEmg[0].push(dataContent[j].value);
        }        
      }

    }, function errorCallback(response) {
      console.log('Error al hacer el llamado HTTP');
      //$scope.response = 'Error al hacer el llamado HTTP';
    });

    /**
     * Metodo para recibir todos los valores que son categorizados como una alerta.
     */
    $http({
      method: 'GET',
      url: URL_Alertas
    }).then(function successCallback(response) {
      console.log('Llamado HTTP exitoso');

      alertArray = response.data.contentInstances.contentInstanceCollection.contentInstance;
      //Último valor
      alertArray = alertArray.slice(Math.max(alertArray.length - 1, 0));
      //El linter de CIS
      //console.log(JSON.stringify(alertArray));
      for (var i = 0; i < alertArray.length; i++) {
        dataContent1 = JSON.parse(atob(alertArray[i].content.binaryContent));
        $scope.response ='Problema con su ' + dataContent1.problem + ' con un valor de ' + dataContent1.value;
      }

    }, function errorCallback(response) {
      console.log('Error al hacer el llamado HTTP');
      //$scope.response = 'Error al hacer el llamado HTTP';
    });

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
    };

});