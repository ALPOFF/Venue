import React, {Component, useEffect, useState} from "react";
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";
import * as axios from "axios";
import {connect} from "react-redux";
import {combineReducers} from "redux";
import io from "socket.io-client";
import {getCurDialogsUser, setSocket} from "../state/appReducer";

const URL = 'https://warm-ravine-29007.herokuapp.com/';
const socket = io(URL, {forceNode: false});

class MessageScreen extends Component {
    static navigationOptions = ({ navigation }) => {
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
            upd: true
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('userToken', (err, item) => {
            this.props.getCurDialogsUser(item)
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
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('prevProps:', prevProps.dialogs)
        console.log('props:', this.props.dialogs)

 
        if (prevProps.dialogs == this.props.dialogs ) {
            AsyncStorage.getItem('userToken', (err, item) => {
                this.props.getCurDialogsUser(item)
            });
        }
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
                <View style={{marginBottom: 10}}>
                    <TextInput style={{
                        borderTopColor: 'lightgrey',
                        borderBottomColor: 'lightgrey',
                        borderTopWidth: 1,
                        height: 40,
                        borderBottomWidth: 1
                    }} placeholder="Type here to find user ..." onChangeText={(text) => {
                        this.setState({data: text});
                        this.onprs(text)
                    }} value={this.state.data}/>
                    {this.state.userList != null && this.state.userList.map(d =>
                        <TouchableOpacity key={d.Username} onPress={() =>
                            this.props.navigation.navigate('Dialog', {
                                nickname: d.Username, user_id: d.user_id,
                            })}>
                            <View style={{marginBottom: 10}}>
                                <Text>{d.Username}</Text>
                                <Text>{d.user_id}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

               {(this.props.dialogs !== undefined) ?
                <View>
                    {this.props.dialogs[0] != undefined && this.props.dialogs.map(d =>
                        <TouchableOpacity key={d.dialog_id} onPress={() =>
                            this.props.navigation.navigate('Dialog', {
                                dialog_id: d.dialog_id, dialogTitle: d.dialogTitle, users_id: d.users_id
                            })}>
                            <View style={{
                                margin: 10,
                                paddingBottom: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: "lightgrey"
                            }}>
                                <Text style={{fontWeight: "bold", fontSize: 18}}>{d.dialogTitle}</Text>
                                <Text>{d.last_msg}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View> : <View><Text>1111</Text></View>}
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

export default connect(mapStateToProps, {setSocket, getCurDialogsUser})(MessageScreen);
