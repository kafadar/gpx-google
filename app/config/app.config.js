'use strict';

angular.module('gpx').config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '../partials/home.html'
    }).state('map', {
        url: '/map',
        templateUrl: '../partials/mapView/map.html',
        controller: 'MapCtrl'
    }).state('upload', {
        url: '/upload',
        templateUrl: '../partials/mapUpload/upload.html',
        controller: 'UploadCtrl'
    });
})
