import React from 'react';
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { createSwitchNavigator } from "react-navigation";

const stackNavSignScreens = createSwitchNavigator({
    SignInScreen: {
        screen: SignInScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    SignUpScreen: {
        screen: SignUpScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    ResetPasswordScreen: {
        screen: ResetPasswordScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
});

export default stackNavSignScreens;
