// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'services', 'usercontroller', 'homecontroller', 'my_location', 'starter.directives', 'location_details', 'MyFavorites', 'MyFootprint', 'MyInterest', 'MyFriend', 'location_inbox'])

        .run(function ($rootScope, $ionicPlatform, $ionicHistory) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
            $ionicPlatform.registerBackButtonAction(function (e) {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                }

                else if ($ionicHistory.backView()) {
                    $ionicHistory.goBack();
                }
                else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    window.plugins.toast.showShortBottom(
                            "Press back button again to exit", function (a) {
                            }, function (b) {
                    }
                    );
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
                e.preventDefault();
                return false;
            }, 101);
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        cache: false,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('app.search', {
                        url: '/search',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/search.html'
                            }
                        }
                    })

                    .state('app.browse', {
                        url: '/browse',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/browse.html',
                            }
                        }
                    })
                    .state('app.playlists', {
                        url: '/playlists',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/playlists.html',
                                controller: 'PlaylistsCtrl'
                            }
                        }
                    })

                    .state('app.login', {
                        url: '/login',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/user/login.html',
                                controller: 'LoginCtrl'
                            }
                        }
                    })

                    .state('app.forgot_password', {
                        url: '/forgot_password',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/forgot_password.html',
                                controller: 'ForgotPasswordCtrl'
                            }
                        }
                    })

                    .state('app.sign_up', {
                        url: '/sign_up',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/user/sign_up.html',
                                controller: 'SignUpCtrl'
                            }
                        }
                    })

                    .state('app.home', {
                        url: '/home',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/home/home.html',
                                controller: 'HomeControll'
                            }
                        }
                    })
                    .state('app.view_on_map', {
                        url: '/view_on_map',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/home/view_on_map.html',
                                controller: 'view_on_mapControll'
                            }
                        }
                    })
                    .state('app.my_location', {
                        url: '/my_location',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/mylocation/my_location.html',
                                controller: 'MyLocationCtrl'
                            }
                        }
                    })
                    .state('app.location_inbox', {
                        url: '/location_inbox',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/location_inbox/location_inbox.html',
                                controller: 'LocationInboxCtrl'
                            }
                        }
                    })
                    .state('app.map_view', {
                        url: '/map_view',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/map_view.html',
                                controller: 'MapViewCtrl'
                            }
                        }
                    })

                    .state('app.friends', {
                        url: '/friends',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/friend/friends.html',
                                controller: 'MyFriendsCtrl'
                            }
                        }
                    })

                    .state('app.friends_info', {
                        url: '/friends_info/:friend_id',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/friend/friends_info.html',
                                controller: 'FriendsInfoCtrl'
                            }
                        }
                    })

                    .state('app.profile', {
                        url: '/profile',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/profile.html',
                                controller: 'ProfileCtrl'
                            }
                        }
                    })

                    .state('app.location_details', {
                        url: '/location_details/:location_id',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/location_details/location_details.html',
                                controller: 'LocationDetailsCtrl'
                            }
                        }
                    })



                    .state('app.search_location', {
                        url: '/search_location',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/search_location.html',
                                controller: 'SearchLocationCtrl'
                            }
                        }
                    })

                    .state('app.add_friends', {
                        url: '/add_friends',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/friend/add_friends.html',
                                controller: 'AddFriendsCtrl'
                            }
                        }
                    })

                    .state('app.my_interest', {
                        url: '/my_interest',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/myinterest/my_interest.html',
                                controller: 'MyInterestCtrl'
                            }
                        }
                    })

                    .state('app.my_favorites', {
                        url: '/my_favorites',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/favorite/my_favorites.html',
                                controller: 'MyFavoritesCtrl'
                            }
                        }
                    })

                    .state('app.single_interest_location', {
                        url: '/single_interest_location/:interest_id',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/myinterest/single_interest_locations.html',
                                controller: 'SingleInterestLocationCtrl'
                            }
                        }
                    })

                    .state('app.my_footprints', {
                        url: '/my_footprints',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'view/footprint/my_footprints.html',
                                controller: 'MyFootprintCtrl'
                            }
                        }
                    })


                    .state('app.single', {
                        url: '/playlists/:playlistId',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/playlist.html',
                                controller: 'PlaylistCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/login');
        });
