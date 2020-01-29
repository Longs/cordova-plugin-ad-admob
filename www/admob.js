
module.exports = {
	_loadedBannerAd: false,
	_loadedInterstitialAd: false,
	_loadedRewardedVideoAd: false,	
	_isShowingBannerAd: false,
	_isShowingInterstitialAd: false,
	_isShowingRewardedVideoAd: false,	
	_fixCocoonIOCordovaAndroidAdMobIssue: false,
	_reward: false,
	_rewardErrorCode: false,
	_bannerErrorCode: false,
	_interstitialErrorCode: false,
	//
	setLicenseKey: function(email, licenseKey) {
		var self = this;	
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'setLicenseKey',			
            [email, licenseKey]
        ); 
    },
	//setUp: function(bannerAdUnit, interstitialAdUnit, rewardedVideoAdUnit, isOverlap, isTest) {
	setUp: function(bannerAdUnit, interstitialAdUnit, rewardedVideoAdUnit, isOverlap, isTest, appID) {
        if (typeof isTest == 'undefined') {
            //isOverlap=rewardedVideoAdUnit;
            //isTest=isOverlap;
			rewardedVideoAdUnit_=rewardedVideoAdUnit;
			isOverlap_=isOverlap;
			isTest_=isTest;
			//
			isOverlap=rewardedVideoAdUnit_;
            isTest=isOverlap_;			
        }
        
		var self = this;
        cordova.exec(
            function (result) {

                //Now returns an object for onReward
                var resObject;
				
                if (typeof result == "object") {
                    resObject = result;
                    result = resObject.result;
                }
                    
				if (typeof result == "string") {
					
					//bug 533 
					if (result == "onBannerAdFailedToLoad"){
						self._bannerErrorCode = resObject;
						if (self.onBannerAdFailedToLoad)
					        self.onBannerAdFailedToLoad();
					}
					else if (result == "onInterstitialAdFailedToLoad"){
						self._interstitialErrorCode = resObject;
						if (self.onInterstitialAdFailedToLoad)
					        self.onInterstitialAdFailedToLoad();
					}
					
					else if (result == "onBannerAdPreloaded") {					
						if (self.onBannerAdPreloaded)
							self.onBannerAdPreloaded();
					}
					else if (result == "onBannerAdLoaded") {
						self._loadedBannerAd = true;
						
						if (self.onBannerAdLoaded)
							self.onBannerAdLoaded();
														
//fixCocoonIOCordovaAndroidAdMobIssue
if (typeof Cocoon != 'undefined' && navigator.userAgent.match(/Android/i) && !self._fixCocoonIOCordovaAndroidAdMobIssue) {
	self.reloadBannerAd();
	self._fixCocoonIOCordovaAndroidAdMobIssue=true;
}							
					}
					else if (result == "onBannerAdShown") {
						self._loadedBannerAd = false;
						self._isShowingBannerAd = true;
					
						if (self.onBannerAdShown)
							self.onBannerAdShown();
					}
					else if (result == "onBannerAdHidden") {
						self._isShowingBannerAd = false;
					
						 if (self.onBannerAdHidden)
							self.onBannerAdHidden();
					}
					else if (result == "onBannerAdDestroyed") {
						self._isShowingBannerAd = false;
					
						 if (self.onBannerAdDestroyed)
							self.onBannerAdDestroyed();
					}
					
					else if (result == "onBannerAdUnhidden") {
						self._isShowingBannerAd = true;
					
						 if (self.onBannerAdUnhidden)
							self.onBannerAdUnhidden();
					}
					//
					else if (result == "onInterstitialAdPreloaded") {
//cranberrygame start; deprecated					
						if (self.onFullScreenAdPreloaded)
							self.onFullScreenAdPreloaded();
//cranberrygame end							
						if (self.onInterstitialAdPreloaded)
							self.onInterstitialAdPreloaded();							
					}
					else if (result == "onInterstitialAdLoaded") {
						self._loadedInterstitialAd = true;

//cranberrygame start; deprecated						
						if (self.onFullScreenAdLoaded)
							self.onFullScreenAdLoaded();
//cranberrygame end							
						if (self.onInterstitialAdLoaded)
							self.onInterstitialAdLoaded();							
					}
					else if (result == "onInterstitialAdShown") {
						self._loadedInterstitialAd = false;					
						self._isShowingInterstitialAd = true;

//cranberrygame start; deprecated					
						if (self.onFullScreenAdShown)
							self.onFullScreenAdShown();
//cranberrygame end						
						if (self.onInterstitialAdShown)
							self.onInterstitialAdShown();							
					}
					else if (result == "onInterstitialAdHidden") {
						self._isShowingInterstitialAd = false;

//cranberrygame start; deprecated					
						if (self.onFullScreenAdHidden)
							self.onFullScreenAdHidden();
						if (self.onFullScreenAdClosed)
							self.onFullScreenAdClosed(); //deprecated	
//cranberrygame end							
						 if (self.onInterstitialAdHidden)
							self.onInterstitialAdHidden();
					}
					    // 
					else if (result == "onRewardedVideoAdPreloaded") {
						if (self.onRewardedVideoAdPreloaded)
							self.onRewardedVideoAdPreloaded();
					}
					else if (result == "onRewardedVideoAdLoaded") {
						self._loadedRewardedVideoAd = true;

						if (self.onRewardedVideoAdLoaded)
							self.onRewardedVideoAdLoaded();
					}
					else if (result == "onRewardedVideoAdShown") {
						self._loadedRewardedVideoAd = false;
						self._isShowingRewardedVideoAd = true;
					
						if (self.onRewardedVideoAdShown)
							self.onRewardedVideoAdShown();
					}
					else if (result == "onRewardedVideoAdHidden") {
						self._isShowingRewardedVideoAd = false;
					
						 if (self.onRewardedVideoAdHidden)
							self.onRewardedVideoAdHidden();
					}
					else if (result == "onRewardedVideoAdCompleted") {
						self._reward = resObject;
					    if (self.onRewardedVideoAdCompleted)
					        self.onRewardedVideoAdCompleted();							
					}
					else if (result == "onRewardedVideoAdFailedToLoad"){
						self._rewardErrorCode = resObject;
						if (self.onRewardedVideoAdFailedToLoad)
					        self.onRewardedVideoAdFailedToLoad();
					}
					else if (result == "getSmartBannerHeight"){
						self._smartBannerHeight = resObject;
					}
				}
				else {
					//var event = result["event"];
					//var location = result["message"];				
					//if (event == "onXXX") {
					//	if (self.onXXX)
					//		self.onXXX(location);
					//}
				}			
			}, 
			function (error) {
				console.log("error callback triggered");
				console.log(error);
			},
            'AdMobPlugin',
            'setUp',			
            [bannerAdUnit, interstitialAdUnit, rewardedVideoAdUnit, isOverlap, isTest, appID]
        ); 
    },
	preloadBannerAd: function() {
		var self = this;
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'preloadBannerAd',
            []
        ); 
    },
    showBannerAd: function(position, size, isDummy) {
		var self = this;
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'showBannerAd',
            [position, size, isDummy]
        ); 
    },
	reloadBannerAd: function() {
		var self = this;
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'reloadBannerAd',
            []
        ); 
    },
    hideBannerAd: function() {
		var self = this;
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'hideBannerAd',
            []
        ); 
    },
	destroyBannerAd: function() {
		var self = this;
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'destroyBannerAd',
            []
        ); 
    },
	//
