# PhotoTextSearch

### What's this

Recognize text in taken photo and search it on Google or Amazon.

### Requiremets

- react-native
	- [https://facebook.github.io/react-native/docs/getting-started.html](https://facebook.github.io/react-native/docs/getting-started.html)
- Google Cloud Vision account and browser API key

### How to use

1. Prepare browser API key in [Google Developers Console](https://console.cloud.google.com/)
2. Rename key.sample.js to key.js and edit it
3. Build and run
	- iOS
		- Simulator
		
			```
			react-native run-ios
			```
		- Device
			1. Connect device 
			2. Open Xcode project
			
				```
				open ios/yourProject.xcodeproj
				```
				
			3. Choose your device
			4. Edit AppDelegate.m
			
				```
				//jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  				jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"]; // real device
				```
				
			5. Build (Cmd + R)
			
	- Android
		- Emulator
			1. Launch Android Emulator
			2. Build

				```
				react-native run-android
				```
		- Device
			1. Connect device
			2. Check that your device has been connected succesfully
			
				```
				adb devices
				```
				
			3. Install and launch the app
			
				```
				react-native run-android
				```