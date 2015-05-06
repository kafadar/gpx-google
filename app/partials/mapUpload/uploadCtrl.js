/**
 * Created by raven on 5/5/2015.
 */
angular.module('gpx').controller('UploadCtrl', function ($scope, $state, FileUploader, markerStorage) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'gpx'
    });

    $scope.fileName = markerStorage.getMarkers() ? markerStorage.getMarkers().name : "Filetype not supported";
    $scope.error;
    $scope.loadedMap = function () {
        return markerStorage.gotMarkers();
    }
    $scope.deleteMarkers = function () {
        markerStorage.removeMarkers();
    }
    $scope.cancel = function () {
        if(uploader.isUploading){
            uploader.cancelAll();
        }
        uploader.clearQueue();
    }

    uploader.onWhenAddingFileFailed = function (item, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
        //console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function (fileItem, progress) {
        //console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
        //console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        markerStorage.setMarkers(response);
        $scope.error = null;
        $state.go('map');
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
        $scope.error = response.message;
        uploader.clearQueue();
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        //console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function () {
        //console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
});