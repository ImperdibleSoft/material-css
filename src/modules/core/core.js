var materialCSS = angular.module('materialCSS', ['ngRoute']);

materialCSS.config(function($routeProvider){
    $routeProvider.when('/', {
        controller: 'commonController',
        templateUrl: 'templates/core/home.html'

    }).when('/texts', {
        controller: 'commonController',
        templateUrl: 'templates/core/texts.html'

    }).when('/icons', {
        controller: 'commonController',
        templateUrl: 'templates/core/icons.html'

    }).when('/header', {
        controller: 'commonController',
        templateUrl: 'templates/core/header.html'

    }).when('/footer', {
        controller: 'commonController',
        templateUrl: 'templates/core/footer.html'

    }).when('/navigation', {
        controller: 'commonController',
        templateUrl: 'templates/core/navigation.html'

    }).when('/buttons', {
        controller: 'commonController',
        templateUrl: 'templates/core/buttons.html'

    }).when('/lists', {
        controller: 'commonController',
        templateUrl: 'templates/core/lists.html'

    }).when('/cards', {
        controller: 'commonController',
        templateUrl: 'templates/core/cards.html'

    }).when('/layouts', {
        controller: 'commonController',
        templateUrl: 'templates/core/layouts.html'

    }).when('/dialogs', {
        controller: 'commonController',
        templateUrl: 'templates/core/dialogs.html'

    }).when('/notifications', {
        controller: 'commonController',
        templateUrl: 'templates/core/notifications.html'

    }).when('/tables', {
        controller: 'commonController',
        templateUrl: 'templates/core/tables.html'

    }).when('/forms', {
        controller: 'commonController',
        templateUrl: 'templates/core/forms.html'

    }).when('/floating-windows', {
        controller: 'commonController',
        templateUrl: 'templates/core/floating-windows.html'

    }).when('/color-classes', {
        controller: 'colorizeController',
        templateUrl: 'templates/core/color-classes.html'

    }).when('/custom-colors', {
        controller: 'colorizeController',
        templateUrl: 'templates/core/custom-colors.html'

    }).when('/color-themes', {
        controller: 'colorizeController',
        templateUrl: 'templates/core/color-themes.html'

    }).when('/theme-creator', {
        controller: 'themeCreatorController',
        templateUrl: 'templates/core/theme-creator.html'

    }).when('/tricks', {
        controller: 'commonController',
        templateUrl: 'templates/core/tricks.html'

    }).when('/about', {
        controller: 'commonController',
        templateUrl: 'templates/core/about.html'

    }).when('/support', {
        controller: 'commonController',
        templateUrl: 'templates/core/support.html'

    }).otherwise({
		redirectTo: '/'

	});
});
