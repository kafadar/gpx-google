/**
 * Created by raven on 5/5/2015.
 */
angular.module('gpx').factory('markerStorage', function (localStorageService) {
    var cachedMarkers;
    var key = 'markers';
    return {
        setMarkers: function (markers) {
            cachedMarkers = markers;
            localStorageService.set(key, markers);
        },
        getMarkers: function () {
            if (!cachedMarkers)
                cachedMarkers = localStorageService.get(key);
            return cachedMarkers;
        },
        gotMarkers: function () {
            return !!this.getMarkers();
        },
        removeMarkers: function () {
            cachedMarkers = null;
            localStorageService.clearAll();
        }
    }
});