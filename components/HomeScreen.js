import React, {useEffect, useState} from "react";
import * as axios from "axios";
import {useDarkMode} from 'react-native-dark-mode'
import {distanceFunc} from "../common/distanceFunc";

import {
    Image,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    ScrollView, ActivityIndicator
} from "react-native";
import {connect} from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import {setUserCoord} from "../state/appReducer";


const HomeScreen = (props) => {

    const [eventsData, setEventsData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [userCoord, setUserCoord] = React.useState({});

    useEffect(() => {
        axios.get(`http://185.12.95.84:3000/events`)
            .then(res => {
                setEventsData(res.data);
                console.log('event_array:',res.data)
                console.log('coords:', res.data[4].place)
            });

        Geolocation.getCurrentPosition((position) => {
            console.log('current_pos:', position);
            setUserCoord({"latitude": position.coords.latitude, "longitude": position.coords.longitude})
        }, (error) => {
            // См. таблицы кодов ошибок выше.
            console.log(error.code, error.message);
        }, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 100000
        });

        console.log('userCoord:', props.userCoord)
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const scroll = React.createRef();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // axios.get(`https://warm-ravine-29007.herokuapp.com/events`)
        axios.get(`http://185.12.95.84:3000/events`)
            .then(res => {
                setEventsData(res.data);
                //console.log(res.data)
            });
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <View style={{display: 'flex', backgroundColor: '#F1EFF1'}}>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10
            }}>
            </View>
            <View>
                {eventsData ?
                    <ScrollView ref={scroll} showsVerticalScrollIndicator={true} decelerationRate={"normal"}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                        {eventsData.map(a => <TouchableOpacity activeOpacity={0.8} key={a.id} onPress={() =>
                            props.navigation.navigate('EventDetails', {
                                postId: a.id,
                                userId: a.userId,
                                postText: a.postText,
                                pic: a.pic,
                                visitors: a.visitors,
                                postTitle: a.postTitle
                            })}><View style={{
                            marginBottom: 10,
                            alignItems: 'center',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgrey'
                        }}>
                            <Text style={{
                                color: '#14171A',
                                fontSize: 20,
                                fontFamily: 'Oxygen-Regular'
                            }}>{a.postTitle}</Text>
                            <Text>{(Math.ceil((distanceFunc(a.place[1].coords, userCoord)) * 100) / 100)} km from you</Text>
                            {a.pic[0] != null && <Image
                                style={{width: '100%', height: 200, borderRadius: 8}}
                                source={{uri: a.pic[0]}}
                            />}
                            <Text style={{
                                color: '#14171A',
                                fontSize: 15,
                                fontFamily: 'Oxygen-Light'
                            }}>{a.place.coords}</Text>
                            <Text style={{
                                color: '#14171A',
                                fontSize: 15,
                                fontFamily: 'Oxygen-Regular'
                            }}>{a.postText.substr(0, 120) + '...'}</Text>
                        </View></TouchableOpacity>)}
                    </ScrollView>
                    : <View style={{height: '100%'}}>
                        <ActivityIndicator size="large" color="#009788" style={{margin: 30}}/>
                    </View>
                }
            </View>
            <TouchableOpacity activeOpacity={0.8}
                              style={{
                                  position: 'absolute',
                                  right: 10,
                                  bottom: 10,
                                  backgroundColor: 'transparent',
                                  zIndex: 999
                              }}
                              onPress={() => props.navigation.navigate('Detail')}>
                <Image style={{opacity: 1, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5}}
                       source={require('./../assets/Venue_new/addIcon3.png')}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    resetSignUpView: {
        display: 'flex',
        flexDirection: 'row'
    },
    signIn: {
        marginTop: 5,
        fontStyle: 'normal',
        fontSize: 32,
        lineHeight: 42,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.015,
        fontFamily: 'arr',
        color: '#009788'
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
    },
});



export default connect(null, {setUserCoord})(HomeScreen);
