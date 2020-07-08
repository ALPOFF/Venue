import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import {Icon} from "react-native-elements";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  componentDidMount() {
    AsyncStorage.getItem('userName', (err, item) => {
      this.setState({name: item})
    })
    }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true} decelerationRate={"normal"}>
          <View>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#009788'}}>
              <Icon name="verified-user" type='Ionicons' size={40} color='black'/>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black', margin: 10}}>{this.state.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                            onPress={() => this.props.navigation.navigate('YourProfile')}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30}}><Icon name="md-person" type='ionicon' size={25} color='#263238'/></View>
              <Text style={{fontWeight: 'regular', fontSize: 20, color: 'black', margin: 10}}>Your profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                            onPress={() => this.props.navigation.navigate('MyFriends')}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30}}><Icon name="people" size={25} color='#263238'/></View>
              <Text style={{fontWeight: 'regular', fontSize: 20, color: 'black', margin: 10}}>Friends</Text>
            </View>
          </TouchableOpacity>
          <View>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30}}><Icon name="ios-settings" type='ionicon' size={25} color='#263238'/></View>
              <Text style={{fontWeight: 'regular', fontSize: 20, color: 'black', margin: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Settings</Text>
              <Text style={{color: 'orange'}}>In dev</Text>
            </View>
          </View>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                            onPress={() => this.props.navigation.navigate('MyEvents')}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30}}><Icon name="event-note" size={25} color='#263238'/></View>
              <Text style={{fontWeight: 'regular', fontSize: 20, color: 'black', margin: 10}}>My events</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}} onPress={async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth')
          }}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30}}><Icon name="md-exit" type='ionicon' size={25} color='#263238'/></View>
              <Text style={styles.sectionHeadingStyle}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                          onPress={() => {
                            AsyncStorage.setItem('darkMode', true);
                            AsyncStorage.getItem('darkMode', (err, item) => {
                              console.log('darkMode:', item)
                            });
                          }}>
          <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 30}}><Icon name="switch" type='entypo' size={25} color='#263238'/></View>
            <Text style={{fontWeight: 'regular', fontSize: 20, color: 'black', margin: 10}}>Dark Mode</Text>
          </View>
        </TouchableOpacity>
{/*        <View style={styles.footerContainer}>
          <Text>Fixed footer for info</Text>
        </View>*/}
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
