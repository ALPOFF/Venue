import React, {useEffect} from "react";
import {Image, Text, TouchableOpacity, View, StyleSheet, SafeAreaView} from "react-native";
import {Icon} from "react-native-elements";
import userPic from '../../../assets/Screenshot_6.png'
import * as axios from "axios";
import Geolocation from "@react-native-community/geolocation";

const EventVisitorsDetailed = (props) => {

    const visitors = props.navigation.state.params.visitors;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    innerContainer: {
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 250,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
});

export default EventVisitorsDetailed;
