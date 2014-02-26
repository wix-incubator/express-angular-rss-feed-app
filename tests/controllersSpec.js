'use strict';

describe('WidgetCtrl', function(){
    var scope, window, settingsService, feedService;

    beforeEach(module('rss'));

    beforeEach(inject(function($rootScope, $window, $controller, $q, SettingsService, FeedService){
        scope = $rootScope.$new();
        feedService = FeedService;
        settingsService = SettingsService;
        window =  {
            settings : {'numOfEntries':'4', 'feedUrl':'http://rss.cnn.com/rss/edition.rss', connected : false}
        };
        var deferred = $q.defer();
        deferred.resolve({'data': {'responseData': {'feed' : {'entries' : [{'someJSONObject' : {}}], 'title' : 'Feed Title'}}}});
        spyOn(feedService, 'parseFeed').andReturn(deferred.promise);
        $controller('WidgetCtrl', {$scope: scope, $window: window, SettingsService: settingsService, FeedService: feedService});
    }));


    it('should store settings in scope', function() {
        scope.init();
        expect(scope.settings).toEqual(window.settings);
    });

    it('should get feed', function() {
        scope.init();
        scope.$apply();
        expect(scope.title).toEqual('Feed Title');
        expect(scope.feeds).toEqual([{'someJSONObject' : {}}]);
    })
});

describe('SettingsCtrl', function(){
    var scope, window, settingsService, settings, wixService, feedService, $httpBackend, compile;

    beforeEach(module('rss'));

    beforeEach(inject(function($rootScope, $window, _$httpBackend_, $controller, $q, $compile, SettingsService, Settings, FeedService){
        scope = $rootScope.$new();
        settingsService = SettingsService;
        settings = Settings;
        feedService = FeedService;
        window =  {
            settings : {'numOfEntries':'4', 'feedUrl':'http://rss.cnn.com/rss/edition.rss', connected : false}
        };
        $httpBackend = _$httpBackend_;
		compile = $compile;
        var deferred = $q.defer();
        deferred.resolve({'data': {'responseData': {'feed' : {'entries' : [{'someJSONObject' : {}}], 'title' : 'Feed Title'}}}});
        spyOn(feedService, 'parseFeed').andReturn(deferred.promise);
        wixService = jasmine.createSpyObj('wixService', ['initialize', 'getOrigCompId', 'refreshAppByCompIds', 'onChange', 'set']);

        $controller('SettingsCtrl', {$scope: scope, $window: window, SettingsService: settingsService, Settings: settings, WixService : wixService});
    }));


    it('should store settings in scope', function() {
        scope.init();
        expect(scope.settings).toEqual(window.settings);
    });

    it('should set user as connected when user enters feed url', function() {
        scope.init();
        scope.connect(true);
        expect(scope.settings.connected).toBeTruthy();
    })

    it('should set user as not connected when user clicks disconnect', function() {
        scope.init();
        scope.connect(false);
        expect(scope.connected).toBeFalsy();
    })

    it('should show feed title and description when user is connected', function() {
        window.settings.connected = true;
        $httpBackend.when('POST', '/app/settingsupdate?instance=undefined&compId=').respond({});
        scope.init();
        $httpBackend.flush();
        scope.$apply();
        expect(scope.feed).toEqual({'entries' : [{'someJSONObject' : {}}], 'title' : 'Feed Title'});
    })

    it('should show feed title and description when user clicks connect', function() {
        window.settings.connected = false;
        $httpBackend.when('POST', '/app/settingsupdate?instance=undefined&compId=').respond({});
        scope.init();
        scope.connect(true);
        $httpBackend.flush();
        scope.$apply();
        expect(scope.feed).toEqual({'entries' : [{'someJSONObject' : {}}], 'title' : 'Feed Title'});
    })
});