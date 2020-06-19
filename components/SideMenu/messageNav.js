import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native'
import DetailScreen from "./DetailScreen";
import HomeScreen from "../HomeScreen";
import EventDetailsScreen from "./EventDetailsScreen/EventDetailsScreen";
import UserEvents from "../UserEvents";
import Dialog from "../Dialog";
import MessageScreen from "../MessageScreen";



const stackNav = createStackNavigator({
    Main: {
        screen: MessageScreen,
        navigationOptions: ({navigation}) => ({
            title: "Venue",
            headerStyle: {height: 55, paddingTop: 15},
            headerLeft: (<Image
                    style={{width: 60, height: 60, marginLeft: 10, marginBottom: 15}}
                    source={require('./../../assets/Venue_new/logo_hands.png')}
                />
            ),
            headerRight: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image style={{width: 40, height: 40, marginRight: 10, marginBottom: 15}}
                       source={require('./../../assets/Venue_new/userIcon.png')}/>
            </TouchableOpacity>),
            headerTitleStyle: {
                // paddingLeft: 20,
                // fontStyle: 'italic',
                fontSize: 40,
                marginBottom: 20,
                textAlign:"center",
                flex:1,
                fontFamily: 'Yesteryear-Regular',
                // letterSpacing: -0.015,
                color: '#009788'
            }
        })
    },

Dialog: {
        screen: Dialog,
        navigationOptions: ({navigation}) => ({
            headerTitleStyle: {
                paddingLeft: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#009788'
            }

        })
    }
});

export default stackNav;
