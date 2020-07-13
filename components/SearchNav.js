import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import SearchScreen from "./SearchScreen";
import {Image, TouchableOpacity} from "react-native";

const SearchNav = createStackNavigator({
        SearchScreen: {
            screen: SearchScreen,
            navigationOptions: ({navigation}) => ({
                title: "Venue",
                headerStyle: {height: 55, paddingTop: 15},
                headerLeft: (<Image
                        style={{width: 60, height: 60, marginLeft: 10, marginBottom: 15}}
                        source={require('./../assets/Venue_new/logo_hands.png')}
                    />
                ),
                headerRight: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image style={{width: 40, height: 40, marginRight: 10, marginBottom: 15}}
                           source={require('./../assets/Venue_new/userIcon.png')}/>
                </TouchableOpacity>),
                headerTitleStyle: {
                    // paddingLeft: 20,
                    // fontStyle: 'italic',
                    fontSize: 40,
                    marginBottom: 20,
                    textAlign: "center",
                    flex: 1,
                    fontFamily: 'Yesteryear-Regular',
                    // letterSpacing: -0.015,
                    color: '#009788'
                }
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

export default SearchNav;
