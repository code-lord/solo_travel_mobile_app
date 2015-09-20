angular.module('homecontroller', [])

        .controller('HomeControll', function (Home, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
            Home.interestlocation($window.localStorage.getItem("id")).success(function (data) {
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
        })
        .controller('view_on_mapControll', function (Home, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
//            Home.interestlocation($window.localStorage.getItem("id")).success(function (data) {
//                $ionicLoading.hide();
//                if (data.Success === "False") {
//                    var alertPopup = $ionicPopup.alert({
//                        title: 'Alert',
//                        template: data.Message
//                    });
//                } else {
//                    $scope.locations = data.locations;
//                }
//
//            }).error(function (er) {
//                $ionicLoading.hide();
//                var alertPopup = $ionicPopup.alert({
//                    title: 'Alert',
//                    template: er.error
//                });
//            });
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
            var centerControlDiv = document.createElement('div');
            var centerControl = new CenterControl(centerControlDiv, map);

            centerControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
            function removeMarkers() {
                for (i = 0; i < gmarkers.length; i++) {
                    gmarkers[i].setMap(null);
                }
            }
            function CenterControl(controlDiv, map) {

                // Set CSS for the control border
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '3px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginBottom = '16%';
                controlUI.style.marginRight = '5px';
                controlUI.style.borderRadius = '50%';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to recenter the map';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '16px';
                controlText.style.padding = '5px';
                controlText.style.paddingBottom = '10px';
                controlText.style.paddingTop = '10px';
                controlText.style.paddingLeft = '12px';
                controlText.style.paddingRight = '12px';
                controlText.innerHTML = '<i class="ion-android-locate" style="font-size: 35px;color: #333333;"></i>';
                controlUI.appendChild(controlText);

                getCurrentPosition(map);
                google.maps.event.addDomListener(controlUI, 'click', function () {

                    getCurrentPosition(map);

                });

                function getCurrentPosition(map) {
                    $ionicLoading.show({
                        content: 'Sharing LM Code ...',
                        noBackdrop: false,
                        template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                    });
                    var geoSettings = {
                        frequency: 500,
                        timeout: 3000,
                        enableHighAccuracy: true // may cause errors if true
                    };

                    navigator.geolocation.getCurrentPosition(function (pos) {
                        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                        marker.setPosition(myLatlng);

                        google.maps.event.addDomListener(marker, 'dragend', function (e) {
                            $ionicLoading.show({
                                content: 'Sharing LM Code ...',
                                noBackdrop: false,
                                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                            });
                            Home.interestlocation($window.localStorage.getItem("id")).success(function (data) {
                                $ionicLoading.hide();
                                if (data.Success === "False") {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Alert',
                                        template: data.Message
                                    });
                                } else {
                                    removeMarkers();
                                    for (var i = 0; i < data.locations.length; i++)
                                    {
                                        var image = 'img/locations/marker.png';
                                        var ref_marker = new google.maps.Marker({
                                            position: new google.maps.LatLng(data.Festival[i].lat, data.Festival[i].lng),
                                            title: data.Festival[i].LMCode,
                                            address: data.Festival[i].Address,
                                            map: map,
                                            draggable: true,
                                            icon: image
                                        });
//                                    google.maps.event.addDomListener(ref_marker, 'click', function (e) {
//                                        for (i = 0; i < gmarkers.length; i++) {
//                                            gmarkers[i].setIcon('img/locations/marker.png')
//                                        }
//                                        this.setIcon('img/locations/marker.png')
//                                    });

                                        gmarkers.push(ref_marker);
                                    }
                                }

                            }).error(function (er) {
                                $ionicLoading.hide();

                            });

//                                console.log("lat " + this.getPosition().lat() + " lang" + this.getPosition().lng());
                        });
                        Home.interestlocation($window.localStorage.getItem("id")).success(function (data) {
                            $ionicLoading.hide();
                            if (data.Success === "False") {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: data.Message
                                });
                            } else {
                                removeMarkers();
                                console.log(data);
                                for (var i = 0; i < data.locations.length; i++)
                                {
                                    var image = 'img/locations/marker.png';
                                    var ref_marker = new google.maps.Marker({
                                        position: new google.maps.LatLng(data.locations[i].lat, data.locations[i].lng),
//                                        title: data.Festival[i].LMCode,
//                                        address: data.Festival[i].Address,
                                        map: map,
//                                        draggable: true,
                                        icon: image
                                    });
//                                    google.maps.event.addDomListener(ref_marker, 'click', function (e) {
//                                        for (i = 0; i < gmarkers.length; i++) {
//                                            gmarkers[i].setIcon('img/locations/marker.png')
//                                        }
//                                        this.setIcon('img/locations/marker.png')
//                                    });

                                    gmarkers.push(ref_marker);
                                }
                            }

                        }).error(function (er) {
                            $ionicLoading.hide();

                        });
                    }, function (error) {
                        $ionicLoading.hide()
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error!',
                            template: "Please Check your GPS setting !!!"
                        });
                    }, geoSettings);
                }
            }
        })
        ;