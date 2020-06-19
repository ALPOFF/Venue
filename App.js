import React from 'react';
import {Icon} from 'react-native-elements'
import {Dimensions, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {DefaultTheme, DarkTheme, NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignInScreen from "./components/SignScreens/SignInScreen";
import AuthLoadingScreen from "./components/AuthLoadingScreen";
import MapScreen from "./components/MapScreen";
import MessageScreen from "./components/MessageScreen";
import SideMenu from "./components/SideMenu/SideMenu";
import stackNav from "./components/SideMenu/stackNav";
import {connect, Provider} from "react-redux";
import store from "./configureStore";
import messageNav from "./components/SideMenu/messageNav";
import io from "socket.io-client";
import {setSocket} from "./state/appReducer";
import {render} from "react-native-web";
import SplashScreen from "react-native-splash-screen";
import stackNavSignScreens from "./components/SignScreens/stackNavSignScreens";
import {AppearanceProvider} from "react-native-appearance";
import { DarkModeProvider } from 'react-native-dark-mode'


class App extends React.Component {
    constructor(props) {
        super(props);
        // Не вызывайте здесь this.setState()!
        this.state = {msgData: null};
    }

    componentDidMount() {
        SplashScreen.hide()
    }

    render() {
        return (
            <Provider store={store}>
                <DarkModeProvider mode="dark">
                    <AppMainNav screenProps={{params1: 'test'}}/>
                </DarkModeProvider>
            </Provider>
        );
    }
}


const BottomTabNav = createBottomTabNavigator(
    {
        Home: {
            screen: stackNav,
            navigationOptions: {
                tabBarLabel: 'Events',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="home" size={30} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: messageNav,
            navigationOptions: {
                tabBarLabel: 'Messages',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="message" size={30} color={tintColor}/>
                )
            }
        },
        Map: {
            screen: MapScreen,
            navigationOptions: {
                tabBarLabel: 'Map',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="map" size={30} color={tintColor}/>
                )
            }
        }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({}),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#009788',
            inactiveTintColor: '#75818A',
            tabStyle: {},
            showLabel: false,
            style: {
                borderTopWidth: 2,
                borderTopColor: "lightgrey", paddingTop: 2
            }
        },
    }
);

const DrawerNav = createDrawerNavigator({
    Item1: {
        screen: BottomTabNav,
    }
}, {
    contentComponent: SideMenu,
    drawerPosition: 'right',
    drawerWidth: Dimensions.get('window').width - 120,
});


export const AppMainNav = createAppContainer(
    (createSwitchNavigator(
            {AuthLoading: AuthLoadingScreen, App: DrawerNav, Auth: stackNavSignScreens},
            {initialRouteName: 'AuthLoading'}
        )
    )
);


export default App;
