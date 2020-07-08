import React, {useEffect} from "react";
import {AsyncStorage, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import Geolocation from "@react-native-community/geolocation";
import * as axios from "axios";
import testimg from './../assets/Venue_new/testimg.jpg'
import prof from './../assets/Venue_new/prof.jpg'
import {formatDate} from "../common/formatDate";
import {distanceFunc} from "../common/distanceFunc";

const YourProfile = () => {

    const [a, setA] = React.useState(true);
    const [profile, setProfile] = React.useState({});
    const [subscribes, setSubscribes] = React.useState([]);
    const [subscribers, setSubscribers] = React.useState([]);
    const [eventType, setEventType] = React.useState(0);
    const [eventInfoData, setEventInfoData] = React.useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/getprofile`, {
                userId: item
            }).then(res => {
                setProfile(res.data[0]);
                console.log('res:', res.data);
                console.log('lngth:', res.data[0].subscribers.length);
                setSubscribes(res.data[0].subscribes);
                setSubscribers(res.data[0].subscribers)
            })

            axios.post(`http://185.12.95.84:3000/geteventinfo`, {
                userId: item,
                eventType: 0
            }).then(res => {
                setEventInfoData(res.data);
                console.log(res.data)
            })
        })
    }, []);
    const scroll = React.createRef();
    const eventInfo = () => {
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/geteventinfo`, {
                userId: item,
                eventType: eventType
            }).then(res => {
                setEventInfoData(res.data);
                console.log(res.data)
            })
        })
    }

    const navColor = (color) => {
        return {
            color: `${color}`,
            fontSize: 18,
            fontFamily: 'Oxygen-Bold'
        }
    }

    return (
        <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{height: '40%', marginBottom: 10}}>
                {a && <Image blurRadius={0.7} source={testimg}
                             style={{height: '100%', position: 'relative', zIndex: -100, top: 0}}/>}

                {a && <Image source={prof}
                             style={{
                                 width: '30%',
                                 height: '60%',
                                 borderRadius: 100,
                                 borderWidth: 2,
                                 borderColor: 'white',
                                 top: '20%',
                                 left: '35%',
                                 position: 'absolute'
                             }}/>}

            </View>
            <View style={{
                display: "flex",
                flexDirection: "row",
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
                paddingBottom: 5,
                justifyContent: "space-between"
            }}>
                <View>
                    <Text style={{
                        color: '#14171A',
                        fontSize: 20,
                        fontFamily: 'Oxygen-Bold',
                        paddingVertical: 7
                    }}>@{profile.Username}</Text>
                    {profile.description !== '' && <View style={{display: "flex", flexDirection: "row"}}>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 15,
                            fontFamily: 'Oxygen-Regular',
                            paddingVertical: 1
                        }}>Bio: </Text>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 15,
                            fontFamily: 'Oxygen-Regular',
                            paddingVertical: 1
                        }}>{profile.description}</Text>
                    </View>}
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 15,
                            fontFamily: 'Oxygen-Regular',
                            paddingVertical: 1
                        }}>Subscribes: </Text>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 15,
                            fontFamily: 'Oxygen-Bold',
                            paddingVertical: 1
                        }}>{subscribes.length}</Text>
                    </View>
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 15,
                            fontFamily: 'Oxygen-Regular',
                            paddingVertical: 1
                        }}>Subscribers: </Text>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 15,
                            fontFamily: 'Oxygen-Bold',
                            paddingVertical: 1
                        }}>{subscribers.length}</Text>
                    </View>
                    <Text style={{
                        color: '#14171A',
                        fontSize: 15,
                        fontFamily: 'Oxygen-Regular',
                        paddingVertical: 1
                    }}>Birthday: {formatDate(new Date(profile.birthday))}</Text>
                </View>
                <View>
                    <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                      onPress={() => alert('edit')}>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 18,
                            fontFamily: 'Oxygen-Bold'
                        }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View>
                <View
                    style={{display: "flex", flexDirection: "row", justifyContent: "space-around", paddingVertical: 5}}>
                    <TouchableOpacity onPress={() => {
                        setEventType(0);
                        eventInfo();
                    }}><Text style={eventType === 0 ? styles.nav : styles.navChoosed}>Organized
                        events</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setEventType(1);
                        eventInfo();
                    }}><Text style={eventType === 0 ? styles.navChoosed : styles.nav}>Visited
                        events</Text></TouchableOpacity>
                </View>


                <View style={{paddingHorizontal: 10}}>
                    {/*<Text>content {eventType}</Text>*/}
                    {eventInfoData.length === 0 ?
                        <View style={{display: 'flex', alignItems: "center", paddingTop: 10}}><Text style={{
                            color: 'rgba(20,23,26,0.39)',
                            fontSize: 20,
                            fontFamily: 'Oxygen-Bold'
                        }}>Nothing found</Text></View> :
                        <ScrollView ref={scroll} showsVerticalScrollIndicator={true} decelerationRate={"normal"}>
                            {eventInfoData.map(a => <TouchableOpacity activeOpacity={0.8} key={a.id} onPress={() =>
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
                                <Text>{(Math.ceil((distanceFunc(a.place, userCoord)) * 100) / 100)} km from
                                    you</Text>
                                {a.pic[0] != null && <Image
                                    style={{width: '100%', height: 200, borderRadius: 8}}
                                    source={{uri: a.pic[0]}}
                                />}
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 15,
                                    fontFamily: 'Oxygen-Regular'
                                }}>{a.postText.substr(0, 120) + '...'}</Text>
                                <Text>{a.id}</Text>
                            </View></TouchableOpacity>)}
                        </ScrollView>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navChoosed: {
        color: 'rgba(20,23,26,0.73)',
        fontSize: 18,
        fontFamily: 'Oxygen-Bold'
    },
    nav: {
        color: '#009788',
        fontSize: 18,
        fontFamily: 'Oxygen-Bold'
    }
});

export default YourProfile;
