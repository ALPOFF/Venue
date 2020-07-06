import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import EventDetailsScreen from "./EventDetailsScreen";
import EventVisitorsDetailed from "./EventVisitorsDetailed";

const stackNavEventDetailsScreen = createStackNavigator({
    EventDetailsScreen: {
        screen: EventDetailsScreen,
        navigationOptions: ({navigation}) => ({
            // header: null
            headerTransparent: true
        })
    },
    EventVisitorsDetailed: {
        screen: EventVisitorsDetailed,
        navigationOptions: ({navigation
                            }) => ({
            header: null,
            gestureResponseDistance: { vertical: 1000 }, // default is 135 },
        })
    }
},
    {
        //headerMode: 'none',

        mode: 'modal',
        transparentCard: true,
        cardStyle: {
            opacity: 1,
        }
    },
    // {
    //     headerMode: 'none',
    //     mode: 'modal',
    //     transparentCard: true,
    //     cardStyle: { opacity: 1} //This prop is necessary for eventually issue.
    // }
    );

export default stackNavEventDetailsScreen;
