// public/core.js
var oplApp = angular.module('oplApp', ['ngRoute', 'ngResource']);

oplApp.config(function ($routeProvider) {
    $routeProvider
            .when('/opleidingen/:opleiding_id', {
                controller: "oplDetailController",
                templateUrl: "partials/oplDetail.html"
            })
            .when('/opleidingen', {
                controller: "oplController",
                templateUrl: "partials/opleidingen.html"
            })
            .when('/cursisten/:cursist_id', {
                controller: "detailController",
                templateUrl: "partials/curDetail.html"
            })
            .when('/', {
                controller: "mainController",
                templateUrl: "partials/default.html"
            })
            .otherwise({redirectTo: '/'});
});



