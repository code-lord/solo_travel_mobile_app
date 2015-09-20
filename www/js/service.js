angular.module('services', [])
        .factory('Login', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    registerappuser: function (name, username, password, email, phone, dob) {
                        var post = {
                            "name": name,
                            "username": username,
                            "password": password,
                            "email": email,
                            "phone": phone,
                            "dob": dob,
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/registerappuser', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    loginappuser: function (username, password) {
                        var post = {
                            "username": username,
                            "password": password,
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/loginappuser', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('Home', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    interestlocation: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/interestlocation', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    loginappuser: function (username, password) {
                        var post = {
                            "username": username,
                            "password": password,
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/loginappuser', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('Mylocation', ['$http', 'HOST_DATA', '$cordovaFileTransfer', function ($http, $HOST_DATA, $cordovaFileTransfer) {
                return {
                    mylocations: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/mylocations', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    uploadpickupimage: function (image) {
                        var server = $HOST_DATA.HOST_NAME + "mobile/uploadpickupimage",
                                filePath = image;
                        var options = {
                            fileKey: "UploadForm[imageFiles]",
                            fileName: image.substr(image.lastIndexOf('/') + 1),
                            chunkedMode: false,
                            mimeType: "image/jpg"
                        };

                        return $cordovaFileTransfer.upload(server, filePath, options);
                    },
                    interests: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/interests', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    addlocation: function (name, description, lat, lng, cover_photo_url, interest_id, customer_id) {
                        var post = {
                            "name": name,
                            "description": description,
                            "lat": lat,
                            "lng": lng,
                            "cover_photo_url": cover_photo_url,
                            "interest_id": interest_id,
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/addlocation', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('LocationDetails', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    getlocationdetails: function (location_id, customer_id) {
                        var post = {
                            "location_id": location_id,
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/getlocationdetails', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    addfootprint: function (location_id, customer_id, user_lat, user_lng) {
                        var post = {
                            "location_id": location_id,
                            "customer_id": customer_id,
                            "user_lat": user_lat,
                            "user_lng": user_lng
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/addfootprint', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    removefootprint: function (location_id, customer_id) {
                        var post = {
                            "location_id": location_id,
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/removefootprint', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    addfavorite: function (location_id, customer_id) {
                        var post = {
                            "location_id": location_id,
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/addfavorite', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    removefavorite: function (location_id, customer_id) {
                        var post = {
                            "location_id": location_id,
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/removefavorite', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    addlocationrating: function (location_id, customer_id, rating, user_lat, user_lng) {
                        var post = {
                            "location_id": location_id,
                            "customer_id": customer_id,
                            "rating": rating,
                            "user_lat": user_lat,
                            "user_lng": user_lng
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/addlocationrating', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    sharelocation: function (location_id, customer_id, friend_id) {
                        var post = {
                            "location_id": location_id,
                            "customer_id": customer_id,
                            "friend_id": friend_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/sharelocation', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    getlocationfootprint: function (location_id) {
                        var post = {
                            "location_id": location_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/getlocationfootprint', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('MyFavorite', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    getfavorite: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/getfavorite', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('MyFootprint', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    getfootprint: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/getfootprint', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('MyInterest', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    myinterests: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/myinterests', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    singleinterestlocation: function (interest_id) {
                        var post = {
                            "interest_id": interest_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/singleinterestlocation', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    addmyintersts: function (customer_id, interest) {
                        var post = {
                            "customer_id": customer_id,
                            "interest": interest
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/addmyintersts', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    interests: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/interests', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('myfriends', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    myfriends: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/myfriends', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    singlefriend: function (friend_id) {
                        var post = {
                            "friend_id": friend_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/singlefriend', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    searchfriend: function (name) {
                        var post = {
                            "name": name
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/searchfriends', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                    friendrequest: function (customer_id, friend_id) {
                        var post = {
                            "customer_id": customer_id,
                            "friend_id": friend_id,
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/friendrequest', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .factory('LocationInbox', ['$http', 'HOST_DATA', function ($http, $HOST_DATA) {
                return {
                    locationsinbox: function (customer_id) {
                        var post = {
                            "customer_id": customer_id
                        };
                        return $http.post($HOST_DATA.HOST_NAME + 'mobile/locationsinbox', post, {
                            headers: {
                                'api-solo-travel-API-KEY-ANDROID': $HOST_DATA.API_KEY,
                            }
                        });
                    },
                }
            }])
        .value('HOST_DATA', {
            HOST_NAME: 'http://192.168.1.8/solo_travel/backend/web/',
            API_KEY: 'SOLO_TRAVEL_ANDROID'
        })
        ;
