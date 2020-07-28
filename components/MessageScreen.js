import React, {Component, useEffect, useState} from "react";
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView} from "react-native";
import * as axios from "axios";
import {connect} from "react-redux";
import {combineReducers} from "redux";
import io from "socket.io-client";
import {getCurDialogsUser, setCurDialogId, setSocket} from "../state/appReducer";
import LocalizedStrings from 'react-native-localization';

const URL = 'http://185.12.95.84:3000/';
const socket = io(URL, {forceNode: false});

let strings = new LocalizedStrings({
    "en-US": {
        how: "How do you want your egg today?",
    },
    ru: {
        how: "Come vuoi il tuo uovo oggi?",
        boiledEgg: "Uovo sodo",
        softBoiledEgg: "Uovo alla coque",
        choice: "Come scegliere l'uovo"
    }
});

class MessageScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('Title', 'Default Title1'),
            //Default Title of ActionBar
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor', '#ED2525'),
                //Background color of ActionBar
            },
            headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
            //Text color of ActionBar
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            data: '',
            upd: true,
            userTitles: []
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('userToken', (err, item) => {
            AsyncStorage.getItem('userName', (err, itemname) => {
                console.log('usnm:', itemname)
                this.props.getCurDialogsUser(item, itemname)
            })
            console.log('GXGGXGXGXGXGXG:', this.props.dialogs)
        });

        socket.on('connect', () => {
            console.log("CONNECTED");
        });

        socket.on('disconnect', () => {
            console.log('connection to server lost.');
        });
        socket.on('message', res => {
            this.props.setSocket(res)
            this.props.setCurDialogId(res.dialog_id)
            console.log('resresres', res)
        })
        this.fnc()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dialogs == this.props.dialogs) {
            AsyncStorage.getItem('userToken', (err, item) => {
                AsyncStorage.getItem('userName', (err, itemname) => {
                    console.log('usnm:', itemname)
                    this.props.getCurDialogsUser(item, itemname)
                })
            });
        }
    }

    fnc() {
        AsyncStorage.getItem('userToken', (err, item) => {
            console.log(item)
            let a = []
            //this.props.dialogs.map(u => a.push({'d_id': u.dialog_id, 'us_id': u.users_id.filter(t => t != item)}))
            this.props.dialogs.map(u => a.push(...u.users_id.filter(t => t != item)))
            axios.post(`http://185.12.95.84:3000/msgtitles`, {usersArray: a})
                .then(res => {
                    console.log(res.data)
                    this.setState({userTitles: res.data})
                });
            console.log('a:', a)
        });
    }

    onprs(text) {
        console.log(this.state.data)
        console.log("text: " + text);
        axios.post(`https://warm-ravine-29007.herokuapp.com/users`, {userName: text})
            .then(res => {
                this.setState({userList: res.data});
            });
        console.log(this.state.userList)
    }

    render() {
        return (
            <View style={{marginTop: 10}}>
                {(this.props.dialogs !== undefined) ?
                    <ScrollView showsVerticalScrollIndicator={true} decelerationRate={"normal"}>
                        {this.props.dialogs[0] != undefined && this.props.dialogs.map(d =>
                            <TouchableOpacity key={d.dialog_id} onPress={() =>
                                this.props.navigation.navigate('Dialog', {
                                    dialog_id: d.dialog_id, dialogTitle: d.dialogTitle, users_id: d.users_id, eventType: d.event
                                })}>
                                <View style={{
                                    margin: 10,
                                    paddingBottom: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "lightgrey"
                                }}>
                                    {!d.event ? <Text style={{fontWeight: "bold", fontSize: 18}}>{d.Username}</Text> :
                                        <Text style={{fontWeight: "bold", fontSize: 18}}>{d.dialogTitle}</Text>}
                                    <Text>{d.last_msg}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView> : <View><Text>1111</Text></View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    resetSignUpView: {
        display: 'flex',
        flexDirection: 'row'
    },
    signIn: {
        margin: 10,
        fontStyle: 'normal',
        fontSize: 32,
        lineHeight: 42,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.015,

        color: '#3C2274'
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
    },
});

const mapStateToProps = (state) => ({
    skt: state.appReducer.skt,
    dialogs: state.appReducer.dialogs
});

export default connect(mapStateToProps, {setSocket, getCurDialogsUser, setCurDialogId})(MessageScreen);
