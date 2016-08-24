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
  NavigatorIOS
} from 'react-native';

var Capture = require('./Capture.js');

class PhotoTextSearch extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Capture,
          title: 'Capture'
        }}
        navigationBarHidden={true}
        style={styles.container}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('PhotoTextSearch', () => PhotoTextSearch);
