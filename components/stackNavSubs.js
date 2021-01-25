import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Subscribers from "./Subscribers";
import Subscriptions from "./Subscriptions";
import yyy from "./EditProfile";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import EditProfile from "./EditProfile";
import switchNavEditProfile from "./switchNavEditProfile";

const stackNavSubs = createStackNavigator({
        switchNavEditProfile: {
            screen: switchNavEditProfile,
            navigationOptions: ({navigation}) => ({
                // header: null
                headerTransparent: true
            })
        },
        Subscribers: {
            screen: Subscribers,
            navigationOptions: ({
                                    navigation
                                }) => ({
                header: null,
                gestureResponseDistance: {vertical: 1000}, // default is 135 },
            })
        },
        Subscriptions: {
            screen: Subscriptions,
            navigationOptions: ({
                                    navigation
                                }) => ({
                header: null,
                gestureResponseDistance: {vertical: 1000}, // default is 135 },
            })
        }
    },
    {
        //headerMode: 'none',

        mode: 'modal',
        transparentCard: true,
        cardStyle: {
            opacity: 1,
        },

    },
    // {
    //     headerMode: 'none',
    //     mode: 'modal',
    //     transparentCard: true,
    //     cardStyle: { opacity: 1} //This prop is necessary for eventually issue.
    // }
);

export default stackNavSubs;
