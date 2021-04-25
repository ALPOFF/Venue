import React, { useEffect } from "react";
import {
    ActivityIndicator,
    AsyncStorage,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Modal from 'react-native-modal';

import { Icon } from "react-native-elements";
import Geolocation from "@react-native-community/geolocation";
import * as axios from "axios";
import testimg from './../assets/Venue_new/testimg.jpg'
import prof from './../assets/Venue_new/prof.jpg'
import { formatDate } from "../common/formatDate";
import { distanceFunc } from "../common/distanceFunc";
import { BlurView } from "@react-native-community/blur";
import { localizeYourProfile } from "../localization/localize";
import Subscriptions from "./Subscriptions";

const YourProfile = (props) => {
    const [isModalVisible, setModalVisible] = React.useState(false);

    const [a, setA] = React.useState(true);
    const [profile, setProfile] = React.useState({});
    const [subscribes, setSubscribes] = React.useState([]);
    const [subscribers, setSubscribers] = React.useState([]);
    const [eventType, setEventType] = React.useState(0);
    const [eventInfoData, setEventInfoData] = React.useState([]);
    const [backgroundPic, setBackgroundPic] = React.useState('');
    const [profilePic, setProfilePic] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [curUsId, setCurUsId] = React.useState(null);

    useEffect(() => {
        AsyncStorage.getItem('userToken', (err, item) => {
            setCurUsId(item)
            axios.post(`http://185.12.95.84:3000/getprofile`, {
                userId: item
            }).then(res => {
                setProfile(res.data[0]);
                console.log('res:', res.data);
                console.log('lngth:', res.data[0].subscribers.length);
                setSubscribes(res.data[0].subscribes);
                setSubscribers(res.data[0].subscribers)
                setProfilePic(res.data[0].profile_pic)
                console.log('pr_pic:', res.data[0].profile_pic)
                setBackgroundPic(res.data[0].background_pic)
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

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const toggleModal = (x) => {
        // console.log(x)
        setModalVisible(!isModalVisible);
    };

    const scroll = React.createRef();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/getprofile`, {
                userId: item
            }).then(res => {
                setProfile(res.data[0]);
                console.log('res:', res.data);
                console.log('lngth:', res.data[0].subscribers.length);
                setSubscribes(res.data[0].subscribes);
                setSubscribers(res.data[0].subscribers)
                setProfilePic(res.data[0].profile_pic)
                console.log('pr_pic:', res.data[0].profile_pic)
                setBackgroundPic(res.data[0].background_pic)
            })

            axios.post(`http://185.12.95.84:3000/geteventinfo`, {
                userId: item,
                eventType: 0
            }).then(res => {
                setEventInfoData(res.data);
                console.log(res.data)
            })
        })
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

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

    return (
        backgroundPic == '' ?
            <ActivityIndicator size="large" style={{ paddingTop: '50%' }} color="#009788" /> :
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <ScrollView ref={scroll} showsVerticalScrollIndicator={true} decelerationRate={"normal"} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View style={{ height: 180, marginBottom: 10 }}>

                        {backgroundPic !== null ? a && <Image blurRadius={0.7} source={{ uri: backgroundPic }}
                            style={{ height: '100%', position: 'relative', zIndex: -100, top: 0 }} />
                            : a && <Image blurRadius={0.7} source={{ uri: 'https://wallpapercave.com/wp/wp2445766.jpg' }}
                                style={{ height: '100%', position: 'relative', zIndex: -100, top: 0 }} />
                        }

                        {profilePic !== null ? a && <Image source={{ uri: profilePic }}
                            style={{
                                width: '30%',
                                height: '60%',
                                borderRadius: 100,
                                borderWidth: 2,
                                borderColor: 'white',
                                top: '20%',
                                left: '35%',
                                position: 'absolute'
                            }} />
                            : a && <Image source={{ uri: 'https://eshendetesia.com/images/user-profile.png' }}
                                style={{
                                    width: '30%',
                                    height: '60%',
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: 'white',
                                    top: '20%',
                                    left: '35%',
                                    position: 'absolute'
                                }} />
                        }
                    </View>
                    <View style={{ height: '70%' }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgrey',
                            paddingBottom: 5,
                            alignItems: "center"
                        }}>
                            <View style={{ width: '100%' }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 20,
                                        fontFamily: 'Oxygen-Bold',
                                        paddingVertical: 7
                                    }}>@{profile.Username}</Text>
                                    <View>
                                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}
                                            onPress={() => {
                                                props.navigation.navigate('EditProfile', {
                                                    profilePic,
                                                    backgroundPic,
                                                    profile
                                                })
                                            }}>
                                            <Text style={{
                                                color: 'rgba(20,23,26,0.56)',
                                                fontSize: 18,
                                                fontFamily: 'Oxygen-Bold',
                                                borderWidth: 2,
                                                borderColor: '#009788',
                                                borderRadius: 30,
                                                paddingTop: 6,
                                                paddingBottom: 1,
                                                paddingLeft: 9,
                                                paddingRight: 9
                                            }}>{localizeYourProfile.editText}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {profile.name !== '' && <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Bold',
                                        paddingVertical: 2
                                    }}>{localizeYourProfile.nameText}: </Text>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Regular',
                                        paddingVertical: 2
                                    }}>{profile.name}</Text>
                                </View>}
                                {profile.description !== '' && <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Bold',
                                        paddingVertical: 2
                                    }}>{localizeYourProfile.bioText}: </Text>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Regular',
                                        paddingVertical: 2
                                    }}>{profile.description}</Text>
                                </View>}
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Bold',
                                        paddingVertical: 2
                                    }}>{localizeYourProfile.birthdayText}: </Text>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Regular',
                                        paddingVertical: 2
                                    }}>{formatDate(new Date(profile.birthday))}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <TouchableOpacity style={{ display: "flex", flexDirection: "row" }} onPress={() => { toggleModal() }}>
                                        <Text style={{
                                            color: '#14171A',
                                            fontSize: 16,
                                            fontFamily: 'Oxygen-Bold',
                                            paddingVertical: 2
                                        }}>{subscribes.length} </Text>
                                        <Text style={{
                                            color: '#14171A',
                                            fontSize: 16,
                                            fontFamily: 'Oxygen-Bold',
                                            paddingVertical: 2
                                        }}>{localizeYourProfile.subscriptionsText}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ display: "flex", flexDirection: "row", paddingLeft: 15 }}
                                        onPress={() => {
                                            props.navigation.navigate('Subscribers', {
                                                subscribers, user_id: curUsId
                                            })
                                        }}>
                                        <Text style={{
                                            color: '#14171A',
                                            fontSize: 16,
                                            fontFamily: 'Oxygen-Bold',
                                            paddingVertical: 2
                                        }}>{subscribers.length} </Text>
                                        <Text style={{
                                            color: '#14171A',
                                            fontSize: 16,
                                            fontFamily: 'Oxygen-Bold',
                                            paddingVertical: 2
                                        }}>{localizeYourProfile.subscribersText}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Modal isVisible={isModalVisible}
                                    // swipeDirection={['up', 'left', 'right', 'down']}
                                    style={styles.modalView}
                                    transparent={true}
                                    backdropTransitionOutTiming={0}
                                    onRequestClose={() => { toggleModal() }}
                                >
                                    <TouchableOpacity
                                        style={styles.container}
                                        activeOpacity={1}
                                        onPressOut={() => { toggleModal() }}
                                    >
                                    </TouchableOpacity>
                                    <View style={styles.containerStyle}>
                                        <View style={styles.content}>

                                            <Subscriptions subscriptions={subscribes} user_id={curUsId} />

                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </View>


                        <View>
                            <View
                                style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                <TouchableOpacity onPress={() => {
                                    setEventType(0);
                                    eventInfo();
                                }}><Text style={eventType === 0 ? styles.nav : styles.navChoosed}>{localizeYourProfile.organizedEventsText}</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setEventType(1);
                                    eventInfo();
                                }}><Text style={eventType === 0 ? styles.navChoosed : styles.nav}>{localizeYourProfile.visitedEventsText}</Text></TouchableOpacity>
                            </View>


                            <View style={{ paddingHorizontal: 10 }}>
                                {eventInfoData.length === 0 ?
                                    <View style={{ display: 'flex', alignItems: "center", paddingTop: 10 }}><Text style={{
                                        color: 'rgba(20,23,26,0.39)',
                                        fontSize: 20,
                                        fontFamily: 'Oxygen-Bold'
                                    }}>{localizeYourProfile.nothingFoundText}</Text></View> :
                                    <View>
                                        {eventInfoData.map(a => <TouchableOpacity activeOpacity={0.8} key={a.id}
                                            onPress={() =>
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
                                                {a.pic[0] != null && <Image
                                                    style={{ width: '100%', height: 200, borderRadius: 8 }}
                                                    source={{ uri: a.pic[0] }}
                                                />}
                                                <Text style={{
                                                    color: '#14171A',
                                                    fontSize: 15,
                                                    fontFamily: 'Oxygen-Regular'
                                                }}>{a.postText.substr(0, 120) + '...'}</Text>
                                                <Text>{a.id}</Text>
                                            </View></TouchableOpacity>)}
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    navChoosed: {
        color: 'rgba(20,23,26,0.73)',
        fontSize: 18,
        fontFamily: 'Oxygen-Bold',
        paddingTop: 5
    },
    nav: {
        color: '#009788',
        fontSize: 18,
        fontFamily: 'Oxygen-Bold',
        paddingTop: 5,
        borderTopWidth: 2,
        borderTopColor: '#009788'
    },
    modalView: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',

    },
    content: {
        width: '100%',
        height: '45%',
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
});

export default YourProfile;
