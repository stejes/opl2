// public/core.js
var oplApp = angular.module('oplApp', ['ngRoute']);

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

oplApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
        $scope.formData = {};

        $http.get('/api/cursisten')
                .then(function (res) {
                    $scope.cursisten = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });

        // when submitting the add form, send the text to the node API
        $scope.createCur = function () {
            $http.post('/api/cursisten', $scope.formData)
                    .then(function (res) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.cursisten = res.data;
                        console.log(res);
                    }), function (res) {
                console.log('Error: ' + res.statusText);
            };
        };

        // delete a todo after checking it
        $scope.deleteCur = function (id) {
            $http.delete('/api/cursisten/' + id)
                    .then(function (res) {
                        $scope.cursisten = res.data;
                        console.log(res.data);
                    }), function (res) {
                console.log('Error: ' + res.statusText);
            };
        };

        /*
         // when landing on the page, get all todos and show them
         $http.get('/api/opleidingen')
         .success(function (data) {
         $scope.todos = data;
         console.log(data);
         })
         .error(function (data) {
         console.log('Error: ' + data);
         });
         
         // when submitting the add form, send the text to the node API
         $scope.createOpl = function () {
         $http.post('/api/opleidingen', $scope.formData)
         .success(function (data) {
         $scope.formData = {}; // clear the form so our user is ready to enter another
         $scope.opleidingen = data;
         console.log(data);
         })
         .error(function (data) {
         console.log('Error: ' + data);
         });
         };
         
         // delete a todo after checking it
         $scope.deleteOpl = function (id) {
         $http.delete('/api/opleidingen/' + id)
         .success(function (data) {
         $scope.opleidingen = data;
         console.log(data);
         })
         .error(function (data) {
         console.log('Error: ' + data);
         });
         };*/

    }]);

oplApp.controller('detailController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        //$scope.formData = {};
        console.log();
        $http.get('/api/cursisten/' + $routeParams.cursist_id)
                .then(function (res) {
                    $scope.cursist = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });
        $http.get('/api/opleidingen')
                .then(function (res) {
                    $scope.opleidingen = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });

        $http.get('api/gevolgde/' + $routeParams.cursist_id)
                .then(function (res) {
                    $scope.gevolgde = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });

        $scope.createGevolgde = function () {
            $http.post('/api/gevolgde/' + $routeParams.cursist_id, $scope.formData)
                    .then(function (res) {
                        $scope.gevolgde = res.data;
                        console.log(res);
                    }, function (res) {
                        console.log('Error: ' + res.statusText);
                    });
        };

    }]);

oplApp.controller('oplController', ['$scope', '$http', function ($scope, $http) {
        $scope.formData = {};

        $http.get('/api/opleidingen')
                .then(function (res) {
                    $scope.opleidingen = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });

        // when submitting the add form, send the text to the node API
        $scope.createOpl = function () {
            $http.post('/api/opleidingen', $scope.formData)
                    .then(function (res) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.opleidingen = res.data;
                        console.log(res);
                    }), function (res) {
                console.log('Error: ' + res.statusText);
            };
        };

        // delete a todo after checking it
        $scope.deleteOpl = function (id) {
            $http.delete('/api/opleidingen/' + id)
                    .then(function (res) {
                        $scope.opleidingen = res.data;
                        console.log(res.data);
                    }), function (res) {
                console.log('Error: ' + res.statusText);
            };
        };

    }]);

oplApp.controller('oplDetailController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        //$scope.formData = {};
        console.log();
        $http.get('/api/opleidingen/' + $routeParams.opleiding_id)
                .then(function (res) {
                    $scope.opleiding = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });

    }]);