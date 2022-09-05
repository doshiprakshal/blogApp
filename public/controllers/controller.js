var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("controller");


var refresh = function() {
  $http.get('/blogapp').success(function(response) {
    console.log("I got the data I requested");
    $scope.blogapp = response;
    $scope.blog = "";
  });
};

refresh();

$scope.add = function() {
  console.log($scope.blog);
  $http.post('/blogapp', $scope.blog).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/blogapp/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/blogapp/' + id).success(function(response) {
    $scope.blog = response;
  });
};  

$scope.update = function() {
  console.log($scope.blog._id);
  $http.put('/blogapp/' + $scope.blog._id, $scope.blog).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.blog = "";
}

}]);﻿