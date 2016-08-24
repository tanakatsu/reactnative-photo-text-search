import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Navigator,
  Linking
} from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { queryWord: props.queryWord };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Text recognition result
        </Text>
        <TextInput style={styles.textInput}
          ref="inputtext"
          autoCorrect={false}
          autoCapitalize="none"
          value={this.state.queryWord}
          onChangeText={(text) => this.setState({queryWord: text})}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor='#F1C40F'
          onPress={() => this.doSearch('google')}
          >
          <View>
            <Text style={styles.buttonText}>Search in Google</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor='#F1C40F'
          onPress={() => this.doSearch('amazon')}
          >
          <View>
            <Text style={styles.buttonText}>Search in Amazon</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  doSearch(provider) {
    var query = this.state.queryWord;
    var url;

    if (provider === 'google') {
      url = "https://www.google.co.jp/search?q=" + encodeURIComponent(query);
    } else if (provider === 'amazon') {
      url = "https://www.amazon.co.jp/s/ref=nb_sb_noss_2?field-keywords=" + encodeURIComponent(query);
    }
    console.log(url);

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: (Platform.OS === 'ios') ? 64 : 0
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10
  },
  button: {
    height: 48,
    backgroundColor: '#6495ED',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15,
    padding: 8
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  textInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'stretch',
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    backgroundColor: '#cccccc'
  }
});

module.exports = Search;
