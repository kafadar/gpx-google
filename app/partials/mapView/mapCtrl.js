/**
 * Created by raven on 5/5/2015.
 */
angular.module('gpx').controller('MapCtrl', function ($scope, markerStorage) {
    $scope.map;
    $scope.markers = [];

    var mapContainer = document.getElementById('map-canvas');
    $scope.loadMap = function () {
        var mapOptions = {
            zoom: 8,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            scaleControl: true,
            center: new google.maps.LatLng(50.43, 12.3)
        };
        $scope.map = new google.maps.Map(mapContainer, mapOptions);

        if (markerStorage.getMarkers()) {
            pushMarkers(markerStorage.getMarkers().markers);
        }
    }

    var image = {
        url: 'assets/icons/marker.png',
        size: new google.maps.Size(16, 21),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(7, 21)
    };

    function pushMarkers(marks) {
        for (var i = 0; i < marks.length; i++) {
            var location = new google.maps.LatLng(marks[i].lat, marks[i].lon);
            var marker = new google.maps.Marker({
                position: location,
                map: $scope.map,
                title: marks[i].label,
                icon: image
            });
            $scope.markers.push(marker);
        }
        $scope.map.setCenter($scope.markers[0].getPosition());
    }
})