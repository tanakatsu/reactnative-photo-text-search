/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Camera from 'react-native-camera';

var Loading = require('./Loading.js');

class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = { isProcessing: false };
  }

  render() {
    var loadingView;
    if (this.state.isProcessing) {
      loadingView = (<Loading text="Recognizing..." />)
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
          captureQuality={Camera.constants.CaptureQuality.low}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
        {loadingView}
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.textRecognition(data))
      .catch(err => console.error(err));
  }

  textRecognition(data) {
    this.setState({ isProcessing: true });

    var self = this;
    this.sendFileToCloudVision(data.data, function(text) {
      self.setState({ isProcessing: false }); // hide loading status before going to next view
      self.props.navigator.push({
        name: 'search',
        queryWord: text,
        title: ''
      });
    });
  }

  sendFileToCloudVision(content, callback) {
    var apiKey = require('./key.js').apiKey;
    var CV_URL = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;

    console.log('data size=', content.length);
    console.log('CV_URL=', CV_URL);

    // Strip out the file prefix when you convert to json.
    var request = {
      requests: [{
        image: {
          content: content
        },
        features: [{
          type: "TEXT_DETECTION",
          maxResults: 200
        }]
      }]
    };

    console.log('Waiting for response from CloudVision..');
    fetch(CV_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);

      var text = responseJson.responses[0].textAnnotations[0].description.replace("\n", "");
      console.log('text=', text);

      callback(text);
    })
    .catch((error) => {
      console.error(error);
    });
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
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
});

module.exports = Capture;

