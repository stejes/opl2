oplApp.controller('mainController', ['$scope', '$http', 'cursistFactory', 'opleidingFactory', function ($scope, $http, $cursistFactory, $opleidingFactory) {
        //$scope.formData = {};
        $scope.formData = new $cursistFactory();


        $scope.cursisten = $cursistFactory.query();


        $scope.opleidingen = $opleidingFactory.query();

        // when submitting the add form, send the text to the node API
        $scope.createCur = function () {
//$scope.formData = new $cursistFactory();
            $scope.formData.$save();
            $scope.cursisten = $cursistFactory.query();
            $scope.formData = {};
            $scope.formData = new $cursistFactory();

        };



        // delete a todo after checking it
        $scope.deleteCur = function (id) {

            $cursistFactory.delete({id: id});
            $scope.cursisten = $cursistFactory.query();
        };




    }]);

oplApp.controller('detailController', ['$scope', '$routeParams', '$http', 'cursistFactory', 'opleidingFactory', 'gevolgdeFactory', function ($scope, $routeParams, $http, $cursistFactory, $opleidingFactory, $gevolgdeFactory) {
        //$scope.formData = {};
        $scope.melding = "";
        console.log();

        $scope.cursist = $cursistFactory.get({id: $routeParams.cursist_id});



        $scope.opleidingen = $opleidingFactory.query();

        $scope.createGevolgde = function () {
            $scope.melding = "";
            //$scope.cursist.opleidingen.push({opleiding: $scope.formData.id, startdatum: $scope.formData.startdatum});
            $scope.cursist = $gevolgdeFactory.save({curId: $routeParams.cursist_id, oplId: $scope.formData.id}, {startdatum: $scope.formData.startdatum});

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

        $scope.maakGeslaagd = function (id, gevolgdeId) {
            $scope.cursist = $cursistFactory.update({id: $routeParams.cursist_id}, {gevolgdeId: gevolgdeId});
        }

        $scope.editCursist = function () {
            $scope.cursist = $cursistFactory.update({id: $routeParams.cursist_id}, $scope.cursist);
        }





    }]);

oplApp.controller('oplController', ['$scope', '$http', 'opleidingFactory', function ($scope, $http, $opleidingFactory) {

        $scope.formData = new $opleidingFactory();

        $scope.opleidingen = $opleidingFactory.query();

        // when submitting the add form, send the text to the node API
        $scope.createOpl = function () {


            $scope.formData.$save();
            
            $scope.opleidingen = $opleidingFactory.query();
            
            $scope.formData = new $opleidingFactory();
        };



        // delete a todo after checking it
        $scope.deleteOpl = function (id) {

            $opleidingFactory.delete({id: id})
            $scope.opleidingen = $opleidingFactory.query();
        };
        //$scope.formData = {};


    }]);

oplApp.controller('oplDetailController', ['$scope', '$routeParams', '$http', 'opleidingFactory', function ($scope, $routeParams, $http, $opleidingFactory) {

        $scope.opleiding = $opleidingFactory.get({id: $routeParams.opleiding_id});
        $scope.editOpleiding = function () {
            $scope.opleiding = $opleidingFactory.update({id: $routeParams.opleiding_id}, $scope.opleiding);
        };
    }]);