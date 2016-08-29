/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


'use strict';
import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

var Loading = require('./Loading.js');

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = { isProcessing: false };
  }

  startRecognize() {
    if (!this.state.isProcessing) {
      console.log('start recognizing..');

      this.setState({isProcessing: true});
      console.log('image=', this.props.image);
      this.sendFileToCloudVision(this.props.image.data, this.onRecognized, this);
    }
  }

  sendFileToCloudVision(content, callback, context) {
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

      var text = null;
      if (responseJson.responses[0].textAnnotations) {
        text = responseJson.responses[0].textAnnotations[0].description.replace("\n", "");
      }
      console.log('text=', text);

      callback(text, context);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onRecognized(text, context) {
    var _navigator = context.props.navigator;

    // Remove 'preview' from routes and go to 'search'
    if (Platform.OS === 'ios') {
      _navigator.replace({
        component: require('./Search.js'),
        title: '',
        passProps: { queryWord: text },
        navigationBarHidden: false
      });
    } else {
      _navigator.replace({
        name: 'search',
        queryWord: text,
        title: ''
      });
    }
  }

  cancelRecognize() {
    console.log('cancelled');
    this.props.navigator.pop();
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
        <View>
          <Image
            style={styles.preview}
            source={{uri: 'data:image/jpeg;base64,' + this.props.image.data}}
          />
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.button}
              onPress={() => this.cancelRecognize()}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.startRecognize()}
            >
              <Text style={styles.buttonText}>Recognize</Text>
            </TouchableHighlight>
          </View>
        </View>
        {loadingView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  // http://facebook.github.io/react-native/docs/images.html#network-images
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
    backgroundColor: 'green'
  },
  bottomBar: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#333'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 80,
    height: 30
  },
  buttonText: {
    color: '#000'
  }
});

module.exports = Preview;

