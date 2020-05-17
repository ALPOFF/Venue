import React from "react";
import {View, Text, Button, TouchableOpacity, ScrollView, Image, AsyncStorage} from "react-native";
import {Icon} from "react-native-elements";
import userPic from './../../assets/Screenshot_6.png'
import ImageBackground from "react-native-web/dist/exports/ImageBackground";
import * as axios from "axios";

const EventDetailsScreen = (props) => {
    const postId = props.navigation.state.params.postId;
    const userId = props.navigation.state.params.userId;
    const postText = props.navigation.state.params.postText;
    const pic = props.navigation.state.params.pic;
    const visitors = props.navigation.state.params.visitors;

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
            <Text>Организатор: {userId}</Text>
            <View>
                {visitors.map(v => <Text>{v}</Text>)}
            </View>
            <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                  onPress={() => props.navigation.navigate('Dialog', {
                                      msg: 'Some Msg'
                                  })}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={{
                            height: 40,
                            borderWidth: 1,
                            width: 40,
                            borderRadius: 30,
                            position: 'relative',
                            zIndex: 3,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image source={userPic} style={{height: 40,
                                borderWidth: 1,
                                borderColor: '#333733',
                                width: 40,
                                borderRadius: 30,
                                position: 'relative',
                                zIndex: 3,
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'}} />
                            <Text style={{fontWeight: 'bold', color: 'white', position: 'absolute', zIndex: 3, textShadowColor: 'black', textShadowRadius: 50}}>+25</Text>
                        </View>
                        <View style={{
                            height: 40,
                            borderWidth: 1,
                            width: 40,
                            borderRadius: 30,
                            position: 'relative',
                            zIndex: 2,
                            left: -26,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image source={userPic} style={{height: 40,
                                shadowColor: 'black',
                                borderWidth: 1,
                                borderColor: '#333733',
                                width: 40,
                                borderRadius: 30,
                                position: 'relative',
                                zIndex: 2,
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'}} />
                        </View>
                        <View style={{
                            height: 40,
                            borderWidth: 1,
                            width: 40,
                            borderRadius: 30,
                            position: 'absolute',
                            left: 23,
                            zIndex: 1,
                            backgroundColor: 'white'
                        }}>
                            <Image source={userPic} style={{height: 40,
                                borderWidth: 1,
                                borderColor: 'rgba(51,55,51,0.87)',
                                width: 40,
                                borderRadius: 30,
                                position: 'relative',
                                zIndex: 1,
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'}} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                  onPress={() => iGo()}>
                    <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black', margin: 10}}>Я пойду!</Text>
                    </View>
                </TouchableOpacity>



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

export default EventDetailsScreen;
