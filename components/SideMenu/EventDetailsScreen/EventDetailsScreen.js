import React, { Component, useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView,
    Image,
    AsyncStorage,
    SafeAreaView, ActivityIndicator, AppState, Platform
} from "react-native";
import { Icon } from "react-native-elements";
import userPic from '../../../assets/Screenshot_6.png'
import ImageBackground from "react-native-web/dist/exports/ImageBackground";
import * as axios from "axios";
import EventVisitors from "./EventVisitors/EventVisitors";
import EventVisitorsTwo from "./EventVisitors/EventVisitorsTwo";
import EventVisitorsOne from "./EventVisitors/EventVisitorsOne";
import { connect } from "react-redux";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AnimatedWithChildren from "react-native-web/dist/vendor/react-native/Animated/nodes/AnimatedWithChildren";
import { NativeModules } from 'react-native'
import PushNotification from "react-native-push-notification";
import { localizeEventDetScreen } from "../../../localization/localize";
import Modal from 'react-native-modal';


// iOS:
// const locale = NativeModules.SettingsManager.settings.AppleLocale ||
//     NativeModules.SettingsManager.settings.AppleLanguages[0] // "fr_FR"

// Android:
const locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"

const { height, width } = Dimensions.get('window');

class EventDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                'http://www.bluecode.jp/images/A.png',
                'http://www.bluecode.jp/images/B.png',
                'http://www.bluecode.jp/images/C.png'


            ],
            currentUserId: false,
            postId: this.props.navigation.state.params.postId,
            userIdOrg: this.props.navigation.state.params.userId,
            postText: this.props.navigation.state.params.postText,
            pic: this.props.navigation.state.params.pic,
            visitors: this.props.navigation.state.params.visitors,
            activeSlide: 0,
            postTitle: this.props.navigation.state.params.postTitle,
            postCat: this.props.navigation.state.params.postCat,
            town: '',
            whogo: [],
            org: '',
            timer: 1594848753100,
            visitorsDetail: [],
            isModalVisible: false
        };

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                //notification.finish(PushNotificationIOS.FetchResult.NoData);

            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: Platform.OS === 'ios'
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('Title', ''),
            headerRight: (<TouchableOpacity style={{ paddingRight: 10 }} onPress={() => navigation.navigate('Main')}>
                <Icon name="arrowright" type="antdesign" size={30} color='white' />
            </TouchableOpacity>),

            headerTintColor: 'black',
            headerTitleStyle: {
                textAlign: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                fontStyle: 'italic',
                fontSize: 28,
                letterSpacing: -0.015,
                color: '#009788'
            }
        };
    };

    testPush = () => {
        // PushNotification.localNotification({
        //     title: "My Notification Title", // (optional)
        //     message: "My Notification Message", // (required)
        // });

        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + 5 * 1000), // in 60 secs
        });
    }

    componentDidMount() {
        axios.post(`http://185.12.95.84:3000/userdetails`, { visitorsId: this.state.visitors }).then(res => this.setState({ visitorsDetail: res.data }))

        AppState.addEventListener('change', this.handleAppStateChange)

        // if (new Date() >= new Date(this.state.timer)) {alert('COMPLETE')}
        console.log('locale:', locale)
        // this.props.navigation.setParams({Title: this.state.postTitle})
        console.log('honepics:', this.state.pic)
        AsyncStorage.getItem('userToken', (err, item) => {
            this.setState({ 'currentUserId': item })
            console.log("this cur id:", item)
        })
        let sysLang = ''
        locale === 'ru_RU' ? sysLang = 'ru_RU' : sysLang = 'en_US';
        axios.post(`http://185.12.95.84:3000/eventdescrip`, { postId: this.state.postId, sysLang: sysLang })
            .then(res => {
                this.setState({ town: res.data.town })
                this.setState({ org: res.data.org })
                this.setState({ whogo: res.data.whogo })
                console.log('rrrrrrrrrrrrrrrrr:', res.data)
                console.log('whogo:', res.data.whogo)
                console.log('whogostate:', this.state.whogo)
            });
    }

    componentWillUnmount() {
        AppState.addEventListener('change', this.handleAppStateChange)
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(this.state.timer + 1000 * 20)
            if (Platform.OS === 'ios') {
                date = date.toISOString()
            }
            PushNotification.localNotificationSchedule({
                message: "My Notification Message", // (required)
                date
            })
        }
    }

    renderItem = ({ item, index }) => {
        return (
            <Image style={styles.logoStyle} source={{ uri: item }} />
        );
    }

    toggleModal = (x) => {
        // console.log(x)
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {

        const iGo = () => {
            console.log("NICE")
            AsyncStorage.getItem('userToken', (err, item) => {
                axios.post(`http://185.12.95.84:3000/igo`,
                    { user_id: item, postId: this.state.postId }).then(res => {
                        if (res.data.done) {
                            this.setState({ whogo: [...this.state.whogo, item] })
                        } else {
                            console.log('error')
                        }
                    });
            })
        }

        const iDontGo = () => {
            console.log("dont")
            AsyncStorage.getItem('userToken', (err, item) => {
                axios.post(`http://185.12.95.84:3000/idontgo`,
                    { user_id: item, postId: this.state.postId }).then(res => {
                        if (res.data.done) {
                            this.setState({ whogo: this.state.whogo.map(w => w !== this.state.currentUserId) })
                        } else {
                            console.log('error')
                        }
                    });
            })
        }

        return (
            this.state.town === "" ? <ActivityIndicator size="large" color="#009788" style={{ paddingTop: 150 }} /> :
                <View style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10, paddingRight: 10 }}>
                    <View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <SafeAreaView style={{ height: 190 }}>
                                <Carousel
                                    inactiveSlideOpacity={0.6}
                                    inactiveSlideScale={0.95}
                                    layoutCardOffset={`18`}
                                    firstItem={0}
                                    itemWidth={width}
                                    sliderWidth={width}
                                    onSnapToItem={index => this.setState({ activeSlide: index })} //for pagination
                                    layout={'stack'}
                                    data={this.state.pic}
                                    renderItem={this.renderItem}
                                //contentContainerCustomStyle={{ alignItems: 'center' }}
                                />
                                <Pagination
                                    dotsLength={this.state.pic.length} //dotの数
                                    activeDotIndex={this.state.activeSlide} //どのdotをactiveにするか
                                    containerStyle={{ paddingVertical: 15 }} //デフォルトではちと広い
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <SafeAreaView style={styles.container}>
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}
                                onPress={() => this.toggleModal()}>
                                {this.state.visitors.length >= 3 && <EventVisitors visitors={this.state.visitorsDetail} />}
                                {this.state.visitors.length === 2 && <EventVisitorsTwo visitors={this.state.visitorsDetail} />}
                                {this.state.visitors.length === 1 && <EventVisitorsOne visitors={this.state.visitorsDetail} />}
                            </TouchableOpacity>
                        </SafeAreaView>
                        {this.state.whogo.some(v => this.state.currentUserId == v) ?
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}
                                onPress={() => iDontGo()}>
                                <View style={{ margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'grey', margin: 10 }}>{localizeEventDetScreen.youGoText}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}
                                onPress={() => iGo()}>
                                <View style={{ margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black', margin: 10 }}>{localizeEventDetScreen.iGoText}</Text>
                                </View>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }}
                            onPress={() => {
                                AsyncStorage.getItem('userToken', (err, item) => {
                                    axios.post(`http://185.12.95.84:3000/events_ls`, {
                                        postTitle: this.state.postTitle,
                                        event: true
                                    }).then(res => {
                                        console.log('res.data:', res.data)
                                        console.log('res.data[0] !== undefined:', res.data[0] !== undefined)
                                        res.data[0] !== undefined ? //true
                                            this.props.navigation.navigate('Dialog', {
                                                dialog_id: res.data[0].dialog_id,
                                                eventType: true,
                                                dialogTitle: this.state.postTitle
                                            }) :
                                            this.props.navigation.navigate('Dialog', { //false
                                                dialog_id: 'none',
                                                eventType: true,
                                                dialogTitle: this.state.postTitle
                                            })
                                    }
                                    )
                                })
                            }}>
                            <View style={{ margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black', margin: 10 }}>{localizeEventDetScreen.eventDialogText}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 20, color: 'black' }}>{this.state.postTitle}</Text>
                    <Text>{localizeEventDetScreen.orgText}: {this.state.org}</Text>
                    <Text>Category: {this.props.eventCat.filter(f => f.value == this.state.postCat[0])[0].label}</Text>
                    <Text>{localizeEventDetScreen.streetText}: {this.state.town}</Text>
                    {/*<Text>{localizeEventDetScreen.streetText}</Text>*/}
                    {/*<Text onPress={() => this.testPush()}>defsdf</Text>*/}
                    <Modal isVisible={this.state.isModalVisible}
                        // swipeDirection={['up', 'left', 'right', 'down']}
                        style={styles.modalView}
                        transparent={true}
                        backdropTransitionOutTiming={0}
                        onRequestClose={() => { this.toggleModal() }}
                    >
                        <TouchableOpacity
                            style={styles.container}
                            activeOpacity={1}
                            onPressOut={() => { this.toggleModal() }}
                        >
                        </TouchableOpacity>
                        <View style={styles.containerStyle}>
                            <View style={styles.content}>

                                <SafeAreaView style={styles.container}>
                                    <View style={styles.innerContainer}>
                                        {this.state.visitorsDetail.map(v =>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                                <Image source={{ uri: v.profile_pic != null ? v.profile_pic : 'https://eshendetesia.com/images/user-profile.png' }} style={{
                                                    height: 40,
                                                    borderWidth: 1,
                                                    borderColor: 'rgba(51,55,51,0.87)',
                                                    width: 40,
                                                    borderRadius: 30,
                                                    position: 'relative',
                                                    zIndex: 1,
                                                    marginRight: 8,
                                                    backgroundColor: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }} />
                                                <Text>{v.name}</Text>
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
                                                this.toggleModal()}>
                                            <Icon style={{ opacity: .8, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5 }}
                                                name="close" size={40} color={'#009788'} />
                                        </TouchableOpacity>
                                    </View>
                                </SafeAreaView>
                            </View>
                        </View>
                    </Modal>
                </View>
        )
    }
}

const styles = {
    logoStyle: {
        width: width,
        height: width / 2
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
};



const mapStateToProps = (state) => ({
    eventCat: state.appReducer.eventCat
})

export default connect(mapStateToProps, {})(EventDetailsScreen);


