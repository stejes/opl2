oplApp.factory('cursistFactory', ['$resource', function($resource){
        var Cursisten = $resource('/api/cursisten/:id', {id:'@_id'});
        return Cursisten;
}]);

