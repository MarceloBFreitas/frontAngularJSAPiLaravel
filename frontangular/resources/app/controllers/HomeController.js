//Orientação responsive
clientApp.controller('HomeController',['$scope','HomeService','$element', '$window', '$rootScope', '$auth', '$timeout', '$location', 'SweetAlert',
    '$state', '$uibModal',function ($scope,HomeService,$element, $window, $rootScope, $auth, $timeout, $location, SweetAlert, $state, $uibModal, ProductsService) {
    $scope.navbarCollapsed = true;
    $scope.mostracarrinho = true;
    $scope.escondecarrinho = false;
    $scope.hasRequest   = false;
    $scope.homeFilterFormData   = {};
    $scope.getResult   = {};     // set the default search/filter term
    $scope.filterOn = false;
    $scope.showPromotionBanner = true;

    $scope.listagem={};


        HomeService.getListaProd.query().$promise.then(function(resp){
            console.log(resp);
            $scope.listagem = resp;
        });




}]);
