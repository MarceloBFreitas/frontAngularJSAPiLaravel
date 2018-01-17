clientApp.factory('HomeService', ['$http', '$resource', function($http, $resource, $httpParamSerializerJQLike){

    console.log(options.api.base_url + '/lista')
    return {
        // Produtos
        getListaProd: $resource(options.api.base_url + '/lista', {}, { method: 'GET',isArray: true }),

    }
}]);
