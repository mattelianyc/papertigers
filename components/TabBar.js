import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS
} from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

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
      >
        <View style={styles.container}>
            <FontAwesome>{options.icon}</FontAwesome>
            <Text style={styles.title}>{options.title}</Text>
        </View> 
      </TabBarIOS.Item>    
    )
  }

  render() {
    const { selected } = this.state;
    return (
      <TabBarIOS tintColor='#42b49a' style={styles.tabBar}>
      {this.renderTab({title: 'Home', id: 'home', icon: Icons.home})}
      {this.renderTab({title: 'Chat', id: 'chat', icon: Icons.chat})}
      {this.renderTab({title: 'Calendar', id: 'calendar', icon: Icons.calendar})}
      {this.renderTab({title: 'Files', id: 'files', icon: Icons.file})}
      </TabBarIOS>
    )
	}
}


const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
  },
  tabItem: {
    display: 'flex',
    height:'100%',
    flexDirection: 'row',
  },

});