import React from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";

const YourProfile = () => {
    return (
        <View style={{display: 'flex', flexDirection: 'column'}}>
            {/*<Image*/}
            {/*    style={{width: '100%', height: 200, borderRadius: 8}}*/}
            {/*    source={{uri: a.pic[0]}}*/}
            {/*/>*/}
            <View style={{display: "flex", flexDirection: "row"}}>
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
