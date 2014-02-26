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