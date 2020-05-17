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
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#3C2274'}}>
              <Icon name="verified-user" size={40} color='#3C2274'/>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: '#3C2274', margin: 10}}>{this.state.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                            onPress={() => this.props.navigation.navigate('MyEvents')}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="message" size={25} color='#3C2274'/>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: '#3C2274', margin: 10}}>Your profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                            onPress={() => this.props.navigation.navigate('MyFriends')}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="people" size={25} color='#3C2274'/>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: '#3C2274', margin: 10}}>Friends</Text>
            </View>
          </TouchableOpacity>
          <View>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="settings-applications" size={25} color='#3C2274'/>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: '#3C2274', margin: 10}}>Settings</Text>
            </View>
          </View>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                            onPress={() => this.props.navigation.navigate('MyEvents')}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="event-note" size={25} color='#3C2274'/>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: '#3C2274', margin: 10}}>My events</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}} onPress={async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth')
          }}>
            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="exit-to-app" size={25} color='#3C2274'/>
            </View>
            <Text style={styles.sectionHeadingStyle}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
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
