import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import DetailScreen from "./DetailScreen";
import HomeScreen from "../HomeScreen";
import EventDetailsScreen from "./EventDetailsScreen/EventDetailsScreen";
import UserEvents from "../UserEvents";
import Dialog from "../Dialog";
import UserFriends from "../UserFriends";
import stackNavPlace from "./stackNavPlace";
import stackNavEventDetailsScreen from "./EventDetailsScreen/stackNavEventDeatailsScreen";

const stackNav = createStackNavigator({
    Main: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            title: "Nearest Events",
            headerStyle: {height: 55, paddingTop: 15},
            headerLeft: (<Image
                    style={{width: 40, height: 40, marginLeft: 10, marginBottom: 15}}
                    source={require('./../../assets/appIcon.png')}
                />
            ),
            headerRight: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image style={{width: 40, height: 40, marginRight: 10, marginBottom: 15}}
                       source={require('./../../assets/userIcon.png')}/>
            </TouchableOpacity>),
            headerTitleStyle: {
                paddingLeft: 20,
                marginBottom: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#3C2274'
            }
        })
    },
    Detail: {
        screen: stackNavPlace,
        navigationOptions: ({navigation}) => ({
            title: "Create new event",
            headerStyle: {height: 55, paddingTop: 10},
            headerTintColor: 'black',
            headerTitleStyle: {
                paddingLeft: 20,
                paddingBottom: 5,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#3c2274'
            }

        })
    },
    EventDetails: {
        screen: stackNavEventDetailsScreen,
        navigationOptions: ({navigation}) => ({
            title: "Event Details Screen",
            headerTintColor: 'black',
            headerTitleStyle: {
                paddingLeft: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#3C2274'
            }

        })
    },
    MyEvents: {
        screen: UserEvents,
        navigationOptions: ({navigation}) => ({
            title: "My Events",
            headerTitleStyle: {
                paddingLeft: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#3C2274'
            }

        })
    },
    MyFriends: {
        screen: UserFriends,
        navigationOptions: ({navigation}) => ({
            title: "My Friends",
            headerTitleStyle: {
                paddingLeft: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#3C2274'
            }

        })
    }
});

export default stackNav;
