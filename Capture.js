/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


'use strict';
import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Camera from 'react-native-camera';

var Loading = require('./Loading.js');
var Preview = require('./Preview.js');

class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = { isProcessing: false };
  }

  render() {
    var loadingView;
    if (this.state.isProcessing) {
      loadingView = (<Loading text="Capturing..." />)
    } else {
      loadingView = <View />;
    }
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.memory}
          type={Camera.constants.Type.back}
          captureAudio={false}
          captureQuality={Camera.constants.CaptureQuality.medium}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
        {loadingView}
      </View>
    );
  }

  takePicture() {
    this.setState({ isProcessing: true });
    this.camera.capture()
      .then((data) => this.dispPreview(data))
      .catch(err => console.error(err));
  }

  dispPreview(data) {
    this.setState({ isProcessing: false });
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        component: require('./Preview.js'),
        title: '',
        passProps: { image: data },
        navigationBarHidden: false
      });
    } else {
      this.props.navigator.push({
        name: 'preview',
        data: data,
        title: ''
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

module.exports = Capture;
