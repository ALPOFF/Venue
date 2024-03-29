import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "../HomeScreen";
import EventDetailsScreen from "./EventDetailsScreen/EventDetailsScreen";
import UserEvents from "../UserEvents";
import Dialog from "../Dialog";
import UserFriends from "../UserFriends";
import stackNavPlace from "./stackNavPlace";
import stackNavEventDetailsScreen from "./EventDetailsScreen/stackNavEventDeatailsScreen";
import { Icon } from "react-native-elements";
import switchNavEditProfile from "../switchNavEditProfile";
import stackNavSubs from "../stackNavSubs";

const stackNav = createStackNavigator({
    Main: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Venue",
            headerStyle: { height: 55, paddingTop: 15 },
            headerLeft: (<Image
                style={{ width: 60, height: 60, marginLeft: 10, marginBottom: 15 }}
                source={require('./../../assets/Venue_new/logo_hands.png')}
            />
            ),
            headerRight: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image style={{ width: 40, height: 40, marginRight: 10, marginBottom: 15 }}
                    source={require('./../../assets/Venue_new/userIcon.png')} />
            </TouchableOpacity>),
            headerTitleStyle: {
                marginBottom: 20,
                textAlign: "center",
                flex: 1,
                // fontStyle: 'italic',
                fontFamily: 'Yesteryear-Regular',
                fontSize: 40,
                // letterSpacing: -0.015,
                color: '#009788'
            }
        })
    },
    Detail: {
        screen: stackNavPlace, //header at detailscreen
        navigationOptions: ({ navigation }) => ({
            header: null

        })
    },
    EventDetails: {
        screen: stackNavEventDetailsScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
            // title: "Event Details Screen",
            // headerTintColor: 'black',
            // headerTitleStyle: {
            //     paddingLeft: 20,
            //     fontStyle: 'italic',
            //     fontSize: 28,
            //     letterSpacing: -0.015,
            //     color: '#009788'
            // }
        })
    },
    MyEvents: {
        screen: UserEvents,
        navigationOptions: ({ navigation }) => ({
            title: "My Events",
            headerTitleStyle: {
                paddingLeft: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#009788'
            }

        })
    },
    MyFriends: {
        screen: UserFriends,
        navigationOptions: ({ navigation }) => ({
            title: "My Friends",
            headerTitleStyle: {
                paddingLeft: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#009788'
            }

        })
    },
    stackNavSubs: {
        screen: stackNavSubs,
        navigationOptions: ({ navigation }) => ({
            // headerLeft: (<TouchableOpacity style={{paddingRight: 10}} onPress={() => navigation.navigate('Main')}>
            //     <Icon name="arrowleft" type="antdesign" size={30} color='white'/>
            // </TouchableOpacity>),
            //headerLeft: null,
            headerTransparent: true,
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
