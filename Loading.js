/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

var { width, height } = Dimensions.get('window');
var offset = 20;

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, {width: width}]}>
        <Text style={styles.title}>
        {this.props.text}
        </Text>
        <ActivityIndicator
          animating={true}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: height / 2 - 40 - offset
  },
  title: {
    fontSize: 20,
    color: '#fff'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
});

module.exports = Loading;

