angular.module('starter.directives', [])

        .directive('map', function ($ionicLoading, $ionicPopup, $window) {
            return {
                restrict: 'E',
                scope: {
                    onCreate: '&'
                },
                link: function ($scope, $element, $attr) {


                    function initialize() {
                        var mapOptions = {
                            center: new google.maps.LatLng(18.520430, 73.856744),
                            zoom: 16,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        var map = new google.maps.Map($element[0], mapOptions);
                        gmarkers = [];
                        marker = new google.maps.Marker({
                            draggable: true,
                            map: map,
                            title: "Your location",
                        });

                        var centerControlDiv = document.createElement('div');
                        var centerControl = new CenterControl(centerControlDiv, map);

                        centerControlDiv.index = 1;
                        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

                        $scope.onCreate({map: map});

                        getCurrentPosition(map);

                        // Stop the side bar from dragging when mousedown/tapdown on the map
                        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                            e.preventDefault();
                            return false;
                        });



                    }
                    function CenterControl(controlDiv, map) {

                        // Set CSS for the control border
                        var controlUI = document.createElement('div');
                        controlUI.style.backgroundColor = '#fff';
                        controlUI.style.border = '2px solid #fff';
                        controlUI.style.borderRadius = '3px';
                        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                        controlUI.style.cursor = 'pointer';
                        controlUI.style.marginBottom = '15%';
                        controlUI.style.marginRight = '10px';
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
//                            padding-bottom: 10px;
//    padding-top: 10px;
//    padding-left: 12px;
//    padding-right: 12px;
                        controlText.innerHTML = '<i class="ion-android-locate" style="font-size: 35px;color: #333333;"></i>';
                        controlUI.appendChild(controlText);


                        google.maps.event.addDomListener(controlUI, 'click', function () {

                            getCurrentPosition(map);

                        });

                    }

                    function removeMarkers() {
                        for (i = 0; i < gmarkers.length; i++) {
                            gmarkers[i].setMap(null);
                        }
                    }
                    function getCurrentPosition(map) {
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
                            $window.localStorage.setItem("lat", pos.coords.latitude);
                            $window.localStorage.setItem("lng", pos.coords.longitude);
                            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                            var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                            marker.setPosition(myLatlng);

                            google.maps.event.addDomListener(marker, 'dragstart', function (e) {
                            });
                            google.maps.event.addDomListener(marker, 'dragend', function (e) {
                                $window.localStorage.setItem("lat", this.getPosition().lat());
                                $window.localStorage.setItem("lng", this.getPosition().lng());
//                                console.log("lat " + this.getPosition().lat() + " lang" + this.getPosition().lng());
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
                    if (document.readyState === "complete") {
                        initialize();
                    } else {
                        google.maps.event.addDomListener(window, 'load', initialize);
                    }
//                    $scope.loading = $ionicLoading.show({
//                        content: 'Getting current location...',
//                        showBackdrop: false
//                    });


                }
            }
        })
        .directive('starRating',
                function () {
                    return {
                        restrict: 'A',
                        template: '<span class="rating">'
                                + ' <span ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
                                + '   <i class="icon ion-ios-star" ></i>'
                                + ' </span>'
                                + '</span>',
                        scope: {
                            ratingValue: '=',
                            max: '=',
                            onRatingSelected: '&'
                        },
                        link: function (scope, elem, attrs) {
                            var updateStars = function () {
                                scope.stars = [];
                                for (var i = 0; i < scope.max; i++) {
                                    scope.stars.push({
                                        filled: i < scope.ratingValue
                                    });
                                }
                            };

                            scope.toggle = function (index) {
                                scope.ratingValue = index + 1;
                                scope.onRatingSelected({
                                    rating: index + 1
                                });
                            };

                            scope.$watch('ratingValue',
                                    function (oldVal, newVal) {
                                        if (newVal) {
                                            updateStars();
                                        }
                                    }
                            );
                        }
                    };
                }
        )
        ;
