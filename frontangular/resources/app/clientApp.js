var clientApp = angular.module('clientApp',['duScroll', 'ngResource', 'ngMask', 'oitozero.ngSweetAlert', 'satellizer', 'ui.router', 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngMessages', 'slickCarousel', 'ui.bootstrap']);

var options = {};
		options.api = {};
		options.api.base_url = 'http://localhost:8000';



clientApp.value('duScrollDuration', 2000)
  .value('duScrollOffset', 30)
  .controller('myCtrl', function($scope, $document) {
    $document.scrollTopAnimated(400).then(function() {
    });

    var someElement = angular.element(document.getElementById('some-id'));
    $document.scrollToElementAnimated(someElement);
  }
);

clientApp.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

	$locationProvider.html5Mode(true).hashPrefix('!')
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");

  $stateProvider
	.state('home', {
			url: '/home',
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
			data : {title: 'Home'}
		})
      .state('/', {
          url: '/home',
          templateUrl: 'pages/home.html',
          controller: 'HomeController',
          data : {title: 'Home'}
      })



    $authProvider.httpInterceptor = true;
    $authProvider.withCredentials = false;
    $authProvider.tokenRoot = null;
    $authProvider.baseUrl = options.api.base_url;
    $authProvider.loginUrl = options.api.base_url + '/signin';
    $authProvider.tokenName = 'access_token';
    $authProvider.tokenPrefix = 'aacd';
});

clientApp.run(['$rootScope', '$auth', '$location', '$state', function($rootScope, $auth, $location, $state) {

    $rootScope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

        if (toState.authenticate && !$auth.isAuthenticated()){
            // User isn’t authenticated
            $state.transitionTo("signin");
            event.preventDefault();
        }

        if ($auth.isAuthenticated()){
            //Load user menus
            $rootScope.name = localStorage.name.replace(/^"(.*)"$/, '$1');
            $rootScope.role = localStorage.role.replace(/^"(.*)"$/, '$1');
            $rootScope.role_id = localStorage.role_id;

            if(localStorage.user_products){
                $rootScope.user_products = localStorage.user_products;
            }
        }
    });

    //Scrrol to top aways
    $rootScope.$on("$locationChangeSuccess", function() {
        window.scrollTo(0, 0);
    });
}]);