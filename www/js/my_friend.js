angular.module('MyFriend', [])
        .controller('MyFriendsCtrl', function (myfriends, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
            $ionicLoading.show({
                content: 'Sharing LM Code ...',
                noBackdrop: false,
                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
            });
            myfriends.myfriends($window.localStorage.getItem("id")).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.friends = data.friends;
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });
        })
        .controller('FriendsInfoCtrl', function (myfriends, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
            $ionicLoading.show({
                content: 'Sharing LM Code ...',
                noBackdrop: false,
                template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
            });
            myfriends.singlefriend($stateParams.friend_id).success(function (data) {
                $ionicLoading.hide();
                if (data.Success === "False") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: data.Message
                    });
                } else {
                    $scope.content.friend = data.friend;
                }

            }).error(function (er) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: er.error
                });
            });
        })
        .controller('AddFriendsCtrl', function (myfriends, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.searchbyname = function () {
                console.log("here");
                var name = $scope.content.name != null ? $scope.content.name : '';
                if (name == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login Alert',
                        template: 'Please Enter Name to search'
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
                myfriends.searchfriend(name).success(function (data) {
                    $ionicLoading.hide();
                    if (data.Success === "False") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Alert',
                            template: data.Message
                        });
                    } else {
                        $scope.friends = data.friends;
                    }
                }).error(function (er) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert',
                        template: er.error
                    });
                });
            };
            $scope.showConfirmFriend = function (friend_id) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Are You Sure?',
                    template: 'Do you want to send a friend request?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $ionicLoading.show({
                            content: 'Sharing LM Code ...',
                            noBackdrop: false,
                            template: '<div class="row"> <div class="col"><ion-spinner icon="ripple"/></div> <div class="col col-75" style=" padding-top: 9px; ">Stand by ...</div> </div>'
                        });
                        myfriends.friendrequest($window.localStorage.getItem("id"), friend_id).success(function (data) {
                            $ionicLoading.hide();
                            if (data.Success === "False") {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: data.Message
                                });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Success',
                                    template: "Friend request sent !"
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
            $scope.content = {};

        })
        ;