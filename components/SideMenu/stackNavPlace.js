import React from 'react';
import AddEventScreen from "./AddEventScreen";
import MapForPickPlace from "../MapForPickPlace/MapForPickPlace";
import { createSwitchNavigator } from "react-navigation";

const stackNavPlace = createSwitchNavigator({
    Detail: {
        screen: AddEventScreen,
        navigationOptions: ({ navigation }) => ({
        })
    },
    MapForPickPlace: {
        screen: MapForPickPlace,
        navigationOptions: ({ navigation
        }) => ({
            header: null
        })
    }
});

export default stackNavPlace;
