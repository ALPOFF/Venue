import React from 'react';
import DetailScreen from "./DetailScreen";
import MapForPickPlace from "../MapForPickPlace/MapForPickPlace";
import {createSwitchNavigator} from "react-navigation";

const stackNavPlace = createSwitchNavigator({
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
