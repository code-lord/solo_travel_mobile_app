angular.module('my_location', [])

        .controller('MyLocationCtrl', function ($cordovaFileTransfer, $ionicPopup, $ionicLoading, Mylocation, $window, $scope, $rootScope, $stateParams, $ionicModal, $cordovaCamera) {
            $scope.content = {};
            $scope.mapCreated = function (map) {
                $scope.map = map;
            };
            $scope.content.image = "img/locations/placeholder.png";
            $scope.content.capture = false;
            $scope.content.upload = false;
            $window.localStorage.setItem("lat", "");
            $window.localStorage.setItem("lng", "");
            $scope.images = [];
            Mylocation.mylocations($window.localStorage.getItem("id")).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.locations = data.locations;
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });
            $scope.open_addloc = function () {
                $scope.add_location_modal.show();
            }

            Mylocation.interests($window.localStorage.getItem("id")).success(function (data) {
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.interests = data.interests;
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });
            $ionicModal.fromTemplateUrl('view/mylocation/add_location.html', function ($ionicModal) {
                $scope.add_location_modal = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });
            $ionicModal.fromTemplateUrl('view/mylocation/location_on_map.html', function ($ionicModal) {
                $scope.location_on_map = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });
            $scope.takesnap = function () {
                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    targetWidth: 320,
                    targetHeight: 168,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {

                    $scope.content.image = imageData;
                    $scope.content.capture = true;
                }, function (err) {
                    // error
                    console.log(err);
                });

            }
            $scope.upload = function () {
                $ionicLoading.show({
                    content: 'Sharing LM Code ...',
                    noBackdrop: false,
                    template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                });
                var server = "http://192.168.1.8/solo_travel/backend/web/mobile/uploadpickupimage",
                        filePath = $scope.content.image;
                console.log($scope.content.image);
                var options = {
                    fileKey: "UploadForm[imageFiles]",
                    fileName: $scope.content.image.substr($scope.content.image.lastIndexOf('/') + 1),
                    chunkedMode: false,
                    mimeType: "image/jpg"
                };

                $cordovaFileTransfer.upload(server, filePath, options).then(function (result) {
                    $ionicLoading.hide();
                    if (JSON.parse(result.response).Success === "False") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Alert',
                            template: JSON.parse(result.response).Message
                        });
                    } else {
                        $scope.content.image = "http://192.168.1.8/solo_travel/backend/web" + JSON.parse(result.response).image_url;
                        $scope.content.img_abs = JSON.parse(result.response).image_url;
                        $scope.content.capture = false;
                        $scope.content.upload = true;
                    }

                }, function (err) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: JSON.stringify(err)
                    });
//                        console.log("ERROR: " + JSON.stringify(err));
                    //alert(JSON.stringify(err));
                }, function (progress) {
                    // constant progress updates
                });
            }
            $scope.addlocation = function () {

                var name = $scope.content.name != null ? $scope.content.name : '';
                var description = $scope.content.description != null ? $scope.content.description : '';
                var interest = $scope.content.interest != null ? $scope.content.interest : '';
                var lat = $window.localStorage.getItem("lat") != null ? $window.localStorage.getItem("lat") : '';
                var password = $scope.content.password != null ? $scope.content.password : '';
                var pass_conf = $scope.content.pass_conf != null ? $scope.content.pass_conf : '';

                if (name == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Location Name'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (description == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Location Description'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (interest == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Location Interest'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (!$scope.content.upload)
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Upload Location Image'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (lat == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Place GPS'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                }
                $ionicLoading.show({
                    content: 'Sharing LM Code ...',
                    noBackdrop: false,
                    template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                });
                Mylocation.addlocation(name, description, $window.localStorage.getItem("lat"), $window.localStorage.getItem("lng"), $scope.content.img_abs, interest, $window.localStorage.getItem("id")).success(function (data) {
                    $ionicLoading.hide();
                    if (data.Success === "False") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Alert',
                            template: data.Message
                        });
                    } else {
//                        $scope.locations = data.locations;
                        var alertPopup = $ionicPopup.alert({
                            title: 'Add location',
                            template: "Location Addedd Successfully"
                        });
                        alertPopup.then(function (res) {
                            $scope.add_location_modal.hide();
                            Mylocation.mylocations($window.localStorage.getItem("id")).success(function (data) {
                                $ionicLoading.hide();
                                if (data.Success === "False") {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Alert',
                                        template: data.Message
                                    });
                                } else {

                                    $scope.locations = data.locations;
                                }

                            }).error(function (er) {
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: er.error
                                });
                            });
                        });
                    }

                }).error(function (er) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: er.error
                    });
                });
            }

        })
        ;