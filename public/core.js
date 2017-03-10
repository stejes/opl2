// public/core.js
var oplApp = angular.module('oplApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/cursisten')
            .success(function (data) {
                $scope.cursisten = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    // when submitting the add form, send the text to the node API
    $scope.createCur = function () {
        $http.post('/api/cursisten', $scope.formData)
                .success(function (data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.cursisten = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // delete a todo after checking it
    $scope.deleteCur = function (id) {
        $http.delete('/api/cursisten/' + id)
                .success(function (data) {
                    $scope.cursisten = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
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

}