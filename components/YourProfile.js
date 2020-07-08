import React, {useEffect} from "react";
import {AsyncStorage, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import Geolocation from "@react-native-community/geolocation";
import * as axios from "axios";
import testimg from './../assets/Venue_new/testimg.jpg'
import prof from './../assets/Venue_new/prof.jpg'
import {formatDate} from "../common/formatDate";

const YourProfile = () => {

    const [a, setA] = React.useState(true);
    const [profile, setProfile] = React.useState({});

    useEffect(() => {
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/getprofile`, {
                userId: item
            }).then(res => {setProfile(res.data[0]); console.log('res:', res.data); console.log('lngth:', res.data[0].subscribers.length)})
        })
    }, []);

    return (
        <View style={{display: 'flex', flexDirection: 'column', position: "relative"}}>
            {a && <Image source={testimg} style={{height: '30%'}}/>}
            <View style={{display: "flex", alignItems: "center"}}>
                {a && <Image source={prof}
                             style={{width: '30%', height: '30%', borderRadius: 100}}/>}
            </View>
                <View style={{display: "flex", flexDirection: "row", padding: 10}}>
                    <View>
                        <Text>@{profile.Username}</Text>
                        <Text>{profile.description}</Text>
                        <Text>Подписки: {profile.subscribes.length}</Text>
                        <Text>Подписчики: {profile.subscribers.length}</Text>
                        <Text>Дата рождения: {formatDate(new Date(profile.birthday))}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                          onPress={() => alert('edit')}>
                            <Text>Изменить профиль</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}

export default YourProfile;
