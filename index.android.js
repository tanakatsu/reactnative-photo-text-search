/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
  ToolbarAndroid
} from 'react-native';

var Capture = require('./Capture.js');
var Search = require('./Search.js');
var Preview = require('./Preview.js');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  console.log("route.name=" + route.name);
  if (route.name === 'capture') {
    return (
      <View style={{flex: 1}}>
        <Capture navigator={navigationOperations} />
      </View>
    );
  } else if (route.name === 'search') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('image!android_back_white')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.title} />
          <Search
            style={{flex: 1}}
            navigator={navigationOperations}
            queryWord={route.queryWord}
          />
      </View>
    );
  } else if (route.name === 'preview') {
    return (
      <View style={{flex: 1}}>
        <Preview navigator={navigationOperations} image={route.data} />
      </View>
    );
  }
}

class PhotoTextSearch extends Component {
  render() {
    var initialRoute = {name: 'capture'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        renderScene={RouteMapper}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  }
});

AppRegistry.registerComponent('PhotoTextSearch', () => PhotoTextSearch);
