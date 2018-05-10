const myApp = angular.module('listingApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'AddListingController as vm'
    }).when('/rent', {
        templateUrl: 'views/rent.html',
        controller: 'ListingController as vm'
    }).when('/sale', {
        templateUrl: 'views/rent.html',
        controller: 'SaleController as vm'
    }).otherwise({redirectTo: '/'});
}]);



