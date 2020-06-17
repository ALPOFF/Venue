import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Image,
    ActivityIndicator, AsyncStorage, TextInput
} from "react-native";
import {Icon} from 'react-native-elements'
import * as axios from "axios";
import {connect} from "react-redux";

const UserEvents = (props) => {
    const [eventsData, setEventsData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [data, setData] = useState([]);
    const [friends, setFriends] = useState([]);
    const [choosenFriendDlg, setChoosenFriendDlg] = useState(null);


    useEffect(() => {
        AsyncStorage.getItem('userName', (err, item) => {

            axios.post(`http://185.12.95.84:5000/userevents`, {currentUserId: item})
                .then(res => {
                    setEventsData(res.data);
                    console.log(res.data)
                });
        })

        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`https://warm-ravine-29007.herokuapp.com/friends`, {currentUserId: item})
                .then(res => {
                    setFriends(res.data);
                    console.log('result friends:', res.data)
                });
        })

    }, []);


    let onprs = (text) => {

        console.log("text: " + text);
        axios.post(`https://warm-ravine-29007.herokuapp.com/users`, {userName: text})
            .then(res => {
                setUserList(res.data)
            });
    }

    let addToFriends = (friend_id) => {
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`https://warm-ravine-29007.herokuapp.com/addtofriends`, {user_id: item, friend_id: friend_id})
        });
    }

    return (
        <View style={{display: 'flex', margin: 20}}>

            <View style={{marginBottom: 10}}>
                <TextInput style={{
                    borderTopColor: 'lightgrey',
                    borderBottomColor: 'lightgrey',
                    borderTopWidth: 1,
                    height: 40,
                    borderBottomWidth: 1
                }} placeholder="Type here to find user ..." onChangeText={(text) => {
                    setData({data: text});
                    onprs(text)
                }} value={data}/>
                {userList != null && userList.map(d =>
                    <View style={{marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, paddingRight: 15}}>{d.Username}</Text>
                        <TouchableOpacity key={d.Username} onPress={() =>
                            addToFriends(d.user_id)
                        }>
                            <Icon name="person-add" size={30} color={'grey'}/>
                        </TouchableOpacity>
                    </View>
                )}
                <View>
                    {friends.map(f =>
                        <View style={{
                            paddingTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgray',
                            paddingBottom: 10
                        }}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={{fontSize: 20, paddingRight: 20}}>{f.Username}</Text>
                                <Text style={{fontSize: 20, paddingRight: 20}}>{f.user_id}</Text>
                                <View key={f.Username}>
                                    <TouchableOpacity key={f.Username} onPress={() => {
                                        AsyncStorage.getItem('userToken', (err, item) => {
                                            console.log('cuId:', item)
                                            console.log('frId:', f.user_id)
                                            axios.post(`https://warm-ravine-29007.herokuapp.com/friends_ls`, {
                                                currentUserId: item,
                                                friend_id: f.user_id
                                            }).then(res => {
                                                    console.log('resXx:', res.data[0].dialog_id)
                                                     setChoosenFriendDlg(18)
                                                    console.log('choosFrDlg:', choosenFriendDlg)
                                                    props.navigation.navigate('Dialog', {
                                                        dialog_id: res.data[0].dialog_id,
                                                        friend_id: f.user_id
                                                    })
                                                }
                                            )
                                        })
                                    }}>
                                        <Icon name="mail" size={30} color={'grey'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    resetSignUpView: {
        display: 'flex',
        flexDirection: 'row'
    },
    signIn: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 22,
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
    userId: state.appReducer.userId
})

export default connect(mapStateToProps, {})(UserEvents);

