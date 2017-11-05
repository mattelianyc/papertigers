/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';

{/* Components */}

import SafariView from 'react-native-safari-view';


{/* Font Awesome :) */}
import Icon from 'react-native-vector-icons/FontAwesome';
{/* Image Assets */}
import PprTgrLogo from './assets/images/papertigerlogo.png';

import TabBar from './components/TabBar';



export default class App extends Component {

  state = {
    user: undefined, // user has not logged in yet
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('http://localhost:3000/auth/google');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        
        { user

          ? // Show user info if already logged in

            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user.name}!
              </Text>
              <View style={styles.avatar}>
                <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
              </View>
              <TabBar />
            </View>

          : // Show Please log in message if not

            <View style={styles.content}>
              <Text style={styles.header}>
                Rio Azul & The PAPER TIGER$
              </Text>
              <View style={styles.avatar}>
                <Image source={PprTgrLogo} style={{height: 100, width: 100}} />
              </View>
              <Text style={styles.text}>
                Please log in using google(gmail address) to continue {'\n'}
                to the awesomeness
              </Text>
              {/* Login buttons */}
              <View style={styles.buttons}>
                <Icon.Button
                  name="google"
                  backgroundColor="#DD4B39"
                  onPress={this.loginWithGoogle}
                  {...iconStyles}
                >
                </Icon.Button>
              </View>
            </View>
        }
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingLeft: 8, paddingVertical: 4, alignItems: 'center'},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row'
  },
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  tabBar: {
    position: 'absolute',
    bottom:0,
    width: '100%',
  },
  tabIcon: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 5,
  }
});