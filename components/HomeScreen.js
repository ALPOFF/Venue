import React, { useEffect, useState } from "react";
import * as axios from "axios";
import { distanceFunc } from "../common/distanceFunc";
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from "react-native-elements";

import {
    AsyncStorage,
    Image,
    ImageBackground,
    NativeModules,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from "react-native";
import { connect } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import {
    addNewEventData,
    setCurrentUserid,
    setEventData,
    setLastPost,
    setUserCoord,
    setUserProfileBarThunk
} from "../state/appReducer";
import { localizeHomeScreen } from "../localization/localize";
import ModalComponent from "./ModalComponent/ModalComponent";
import testPush from "../common/pushNotificationFunc";

// Android:
const locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"

const categoryArray = [
    { label: 'Квартирник', value: '0' },
    { label: 'Концерт', value: '1' },
    { label: 'Игры', value: '2' },
    { label: 'Бизнес', value: '3' },
    { label: 'Здоровье', value: '4' },
    { label: 'Образование', value: '5' },
    { label: 'Спорт', value: '6' },
    { label: 'Другое', value: '7' },
    { label: 'Все', value: '8' },
]

const HomeScreen = (props) => {

    const [isModalVisible, setModalVisible] = useState(false);

    //filter
    const [byCategoryValue, setByCategoryValue] = useState(8); //true -> new false -> older || default sorted by new added posts //null - vse
    const [byEventDataValue, setByEventDataValue] = useState(false);

    const toggleModal = (x) => {
        // console.log(x)
        setModalVisible(!isModalVisible);
    };

    const [refreshing, setRefreshing] = useState(false);
    const [userCoord, setUserCoord] = useState({});
    const [postsRender, setPostsRender] = useState(true);
    const [newlastPost, setNewLastPost] = useState(0);

    let sysLang = ''
    locale === 'ru_RU' ? sysLang = 'ru_RU' : sysLang = 'en_US';

    //let closeActivityIndicator = () => setTimeout(() => setPostsRender(true), 10000)

    useEffect(() => {
        //testPush()
        //closeActivityIndicator()
        AsyncStorage.getItem('userToken', (err, item) => {
            props.setCurrentUserid(item)
        })
        Geolocation.getCurrentPosition((position) => {
            setUserCoord({ "latitude": position.coords.latitude, "longitude": position.coords.longitude })
            axios.post(`http://185.12.95.84:3000/events`,
                {
                    "lastPost": newlastPost, "userCoord": position.coords, sysLang: sysLang,
                    "filterParams": { "byCategory": byCategoryValue, "byEventDate": byEventDataValue }
                }
            )
                .then(res => {
                    console.log('ALLLL:', res.data)
                    props.setEventData(res.data.data);
                    setNewLastPost(res.data.last_post)
                    console.log('event_array:', res.data.posts)
                    setPostsRender(res.data.posts)
                });
            console.log('current_pos:', position);
        }, (error) => {
            // См. таблицы кодов ошибок выше.
            console.log(error.code, error.message);
        }, {
            enableHighAccuracy: false,
            timeout: 10000,
            // maximumAge: 100000
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
        Geolocation.getCurrentPosition((position) => {
            setUserCoord({ "latitude": position.coords.latitude, "longitude": position.coords.longitude })
            axios.post(`http://185.12.95.84:3000/events`,
                {
                    "lastPost": newlastPost, "userCoord": position.coords, sysLang: sysLang,
                    "filterParams": { "byCategory": byCategoryValue, "byEventDate": byEventDataValue }
                }
            )
                .then(res => {
                    console.log('ALLLL:', res.data)
                    props.setEventData(res.data.data);
                    setNewLastPost(res.data.last_post)
                    console.log('event_array:', props.eventData)
                    console.log('event_array_posts:', props.eventData.posts)
                    setPostsRender(res.data.posts)
                });
            console.log('current_pos:', position);
        }, (error) => {
            // См. таблицы кодов ошибок выше.
            console.log(error.code, error.message);
        }, {
            enableHighAccuracy: false,
            timeout: 10000,
            // maximumAge: 100000
        });
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const filterByCategory = (data) => {
        axios.post(`http://185.12.95.84:3000/events`,
            {
                "lastPost": newlastPost, "userCoord": userCoord, sysLang: sysLang,
                "filterParams": { "byCategory": byCategoryValue, "byEventDate": byEventDataValue }
            }
        )
            .then(res => {
                console.log('ALLLL:', res.data)
                props.setEventData(res.data.data);
                setNewLastPost(res.data.last_post)
                console.log('event_array:', props.eventData)
                console.log('event_array_posts:', props.eventData.posts)
                setPostsRender(res.data.posts)
            });
        toggleModal()
    }

    return (
        // props.eventData.length !== 0 ? <ActivityIndicator size="large" style={{paddingTop: '50%'}} color="#009788" /> :
        // postsRender ? <ActivityIndicator size="large" style={{paddingTop: '50%'}} color="#009788" /> :
        <View style={{ display: 'flex', backgroundColor: '#ffffff', height: '100%' }}>
            <View style={{ height: '100%', paddingTop: 20 }}>
                {/*{postsRender == true ? */ <ScrollView ref={scroll} showsVerticalScrollIndicator={true} decelerationRate={"normal"}
                    onScrollEndDrag={() => {
                        // Geolocation.getCurrentPosition((position) => {
                        //     setUserCoord({
                        //         "latitude": position.coords.latitude,
                        //         "longitude": position.coords.longitude
                        //     })
                        //     axios.post(`http://185.12.95.84:3000/events`,
                        //         {
                        //             "lastPost": newlastPost, "userCoord": position.coords, sysLang: sysLang,
                        //             "filterParams": { "byCategory": byCategoryValue, "byEventDate": byEventDataValue }
                        //         }
                        //     )
                        //         .then(res => {
                        //             console.log('ALLLL:', res.data)
                        //             props.addNewEventData(res.data.data);
                        //             setNewLastPost(res.data.last_post)
                        //             console.log('event_array:', props.eventData)
                        //             setPostsRender(res.data.posts)
                        //         });
                        //     console.log('current_pos:', position);
                        // }, (error) => {
                        //     // См. таблицы кодов ошибок выше.
                        //     console.log(error.code, error.message);
                        // }, {
                        //     enableHighAccuracy: false,
                        //     timeout: 10000,
                        //     // maximumAge: 100000
                        // });
                        axios.post(`http://185.12.95.84:3000/events`,
                            {
                                "lastPost": newlastPost, "userCoord": userCoord, sysLang: sysLang,
                                "filterParams": { "byCategory": byCategoryValue, "byEventDate": byEventDataValue }
                            }
                        )
                            .then(res => {
                                console.log('ALLLL:', res.data)
                                props.addNewEventData(res.data.data);
                                setNewLastPost(res.data.last_post)
                                console.log('event_array:', props.eventData)
                                setPostsRender(res.data.posts)
                            });
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {props.eventData != undefined ? props.eventData.map(a => <TouchableOpacity activeOpacity={0.8}
                        key={a.id} onPress={() =>
                            props.navigation.navigate('EventDetails', {
                                postId: a.id,
                                userId: a.userId,
                                postText: a.postText,
                                pic: a.pic,
                                visitors: a.visitors,
                                postTitle: a.postTitle,
                                postCat: a.eventCat
                            })}>
                        {a.pic[0] != null && <ImageBackground style={{ height: 200, marginBottom: 25, marginLeft: 10, marginRight: 10 }} imageStyle={{ borderRadius: 15 }} source={{ uri: a.pic[0] }}>
                            <View style={{ height: 200, backgroundColor: 'black', opacity: 0.3, borderRadius: 15 }}>
                            </View>

                            <View style={{ display: "flex", height: 200, width: 500, position: "absolute", bottom: 0 }}>
                                <View style={{ display: "flex", width: 500, justifyContent: "flex-end", paddingLeft: 210, paddingTop: 5 }}>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 15,
                                        fontFamily: 'Oxygen-Bold'
                                    }}>{(Math.ceil((distanceFunc(a.place, userCoord)) * 100) / 100)} km from
                                            you</Text>
                                </View>
                                <View style={{ display: "flex", width: 320, paddingLeft: 10, flexDirection: "column", position: "absolute", bottom: 0, paddingBottom: 10 }}>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 20,
                                        fontFamily: 'Oxygen-Regular',
                                        paddingBottom: 10
                                    }}>{a.postTitle}</Text>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: 15,
                                        fontFamily: 'Oxygen-Regular'
                                    }}>{a.postText.substr(0, 120) + '...'}</Text>
                                </View>
                            </View>

                        </ImageBackground>}
                    </TouchableOpacity>)
                        : <View style={{ alignItems: 'center', }}><Text style={{
                            color: 'rgba(20,23,26,0.5)',
                            fontSize: 20,
                            textAlign: "center",
                            fontFamily: 'Oxygen-Bold',
                            paddingTop: 20
                        }}>
                            {localizeHomeScreen.eventStatus}</Text></View>
                    }
                    {postsRender && <View style={{ alignItems: 'center', }}>
                        <Text style={{
                            color: 'rgba(20,23,26,0.5)',
                            fontSize: 20,
                            textAlign: "center",
                            fontFamily: 'Oxygen-Bold',
                            paddingBottom: 20
                        }}>
                            События закончились
                        </Text>
                    </View>}
                </ScrollView> /*: <ActivityIndicator size="large" style={{paddingTop: '50%'}} color="#009788" />*/}

                {/* <ModalComponent isModalVisible={isModalVisible} toggleModal={toggleModal} /> */}

                <Modal isVisible={isModalVisible}
                    // swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.modalView}
                    transparent={true}
                    backdropTransitionOutTiming={0}
                    onRequestClose={() => { setModalVisible(false) }}
                >
                    <TouchableOpacity
                        style={styles.container}
                        activeOpacity={1}
                        onPressOut={() => { setModalVisible(false) }}
                    >
                    </TouchableOpacity>
                    <View style={styles.containerStyle}>
                        <View style={styles.content}>
                            <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", paddingBottom: 10 }}>Фильтры</Text>
                            <View>
                                <TouchableOpacity><Text style={{ fontSize: 18, fontWeight: "bold" }}>Категория</Text></TouchableOpacity>
                                <RNPickerSelect placeholder={{ label: `${categoryArray[byCategoryValue].label}` }}
                                    style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
                                    onValueChange={(value) => { setByCategoryValue(value); console.log('value', value) }}
                                    items={categoryArray}
                                />
                            </View>
                            <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", paddingBottom: 10 }}>Упорядочить</Text>
                            <View>
                                <TouchableOpacity onPress={() => { setByEventDataValue(!byEventDataValue) }}>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 5 }}>По дате проведения</Text>
                                        {byEventDataValue ?
                                            <Icon
                                                name='chevron-down'
                                                type='feather'
                                                color='black'
                                            /> :
                                            <Icon
                                                name='chevron-up'
                                                type='feather'
                                                color='black'
                                            />}
                                    </View>
                                </TouchableOpacity>
                                <View style={{ opacity: 0.3, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 5 }}>По числу просмотров</Text><Text> In dev</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => filterByCategory()}>
                                <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", paddingBottom: 10 }}>Подтвердить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                <Image
                    style={{ opacity: 1, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5 }}
                    source={require('./../assets/Venue_new/addIcon3.png')} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}
                style={{
                    position: 'absolute',
                    left: 20,
                    bottom: 10,
                    backgroundColor: 'transparent',
                    zIndex: 999
                }}
                onPress={() => toggleModal()}>
                <Image
                    style={{ opacity: 1, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5 }}
                    source={require('./../assets/Venue_new/modal.png')} />
            </TouchableOpacity>
        </View >
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

let mapStateProps = (state) => ({
    last_post: state.appReducer.last_post,
    eventData: state.appReducer.eventData,
    userProfileBar: state.appReducer.userProfileBar
})

export default connect(mapStateProps, {
    setUserCoord,
    setUserProfileBarThunk,
    setLastPost,
    setEventData,
    addNewEventData,
    setCurrentUserid
})(HomeScreen);
