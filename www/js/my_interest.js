angular.module('MyInterest', [])
        .controller('MyInterestCtrl', function ($ionicModal, MyInterest, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
            $ionicLoading.show({
                content: 'Sharing LM Code ...',
                noBackdrop: false,
                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
            });
            MyInterest.myinterests($window.localStorage.getItem("id")).success(function (data) {
                $ionicLoading.hide();
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
            $scope.saveinterest = function () {
                $ionicLoading.show({
                    content: 'Sharing LM Code ...',
                    noBackdrop: false,
                    template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                });
                MyInterest.addmyintersts($window.localStorage.getItem("id"), $scope.items).success(function (data) {
                    $ionicLoading.hide();
                    if (data.Success === "False") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Alert',
                            template: data.Message
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: "Interest added successfull!"
                        });
                        alertPopup.then(function (res) {
                            $scope.add_interest_modal.hide();
                            $ionicLoading.show({
                                content: 'Sharing LM Code ...',
                                noBackdrop: false,
                                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                            });
                            MyInterest.myinterests($window.localStorage.getItem("id")).success(function (data) {
                                $ionicLoading.hide();
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
//                        console.log('Thank you for not eating my delicious ice cream cone');
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
            MyInterest.interests($window.localStorage.getItem("id")).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.items = data.interests;
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });

            $ionicModal.fromTemplateUrl('view/myinterest/add_interest.html', function ($ionicModal) {
                $scope.add_interest_modal = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });
        })
        .controller('SingleInterestLocationCtrl', function (MyInterest, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
            $ionicLoading.show({
                content: 'Sharing LM Code ...',
                noBackdrop: false,
                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
            });
            MyInterest.singleinterestlocation($stateParams.interest_id).success(function (data) {
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