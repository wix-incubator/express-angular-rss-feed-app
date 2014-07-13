angular.module('rss.controllers', []);

var WidgetCtrl = ['$scope', '$window', 'SettingsService', 'FeedService',
    function ($scope, $window, SettingsService, FeedService) {
        $scope.init = function () {
            $scope.settings = SettingsService.settings($window);
            $scope.loadFeed();
        }

        $scope.loadFeed = function () {
            FeedService.parseFeed($scope.settings.feedUrl).then(function (res) {
                $scope.title = res.data.responseData.feed.title;
                $scope.feeds = res.data.responseData.feed.entries.splice(0, $scope.settings.numOfEntries);
            });
        }
    }];

var SettingsCtrl = ['$scope', '$window', 'SettingsService', 'Settings', 'WixService', 'FeedService',
    function ($scope, $window, SettingsService, Settings, WixService, FeedService) {
        $scope.init = function () {
            $scope.settings = SettingsService.settings($window);
            $scope.applySettings();
            $scope.loadFeedMetaData();
        }

        $scope.applySettings = function () {
            $scope.$watch('settings.numOfEntries', function (val, old) {
                $scope.settings.numOfEntries = parseInt(val);
                if (old && val !== old) {
                    $scope.store();
                }
            });
        }

        $scope.loadFeedMetaData = function () {
            if ($scope.settings.connected) {
                FeedService.parseFeed($scope.settings.feedUrl).then(function (res) {
                    $scope.feed = res.data.responseData.feed;
                });
            }
        }

        $scope.connect = function (shouldConnect) {
            $scope.settings.connected = shouldConnect;
            if (shouldConnect) {
                $scope.loadFeedMetaData();
            } else {
                $scope.settings.feedUrl = 'http://rss.cnn.com/rss/edition.rss';
            }
            $scope.store();
        }

        $scope.store = function () {
            var compId = WixService.getOrigCompId();
            Settings.save({"compId": compId}, JSON.stringify({settings: JSON.stringify($scope.settings)}), function success() {
                WixService.refreshAppByCompIds(compId);
            }, function err() {
            });
        }
    }];
'use strict';

/* Directives */
var directives = angular.module('rss.directives', []);
directives.directive('ngFeedInput', ['WixService', function (WixService) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, $element, attrs, ngModel) {
            if (!ngModel) return;

            WixService.onChange('feedUrl', function (value, key) {
                if (value !== '') {
                    scope.$apply(function () {
                        scope.settings.feedUrl = value;
                    });
                }
            });
        }
    }
}]);

directives.directive('ngNumOfEntries', ['WixService', '$timeout', function (WixService, $timeout) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, $element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function () {
                $timeout(function () {
                    WixService.set('numOfEntries', scope.settings.numOfEntries)
                }, 0);
            };

            WixService.onChange('numOfEntries', function (value, key) {
                if (value !== '') {
                    scope.$apply(function () {
                        scope.settings.numOfEntries = value;
                    });
                }
            });
        }
    }
}]);





var app = angular.module('rss', ['rss.controllers', 'rss.directives', 'rss.services']);
var services = angular.module('rss.services', ['ngResource']);

services.factory('FeedService', ['$http', function ($http) {
    return {
        parseFeed: function (url) {
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

services.factory('Settings', ['$resource', '$location', function ($resource, $location) {
    return $resource('/app/settingsupdate?instance=' + $location.search().instance + "&compId=:compId");
}]);

services.factory("SettingsService", function () {
    return {
        settings: function ($window) {
            var settings = $.extend(
                {'numOfEntries': '4',
                    'feedUrl': 'http://rss.cnn.com/rss/edition.rss',
                    'connected': false
                },
                $window.settings);
            return settings;
        }
    };
});

services.factory('WixService', function () {
    return {
        getOrigCompId: function () {
            return Wix.Utils.getOrigCompId();
        },
        refreshAppByCompIds: function (compId) {
            return Wix.Settings.refreshAppByCompIds(compId);
        },
        onChange: function (key, callback) {
            return Wix.UI.onChange(key, callback);
        },
        set: function (key, value) {
            return Wix.UI.set(key, value);
        }
    }
});