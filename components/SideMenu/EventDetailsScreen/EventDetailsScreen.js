import React, {useEffect, useState} from "react";
import {View, Text, Button, TouchableOpacity, ScrollView, Image, AsyncStorage} from "react-native";
import {Icon} from "react-native-elements";
import userPic from '../../../assets/Screenshot_6.png'
import ImageBackground from "react-native-web/dist/exports/ImageBackground";
import * as axios from "axios";
import EventVisitors from "./EventVisitors/EventVisitors";
import EventVisitorsTwo from "./EventVisitors/EventVisitorsTwo";
import EventVisitorsOne from "./EventVisitors/EventVisitorsOne";
import {connect} from "react-redux";

const EventDetailsScreen = (props) => {
    const postId = props.navigation.state.params.postId;
    const userIdOrg = props.navigation.state.params.userId;
    const postText = props.navigation.state.params.postText;
    const pic = props.navigation.state.params.pic;
    const visitors = props.navigation.state.params.visitors;

    const [currentUserId, setCurrentUserId] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('userToken', (err, item) => {
            setCurrentUserId(item)
        })
    }, []);

    const iGo = () => {
        console.log("NICE")
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`https://warm-ravine-29007.herokuapp.com/igo`,
                {user_id: item, postId: postId});
        })
    }

    return (
        <View style={{display: 'flex', flexDirection: 'column', padding: 10}}>
            <Image
                style={{width: '100%', height: 200, borderRadius: 8}}
                source={{uri: pic}}
            />
            <Text>Организатор: {userIdOrg}</Text>
            <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                  onPress={() => props.navigation.navigate('EventVisitorsDetailed', {
                                      visitors: visitors
                                  })}>
                    {visitors.length >= 3 && <EventVisitors visitors={visitors}/>}
                    {visitors.length === 2 && <EventVisitorsTwo visitors={visitors}/>}
                    {visitors.length === 1 && <EventVisitorsOne visitors={visitors}/>}
                </TouchableOpacity>
                {visitors.some(v => currentUserId == v) ?
                    <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'grey', margin: 10}}>Вы идете</Text>
                    </View>
                    :
                    <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                      onPress={() => iGo()}>
                        <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black', margin: 10}}>Я пойду!</Text>
                        </View>
                    </TouchableOpacity>
                }

                <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                  onPress={() => props.navigation.navigate('Dialog', {
                                      msg: 'Some Msg'
                                  })}>
                    <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black', margin: 10}}>Перейти в
                            беседу</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text>{postText}</Text>
            <Text>{postId}</Text>
        </View>
    )
};

export default connect(null, {})(EventDetailsScreen);
