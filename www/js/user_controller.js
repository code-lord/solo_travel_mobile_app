angular.module('usercontroller', [])

        .controller('LoginCtrl', function ($ionicHistory, $window, $ionicLoading, Login, $ionicPopup, $scope, $state, $stateParams, $ionicSideMenuDelegate) {

            $scope.content = {};
            if ($window.localStorage.getItem("id") == null) {
            } else {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $ionicHistory.clearHistory();
                $state.go("app.home");
            }
//            $ionicSideMenuDelegate.canDragContent(false);

            $scope.login = function () {
                var username = $scope.content.username != null ? $scope.content.username : '';
                var password = $scope.content.password != null ? $scope.content.password : '';
                if (username == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login Alert',
                        template: 'Please Enter Username'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (password == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login Alert',
                        template: 'Please Enter Password'
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
                Login.loginappuser(username, password).success(function (data) {
                    $ionicLoading.hide();
                    if (data.Success === "False") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Alert',
                            template: data.Message
                        });
                    } else {
                        $window.localStorage.setItem("dob", data.Customer.dob);
                        $window.localStorage.setItem("email", data.Customer.email);
                        $window.localStorage.setItem("id", data.Customer.id);
                        $window.localStorage.setItem("phone", data.Customer.phone);
                        $window.localStorage.setItem("name", data.Customer.name);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Login Alert',
                            template: 'Login Successful !'
                        });
                        alertPopup.then(function (res) {
                            $state.go('app.home');

                        });
                    }

                }).error(function (er) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login Alert',
                        template: er.error
                    });
                });
            };

        })
        .controller('SignUpCtrl', function (Login, $ionicLoading, $ionicPopup, $scope, $state, $stateParams) {
            $scope.content = {};
            $scope.signup = function () {
                var name = $scope.content.name != null ? $scope.content.name : '';
                var username = $scope.content.username != null ? $scope.content.username : '';
                var phone = $scope.content.phone != null ? $scope.content.phone : '';
                var email = $scope.content.email != null ? $scope.content.email : '';
                var dob = $scope.content.dob != null ? $scope.content.dob : '';
                var password = $scope.content.password != null ? $scope.content.password : '';
                var pass_conf = $scope.content.pass_conf != null ? $scope.content.pass_conf : '';

                if (name == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Name'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (username == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Username'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (phone == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Phone'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (email == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Email'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (dob == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Birth Date'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (password == "")
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Password'
                    });
                    alertPopup.then(function (res) {
//                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                    return true;
                } else if (pass_conf != password)
                {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: 'Please Enter Confirm Passwod correct'
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
                Login.registerappuser(name, username, password, email, phone, dob).success(function (data) {
                    $ionicLoading.hide();
                    if (data.Success === "False") {

                        var username = data.Message.username != null ? data.Message.username : '';
                        var phone = data.Message.phone != null ? data.Message.phone : '';
                        var email = data.Message.email != null ? data.Message.email : '';
                        if (username !== "")
                        {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Message!',
                                template: data.Message.username[0]
                            });
                            return;
                        }
                        if (phone !== "")
                        {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Message!',
                                template: data.Message.phone[0]
                            });
                            return;
                        }
                        if (email !== "")
                        {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Message!',
                                template: data.Message.email[0]
                            });
                            return;
                        }

                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sign up Alert',
                            template: "Registration successfull ! Please login into the application."
                        });
                        alertPopup.then(function (res) {
                            $state.go('app.login');
                        });
                    }

                }).error(function (er) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Alert',
                        template: er.error
                    });
                });
            }
        })

        ;