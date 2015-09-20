angular.module('location_details', [])
        .controller('LocationDetailsCtrl', function (myfriends, $window, LocationDetails, $ionicLoading, $scope, $stateParams, $ionicModal, $ionicPopup) {
            $scope.content = {};
            $scope.rating = 1;
//            $scope.content.location_details.cover_photo_url = "http://localhost/solo_travel/backend/web/uploads/marker.png";
            $ionicLoading.show({
                content: 'Sharing LM Code ...',
                noBackdrop: false,
                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
            });
            LocationDetails.getlocationdetails($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.content.location_details = data.location_details[0];
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });
            LocationDetails.getlocationfootprint($stateParams.location_id).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.friends = data.footprints;
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });
            $scope.showAddFootPrintConfirm = function () {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Are You Sure?',
                    template: 'Do you want to add this Footprint?'
                });
                confirmPopup.then(function (res) {
                    if (res) {

                        var geoSettings = {
                            frequency: 500,
                            timeout: 3000,
                            enableHighAccuracy: true // may cause errors if true
                        };
                        $ionicLoading.show({
                            content: 'Sharing LM Code ...',
                            noBackdrop: false,
                            template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                        });
                        navigator.geolocation.getCurrentPosition(function (pos) {
                            $ionicLoading.hide();
                            LocationDetails.addfootprint($stateParams.location_id, $window.localStorage.getItem("id"), pos.coords.latitude, pos.coords.longitude).success(function (data) {
                                $ionicLoading.hide();
                                if (data.Success === "False") {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Alert',
                                        template: data.Message
                                    });
                                } else {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Footprint',
                                        template: 'Footprint Added successfully !'
                                    });
                                    alertPopup.then(function (res) {
                                        LocationDetails.getlocationdetails($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                                            $ionicLoading.hide();
                                            if (data.Success === "False") {
                                                var alertPopup = $ionicPopup.alert({
                                                    title: 'Alert',
                                                    template: data.Message
                                                });
                                            } else {
                                                $scope.content.location_details = data.location_details[0];
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
                        }, function (error) {
                            $ionicLoading.hide()
//                            alert('Unable to get location: ' + error.message);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error!',
                                template: "Please Check your GPS setting !!!"
                            });
                        }, geoSettings);

                    } else {
                        console.log('No');
                    }
                });

            };
            $scope.showRemoveFootPrintConfirm = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Are You Sure?',
                    template: 'Do you want to remove this Footprint?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        LocationDetails.removefootprint($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                            $ionicLoading.hide();
                            if (data.Success === "False") {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: data.Message
                                });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Footprint',
                                    template: 'Footprint Added successfully !'
                                });
                                alertPopup.then(function (res) {
                                    LocationDetails.getlocationdetails($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                                        $ionicLoading.hide();
                                        if (data.Success === "False") {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Alert',
                                                template: data.Message
                                            });
                                        } else {
                                            $scope.content.location_details = data.location_details[0];
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
                    } else {
                        console.log('No');
                    }
                });

            };
            $scope.showAddFavoriteConfirm = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Are You Sure?',
                    template: 'Do you want to add this Favorite?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        LocationDetails.addfavorite($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                            $ionicLoading.hide();
                            if (data.Success === "False") {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: data.Message
                                });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Favorite',
                                    template: 'Favorite Added successfully !'
                                });
                                alertPopup.then(function (res) {
                                    LocationDetails.getlocationdetails($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                                        $ionicLoading.hide();
                                        if (data.Success === "False") {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Alert',
                                                template: data.Message
                                            });
                                        } else {
                                            $scope.content.location_details = data.location_details[0];
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
                    } else {
                        console.log('No');
                    }
                });

            };
            $scope.showRemoveFavoriteConfirm = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Are You Sure?',
                    template: 'Do you want to remove this Favorite?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        LocationDetails.removefavorite($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                            $ionicLoading.hide();
                            if (data.Success === "False") {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: data.Message
                                });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Footprint',
                                    template: 'Footprint Added successfully !'
                                });
                                alertPopup.then(function (res) {
                                    LocationDetails.getlocationdetails($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                                        $ionicLoading.hide();
                                        if (data.Success === "False") {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Alert',
                                                template: data.Message
                                            });
                                        } else {
                                            $scope.content.location_details = data.location_details[0];
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
                    } else {
                        console.log('No');
                    }
                });

            };
            $scope.showRating = function () {
                $ionicPopup.show({
                    template: '<div ng-init="rating =' + $scope.content.location_details.rating + '"></div><div class="star-rating" star-rating rating-value="rating" data-max="5" on-rating-selected="rateFunction(rating)" style=" font-size: 35px; text-align: center; "></div>',
                    title: 'Rate this location',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function () {
                                var geoSettings = {
                                    frequency: 500,
                                    timeout: 3000,
                                    enableHighAccuracy: true // may cause errors if true
                                };
                                $ionicLoading.show({
                                    content: 'Sharing LM Code ...',
                                    noBackdrop: false,
                                    template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                                });
                                navigator.geolocation.getCurrentPosition(function (pos) {
                                    $ionicLoading.hide();
                                    LocationDetails.addlocationrating($stateParams.location_id, $window.localStorage.getItem("id"), $scope.rating, pos.coords.latitude, pos.coords.longitude).success(function (data) {
                                        $ionicLoading.hide();
                                        if (data.Success === "False") {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Alert',
                                                template: data.Message
                                            });
                                        } else {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Footprint',
                                                template: 'Location rate successfully !'
                                            });
                                            alertPopup.then(function (res) {
                                                LocationDetails.getlocationdetails($stateParams.location_id, $window.localStorage.getItem("id")).success(function (data) {
                                                    $ionicLoading.hide();
                                                    if (data.Success === "False") {
                                                        var alertPopup = $ionicPopup.alert({
                                                            title: 'Alert',
                                                            template: data.Message
                                                        });
                                                    } else {
                                                        $scope.content.location_details = data.location_details[0];
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
                                }, function (error) {
                                    $ionicLoading.hide()
//                            alert('Unable to get location: ' + error.message);
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Error!',
                                        template: "Please Check your GPS setting !!!"
                                    });
                                }, geoSettings);

                            }
                        }
                    ]
                });
                $scope.rateFunction = function (rating)
                {
                    $scope.rating = rating;
                    console.log(rating);
                };
            };
            myfriends.myfriends($window.localStorage.getItem("id")).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.items = data.friends;
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });

            $scope.sharelocation = function () {
                $scope.share_location_modal.hide();
                $ionicLoading.show({
                    content: 'Sharing LM Code ...',
                    noBackdrop: false,
                    template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                });
                LocationDetails.sharelocation($stateParams.location_id, $window.localStorage.getItem("id"), $scope.content.id).success(function (data) {
                    $ionicLoading.hide();
                    if (data.Success === "False") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Alert',
                            template: data.Message
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Share Location',
                            template: 'Location shared successfully !'
                        });
                        alertPopup.then(function (res) {
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
            $scope.map_show = function () {
                console.log("map");
                $scope.view_location_on_map.show();
                var mapOptions = {
                    zoom: 16,
                    center: new google.maps.LatLng(40.0000, -98.0000),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                }

                var map = new google.maps.Map(document.getElementById('fest_map'), mapOptions);
                var gmarkers = [];
                var marker = new google.maps.Marker({
                    draggable: true,
                    map: map,
                    title: "Your location",
                });
                var myLatlng = new google.maps.LatLng($scope.content.location_details.lat, $scope.content.location_details.lng);
                map.setCenter(myLatlng);
                marker.setPosition(myLatlng);
            }
            $ionicModal.fromTemplateUrl('view/location_details/view_location_on_map.html', function ($ionicModal) {
                $scope.view_location_on_map = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });

            $ionicModal.fromTemplateUrl('view/location_details/rate_location.html', function ($ionicModal) {
                $scope.rate_location_modal = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });

            $ionicModal.fromTemplateUrl('view/location_details/share_location.html', function ($ionicModal) {
                $scope.share_location_modal = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });

            $ionicModal.fromTemplateUrl('view/location_details/friends.html', function ($ionicModal) {
                $scope.friends_modal = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });
        });

