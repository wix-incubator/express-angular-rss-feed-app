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




