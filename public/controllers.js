oplApp.controller('mainController', ['$scope', '$http', 'cursistFactory', function ($scope, $http, $cursistFactory) {
        //$scope.formData = {};
        $scope.formData = new $cursistFactory();

        /*$http.get('/api/cursisten')
                .then(function (res) {
                    $scope.cursisten = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });*/
        $scope.cursisten = $cursistFactory.query();

        $http.get('/api/opleidingen')
                .then(function (res) {
                    $scope.opleidingen = res.data;
                    console.log(res);
                }, function (res) {
                    console.log('Error: ' + res.statusText);
                });

        // when submitting the add form, send the text to the node API
        $scope.createCur = function () {
            
            $scope.formData.$save();
            $scope.cursisten = $cursistFactory.query();
            /*$http.post('/api/cursisten', $scope.formData)
                    .then(function (res) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.cursisten = res.data;
                        console.log(res);
                    }), function (res) {
                console.log('Error: ' + res.statusText);
            };*/
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



    }]);

oplApp.controller('detailController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        $scope.formData = {};
        $scope.melding = "";
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



        $scope.createGevolgde = function () {
            $scope.melding = "";

            $http.get('/api/cursisten/' + $routeParams.cursist_id + '/gevolgde/' + $scope.formData.oplCode)
                    .then(function (result) {
                        console.log("result: " + typeof (result) + " " + result.data);
                        if (result.data.duplicate == "no") {
                            console.log("jaja");
                            $http.post('/api/gevolgde/' + $routeParams.cursist_id, $scope.formData)
                                    .then(function (res) {
                                        $scope.cursist = res.data;
                                        console.log(res);
                                    }), function (res) {
                                console.log('Error: ' + res.statusText);
                            };
                        } else {
                            $scope.melding = "Bestaat al";
                        }
                    }), function (res) {

                /*
                 };*/
            };
            /**/
        };

        $scope.deleteGevolgde = function (curId, oplId) {
            $http.delete('/api/cursisten/' + curId + '/gevolgde/' + oplId)
                    .then(function (res) {
                        $scope.cursist = res.data;
                        console.log(res);
                    }, function (res) {
                        console.log('Error: ' + res.statusText);
                    });
        };

        $scope.emptyAlert = function () {
            $scope.melding = "";
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