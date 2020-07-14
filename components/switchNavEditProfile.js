import React from 'react';
import {createSwitchNavigator} from "react-navigation";
import YourProfile from "./YourProfile";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import EditProfile from "./EditProfile";
import yyy from "./EditProfile";
import UserProfile from "./UserProfile";

const switchNavEditProfile = createSwitchNavigator({
    YourProfile: {
        screen: YourProfile,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({navigation
                            }) => ({
            headerRight: (<TouchableOpacity style={{paddingRight: 10}} onPress={() => navigation.navigate('YourProfile')}>
                <Icon name="arrowright" type="antdesign" size={30} color='white'/>
            </TouchableOpacity>)
        })
    },
    UserProfile: {
        screen: UserProfile,
        navigationOptions: ({navigation
                            }) => ({
            headerRight: (<TouchableOpacity style={{paddingRight: 10}} onPress={() => navigation.navigate('YourProfile')}>
                <Icon name="arrowright" type="antdesign" size={30} color='white'/>
            </TouchableOpacity>)
        })
    }
});

export default switchNavEditProfile;
