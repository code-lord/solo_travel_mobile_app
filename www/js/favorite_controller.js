angular.module('MyFavorites', [])
        .controller('MyFavoritesCtrl', function (MyFavorite, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
            $ionicLoading.show({
                content: 'Sharing LM Code ...',
                noBackdrop: false,
                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
            });
            MyFavorite.getfavorite($window.localStorage.getItem("id")).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.locations = data.favorite_locations;
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