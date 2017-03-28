oplApp.factory('cursistFactory', ['$resource', function ($resource) {
        var Cursist = $resource('/api/cursisten/:id',
                {
                    id: '@_id'},
                {
                    update: {
                        method: 'PUT'
                    }
                }
        );

        /*Cursist.prototype.update = function (cb) {
         return Cursist.update({
         id: this.id
         }, angular.extend({}, this, {
         _id: undefined
         }), cb);
         };*/

        return Cursist;
    }]);


oplApp.factory('opleidingFactory', ['$resource', function ($resource) {
        var Opleiding = $resource('/api/opleidingen/:id',
                {
                    id: '@_id',
                    update: {
                        method: 'PUT'
                    }
                });
        Opleiding.prototype.update = function (cb) {
            return Opleiding.update({
                id: this.id
            }, angular.extend({}, this, {
                _id: undefined
            }), cb);
        };
        return Opleiding;
    }]);

oplApp.factory('gevolgdeFactory', ['$resource', function ($resource) {
        var Gevolgde = $resource('/api/cursisten/:curId/opleidingen/:oplId',
                {
                    curId: '@curId',
                    oplId: '@oplId'

                },
                {
                    'update':
                            {
                                method: 'PUT'
                            }
                });
        /*Gevolgde.prototype.update = function (cb) {
         return Gevolgde.update({
         curId: this.curId,
         oplId: this.oplId
         }, angular.extend({}, this, {
         _id: undefined
         }), cb);
         };*/
        return Gevolgde;
    }]);
