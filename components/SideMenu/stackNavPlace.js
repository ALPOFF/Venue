import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';
import DetailScreen from "./DetailScreen";
import HomeScreen from "../HomeScreen";
import EventDetailsScreen from "./EventDetailsScreen";
import UserEvents from "../UserEvents";
import Dialog from "../Dialog";
import UserFriends from "../UserFriends";
import MapForPickPlace from "../MapForPickPlace/MapForPickPlace";

const stackNavPlace = createStackNavigator({
    Detail: {
        screen: DetailScreen,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    MapForPickPlace: {
        screen: MapForPickPlace,
        navigationOptions: ({navigation
        }) => ({
            header: null
        })
    }
});

export default stackNavPlace;
