import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS
} from 'react-native';

{/* Image Assets */}

import homeIcon from '../assets/images/home.png';
import chatIcon from '../assets/images/speech.png';
import calendarIcon from '../assets/images/time.png';
import audioIcon from '../assets/images/audio.png';

export default class TabBar extends Component {
	state = {
    selected: 'home'
  }

  selectTab(id) {
    this.setState({
      selected: id,
    });
  }
  
  renderTab(options) {
    return (
      <TabBarIOS.Item
        style={styles.tabItem}
        title={options.title}
        selected={this.state.selected === options.id}
        onPress={() => this.selectTab(options.id)}
        icon={options.icon}
      >
        <View style={styles.container}>
          <Image source={options.icon} style={styles.icon} />
          <Text style={styles.title}>{options.title}</Text>
        </View> 
      </TabBarIOS.Item>    
    )
  }

  render() {
    return (
      <TabBarIOS tintColor='#42b49a' style={styles.tabBar}>
      {this.renderTab({title: 'Home', id: 'home', icon: homeIcon})}
      {this.renderTab({title: 'Chat', id: 'chat', icon: chatIcon})}
      {this.renderTab({title: 'Calendar', id: 'calendar', icon: calendarIcon})}
      {this.renderTab({title: 'Files', id: 'files', icon: audioIcon})}
      </TabBarIOS>
    )
	}
}


const styles = StyleSheet.create({
  tabBar: {
    width: '100%'
  },
  tabItem: {
    display: 'flex',
    flexDirection: 'row'
  },
});