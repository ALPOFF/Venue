import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as axios from "axios";
import { Icon } from "react-native-elements";
import ava from "../assets/Venue_new/userIcon.png";
import { localizeSearchScreen } from "../localization/localize";

const SearchScreen = (props) => {
    const [data, setData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        console.log('userList:', userList)
    }, [])

    let onprs = (text) => {
        setText(text)
        console.log("text: " + text);
        axios.post(`http://185.12.95.84:3000/users`, { userName: text })
            .then(res => {
                setUserList(res.data)
                console.log(res.data)
                console.log(data)
            });
    }

    return (
        <View>
            <TextInput style={{
                borderTopColor: 'lightgrey',
                borderBottomColor: 'lightgrey',
                borderTopWidth: 1,
                height: 50,
                borderBottomWidth: 1,
                paddingLeft: 10,
                fontSize: 15
            }} placeholder={localizeSearchScreen.TypeHereText} onChangeText={(text) => {
                setData({ data: text });
                onprs(text)
            }} value={data} />
            {text !== '' && userList != null && userList.map(d =>
                <View style={{
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10
                }}>
                    {d.profile_pic == null ? <Image source={{ uri: 'https://eshendetesia.com/images/user-profile.png' }} style={{ height: 40, width: 40, borderRadius: 30, marginRight: 8 }} />
                        : <Image source={{ uri: d.profile_pic }} style={{ height: 40, width: 40, borderRadius: 30, marginRight: 8 }} />}
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('UserProfile', { user_id: d.user_id })
                    }}>
                        <Text style={{ fontSize: 20, paddingRight: 10 }}>
                            {d.Username}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={d.Username} onPress={() => {
                        AsyncStorage.getItem('userToken', (err, item) => {
                            console.log('cuId:', item)
                            console.log('frId:', d.user_id)
                            axios.post(`http://185.12.95.84:3000/friends_ls`, {
                                currentUserId: item,
                                friend_id: d.user_id
                            }).then(res => {
                                console.log('res.datafr_ls:', res.data)
                                console.log('res.data[0] !== undefined:', res.data[0] !== undefined)
                                res.data[0] !== undefined ?
                                    props.navigation.navigate('Dialog', {
                                        dialog_id: res.data[0].dialog_id,
                                        friend_id: d.user_id,
                                        users_id: res.data[0].users_id,
                                        eventType: false
                                    }) :
                                    props.navigation.navigate('Dialog', {
                                        dialog_id: "none",
                                        friend_id: d.user_id,
                                        eventType: false
                                    })
                            }
                            )
                        })
                    }}>
                        <Icon name="mail" size={30} color={'grey'} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default SearchScreen;
