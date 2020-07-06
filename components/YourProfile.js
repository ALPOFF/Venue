import React, {useEffect} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import Geolocation from "@react-native-community/geolocation";
import * as axios from "axios";
import testimg from './../assets/Venue_new/testimg.jpg'
import prof from './../assets/Venue_new/prof.jpg'

const YourProfile = () => {

    const [a, setA] = React.useState(true);

    useEffect(() => {

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
                    <Text>логин</Text>
                    <Text>подписчики</Text>
                    <Text>др</Text>
                    <Text>описание</Text>
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
