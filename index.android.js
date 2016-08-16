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
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class PhotoTextSearch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.memory}
          type="back"
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.textRecognition(data))
      .catch(err => console.error(err));
  }

  textRecognition(data) {
    console.log(data.data);
    this.sendFileToCloudVision(data.data);
  }

  sendFileToCloudVision(content) {
    var apiKey = require('./key.js').apiKey;
    var CV_URL = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;

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

    //console.log('json=', JSON.stringify(request));

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
      console.log(responseJson.responses[0].textAnnotations[0].description);
      return responseJson;
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
  }
});

AppRegistry.registerComponent('PhotoTextSearch', () => PhotoTextSearch);
