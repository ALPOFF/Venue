import React, {useEffect} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import userPic from "../../assets/Screenshot_6.png";

const EventVisitors = (props) => {
    useEffect(() => {
        console.log('visitors:', props.visitors)
    }, []);

    return (
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
                    <Image source={userPic} style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#333733',
                        width: 40,
                        borderRadius: 30,
                        position: 'relative',
                        zIndex: 3,
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}/>
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'white',
                        position: 'absolute',
                        zIndex: 3,
                        textShadowColor: 'black',
                        textShadowRadius: 50
                    }}>+{props.visitors.length - 3}</Text>
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
                    <Image source={userPic} style={{
                        height: 40,
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
                        justifyContent: 'center'
                    }}/>
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
                    <Image source={userPic} style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: 'rgba(51,55,51,0.87)',
                        width: 40,
                        borderRadius: 30,
                        position: 'relative',
                        zIndex: 1,
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}/>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default EventVisitors;
