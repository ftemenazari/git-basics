var myApp = angular.module("myApp", ["ngRoute", "artistController"]);

myApp.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/list", {
        templateUrl: "partials/listpage.html",
        controller: "listController",
      })
      .when("/details/:itemId", {
        templateUrl: "partials/details.html",
        controller: "detailsController",
      })
      .otherwise({
        redirectTo: "/list",
      });
  },
]);

var artistController = angular.module("artistController", []);

artistController.controller("listController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $http.get("data.json").success(function (data) {
      $scope.artists = data;
      $scope.artistOrder = "name";
    });
  },
]);

artistController.controller("detailsController", [
  "$scope",
  "$http",
  "$routeParams",
  function ($scope, $http, $routeParams) {
    $http.get("data.json").success(function (data) {
      $scope.artists = data;
      $scope.whichItem = $routeParams.itemId;

      if ($routeParams.itemId > 0) {
        $scope.prevItem = Number($routeParams.itemId) - 1;
      } else {
        $scope.prevItem = $scope.artists.length - 1;
      }

      if ($routeParams.itemId < $scope.artists.length - 1) {
        $scope.nextItem = Number($routeParams.itemId) + 1;
      } else {
        $scope.nextItem = 0;
      }
    });
  },
]);
