import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import DetailScreen from "./DetailScreen";
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
