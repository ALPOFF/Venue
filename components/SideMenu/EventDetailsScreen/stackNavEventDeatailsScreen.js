import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import EventDetailsScreen from "./EventDetailsScreen";
import EventVisitorsDetailed from "./EventVisitorsDetailed";

const stackNavEventDetailsScreen = createStackNavigator({
    EventDetailsScreen: {
        screen: EventDetailsScreen,
        navigationOptions: ({navigation}) => ({
            // header: null
        })
    },
    EventVisitorsDetailed: {
        screen: EventVisitorsDetailed,
        navigationOptions: ({navigation
                            }) => ({
            header: null
        })
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