//cranberrygame start; deprecated	
	preloadFullScreenAd: function() {
		var self = this;	
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'preloadInterstitialAd',
            []
        ); 
    },
    showFullScreenAd: function() {
		var self = this;
		cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'showInterstitialAd',
            []
        ); 
    },
	reloadFullScreenAd: function() { //deprecated
    },
//cranberrygame end	
	preloadInterstitialAd: function() {
        cordova.exec(
			null,
            null,
            'AdMobPlugin',
            'preloadInterstitialAd',
            []
        ); 
    },
    showInterstitialAd: function() {
		cordova.exec(
 			null,
            null,
            'AdMobPlugin',
            'showInterstitialAd',
            []
        ); 
    },
	//
	preloadRewardedVideoAd: function() {
        cordova.exec(
			null,
            null,
            'AdMobPlugin',
            'preloadRewardedVideoAd',
            []
        ); 
    },
    showRewardedVideoAd: function() {
		cordova.exec(
			null,
            null,
            'AdMobPlugin',
            'showRewardedVideoAd',
            []
        ); 
    },
	unhideBannerAd: function() {
		var self = this;
        cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'unhideBannerAd',
            []
        ); 
    },
	loadedBannerAd: function() {
		return this._loadedBannerAd;
	},
//cranberrygame start; deprecated	
	loadedFullScreenAd: function() {
		return this._loadedInterstitialAd;
	},
//cranberrygame end	
	loadedInterstitialAd: function() {
		return this._loadedInterstitialAd;
	},
	loadedRewardedVideoAd: function() {
		return this._loadedRewardedVideoAd;
	},	
	isShowingBannerAd: function() {
		return this._isShowingBannerAd;
	},
//cranberrygame start; deprecated	
	isShowingFullScreenAd: function() {
		return this._isShowingInterstitialAd;
	},
//cranberrygame end	
	isShowingInterstitialAd: function() {
		return this._isShowingInterstitialAd;
	},
	isShowingRewardedVideoAd: function() {
		return this._isShowingRewardedVideoAd;
	},	
	getRewardInfo: function(){
		return this._reward;
	},
	getRewardErrorCode: function(){
		return this._rewardErrorCode;
	},
	getBannerErrorCode: function(){
		return this._bannerErrorCode;
	},
	getInterstitialErrorCode: function(){
		return this._interstitialErrorCode;
	},
	getSmartBannerHeight: function(){		
		var self = this;
		if (typeof self._smartBannerHeight !='undefined'){
		  return self._smartBannerHeight.smartBannerHeight;			
		}else{
		  return -1;
		}
	},
	setConsentExtras: function(extrasJSON){
		var self = this;
		cordova.exec(
            null,
            null,
            'AdMobPlugin',
            'setConsentExtras',
            [extrasJSON]
        );
	},

	onBannerAdPreloaded: null,
	onBannerAdLoaded: null,
	onBannerAdShown: null,
	onBannerAdHidden: null,
	onBannerAdDestroyed: null,
	onBannerAdUnhidden: null,
	onBannerAdFailedToLoad: null,
	//
//cranberrygame start; deprecated	
	onFullScreenAdPreloaded: null,
	onFullScreenAdLoaded: null,
	onFullScreenAdShown: null,
	onFullScreenAdHidden: null,
	onFullScreenAdClosed: null, //deprecated		
//cranberrygame end
	onInterstitialAdPreloaded: null,
	onInterstitialAdLoaded: null,
	onInterstitialAdShown: null,
	onInterstitialAdHidden: null,
	onInterstitialAdFailedToLoad: null,
	//
	onRewardedVideoAdPreloaded: null,
	onRewardedVideoAdLoaded: null,
	onRewardedVideoAdShown: null,
	onRewardedVideoAdHidden: null,
	onRewardedVideoAdCompleted: null,
	onRewardedVideoAdFailedToLoad:null
};
