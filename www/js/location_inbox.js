angular.module('location_inbox', [])

        .controller('LocationInboxCtrl', function ($ionicPopup, $ionicLoading, LocationInbox, $window, $scope) {
            $scope.content = {};
            LocationInbox.locationsinbox($window.localStorage.getItem("id")).success(function (data) {
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
        ;