import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity, AsyncStorage, Switch, ImageBackground, Image} from 'react-native';
import {Icon} from "react-native-elements";
import {connect} from "react-redux";
import {setUserProfileBarThunk} from "../../state/appReducer";
import {localizeSideMenuScreen} from "../../localization/localize";

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            toggle: false
        }
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    };

    componentDidMount() {
        console.log('userProfileBar:', this.props.userProfileBar)
        AsyncStorage.getItem('userName', (err, item) => {
            this.setState({name: item})
        })
        AsyncStorage.getItem('userToken', (err, item) => {
            console.log('sidebardata')
            this.props.setUserProfileBarThunk(item)
        });
        console.log(this.props.userProfileBar)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={true} decelerationRate={"normal"}>
                  {this.props.userProfileBar.length != 0 && <View style={{
                        margin: 10,
                        paddingBottom: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: '#009788'
                    }}>
                        {/*{this.props.userProfileBar[0] != undefined && <ImageBackground source={{uri: this.props.userProfileBar[0].background_pic}} style={{height: 40}}>*/}
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image source={{uri: this.props.userProfileBar[0].photo}}
                                   style={{height: 60, width: 60, borderRadius: 40}}/>
                            <View style={{display: "flex", flexDirection: "column", paddingLeft: 10}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: 'black'
                                }}>{this.props.userProfileBar[0].name}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'lightgrey'
                                }}>@{this.props.userProfileBar[0].Username}</Text>
                            </View>
                        </View>
                        {/*<View style={{paddingTop: 10}}>*/}
                        {/*    <Text style={{*/}
                        {/*        fontWeight: 'bold',*/}
                        {/*        fontFamily: 'Oxygen-Bold',*/}
                        {/*        fontSize: 16,*/}
                        {/*        color: '#14171A',*/}
                        {/*    }}>{localizeSideMenuScreen.SubscribersText}: {this.props.userProfileBar[0].subscribers.length}</Text>*/}
                        {/*    <Text style={{*/}
                        {/*        fontWeight: 'bold',*/}
                        {/*        fontFamily: 'Oxygen-Bold',*/}
                        {/*        fontSize: 16,*/}
                        {/*        color: '#14171A',*/}
                        {/*    }}>{localizeSideMenuScreen.SubscriptionsText}: {this.props.userProfileBar[0].subscribes.length}</Text>*/}
                        {/*</View>*/}
                        {/*</ImageBackground>}*/}
                    </View>}
                    <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                      onPress={() => this.props.navigation.navigate('switchNavEditProfile')}>
                        <View style={{marginLeft: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: 30}}><Icon name="md-person" type='ionicon' size={25} color='#263238'/></View>
                            <Text style={{fontWeight: 'regular', fontSize: 20, color: 'black', margin: 10}}>{localizeSideMenuScreen.YourProfileText}</Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <View style={{marginLeft: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: 30}}><Icon name="ios-settings" type='ionicon' size={25}
                                                            color='#263238'/></View>
                            <Text style={{
                                fontWeight: 'regular',
                                fontSize: 20,
                                color: 'black',
                                margin: 10,
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid'
                            }}>{localizeSideMenuScreen.SettingsText}</Text>
                            <Text style={{color: 'orange'}}>In dev</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}} onPress={async () => {
                        await AsyncStorage.clear();
                        this.props.navigation.navigate('Auth')
                    }}>
                        <View style={{marginLeft: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: 30}}><Icon name="md-exit" type='ionicon' size={25}
                                                            color='#263238'/></View>
                            <Text style={styles.sectionHeadingStyle}>{localizeSideMenuScreen.SignOutText}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                {/*<TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}*/}
                {/*                  onPress={() => {*/}
                {/*                      AsyncStorage.setItem('darkMode', true);*/}
                {/*                      AsyncStorage.getItem('darkMode', (err, item) => {*/}
                {/*                          console.log('darkMode:', item)*/}
                {/*                      });*/}
                {/*                  }}>*/}
                {/*    <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*        <View style={{width: 30}}><Icon name="switch" type='entypo' size={25} color='#263238'/></View>*/}
                {/*        <Text style={{fontWeight: 'regular', fontSize: 20, color: 'black', margin: 10}}>Dark Mode</Text>*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}

                {/*<Switch*/}
                {/*    trackColor={{false: "#767577", true: "#81b0ff"}}*/}
                {/*    thumbColor="#f5dd4b"*/}
                {/*    ios_backgroundColor="#3e3e3e"*/}
                {/*    onValueChange={(value) => this.setState({toggle: value})}*/}
                {/*    value={this.state.toggle}*/}
                {/*/>*/}

            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

const mapStateToProps = (state) => ({
    userProfileBar: state.appReducer.userProfileBar
})

export default connect(mapStateToProps, {setUserProfileBarThunk})(SideMenu);
