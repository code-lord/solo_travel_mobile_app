angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope, $state, $window, $timeout) {
            $scope.content = {};
            $scope.content.name = $window.localStorage.getItem("name");
            $scope.content.email = $window.localStorage.getItem("email");
            $scope.logout = function () {
                $window.localStorage.removeItem("dob");
                $window.localStorage.removeItem("id");
                $window.localStorage.removeItem("phone");
                $window.localStorage.removeItem("name");
                $state.go('app.login');
            }

        })
        .controller('MenuCtrl', function ($scope, $window) {

        })
        .controller('ForgotPasswordCtrl', function ($scope, $stateParams) {
        })
        .controller('RateLocationCtrl', function ($scope, $stateParams) {
        })
        .controller('SearchLocationCtrl', function ($scope, $stateParams) {
        })
        .controller('ProfileCtrl', function ($scope, $window, $ionicModal) {

            $scope.content = {};
            $scope.content.name = $window.localStorage.getItem("name");
            $scope.content.email = $window.localStorage.getItem("email");
            $scope.content.phone = $window.localStorage.getItem("phone");


            $ionicModal.fromTemplateUrl('templates/edit_profile.html', function ($ionicModal) {
                $scope.edit_profile_modal = $ionicModal;
            }, {
                // Use our scope for the scope of the modal to keep it simple
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });
        })

        ;
