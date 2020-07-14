import React, {useState} from "react";
import {AsyncStorage, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as axios from "axios";
import {Icon} from "react-native-elements";
import ava from "../assets/Venue_new/userIcon.png";

const SearchScreen = (props) => {
    const [data, setData] = useState([]);
    const [userList, setUserList] = useState([]);

    let onprs = (text) => {

        console.log("text: " + text);
        axios.post(`http://185.12.95.84:3000/users`, {userName: text})
            .then(res => {
                setUserList(res.data)
                console.log(res.data)
            });
    }

    let addToFriends = (friend_id) => {
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/addtofriends`, {user_id: item, friend_id: friend_id})
        });
    }

    return (
        <View>
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

                    <TouchableOpacity onPress={() => {props.navigation.navigate('UserProfile', {user_id: d.user_id})}}>
                        <Text style={{fontSize: 20, paddingRight: 15}}>
                            {d.Username}
                        </Text>
                    </TouchableOpacity>
                    {d.profile_pic == null ? <Image source={ava} style={{height: 100, width: 100}}/> :
                        <Image source={{uri: d.profile_pic}}/>}
                    <TouchableOpacity key={d.Username} onPress={() =>
                        addToFriends(d.user_id)
                    }>
                        <Icon name="person-add" size={30} color={'grey'}/>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default SearchScreen;
