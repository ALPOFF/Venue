import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import userPic from '../../../assets/Screenshot_6.png'

const EventVisitorsDetailed = (props) => {
    const visitors = props.navigation.state.params.visitors;
    return (
        <View>
            {visitors.map(v =>
                <View style={{display: 'flex', flexDirection: 'row'}}>
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
                    <Text>{v}</Text>
                </View>)}
            <TouchableOpacity activeOpacity={0.8}
                              style={{
                                  position: 'absolute',
                                  right: 10,
                                  top: 10,
                                  backgroundColor: 'transparent',
                                  zIndex: 999
                              }}
                              onPress={() =>
                                  props.navigation.navigate('EventDetailsScreen')}>
                <Icon style={{opacity: .8, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5}}
                      name="close" size={40} color={'#009788'}/>
            </TouchableOpacity>
        </View>
    )
}

export default EventVisitorsDetailed;
