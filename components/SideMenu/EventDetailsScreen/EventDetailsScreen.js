import React, {Component, useEffect, useState} from "react";
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
    SafeAreaView, ActivityIndicator
} from "react-native";
import {Icon} from "react-native-elements";
import userPic from '../../../assets/Screenshot_6.png'
import ImageBackground from "react-native-web/dist/exports/ImageBackground";
import * as axios from "axios";
import EventVisitors from "./EventVisitors/EventVisitors";
import EventVisitorsTwo from "./EventVisitors/EventVisitorsTwo";
import EventVisitorsOne from "./EventVisitors/EventVisitorsOne";
import {connect} from "react-redux";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AnimatedWithChildren from "react-native-web/dist/vendor/react-native/Animated/nodes/AnimatedWithChildren";
import { NativeModules } from 'react-native'

// iOS:
// const locale = NativeModules.SettingsManager.settings.AppleLocale ||
//     NativeModules.SettingsManager.settings.AppleLanguages[0] // "fr_FR"

// Android:
const locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"

const {height, width} = Dimensions.get('window');

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
            town: '',
            whogo: [],
            org: ''
        };
    }


    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('Title', ''),
            headerRight: (<TouchableOpacity style={{paddingRight: 10}} onPress={() => navigation.navigate('Main')}>
                <Icon name="arrowright" type="antdesign" size={30} color='white'/>
            </TouchableOpacity>),
            headerLeft: null,
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

    componentDidMount() {

        console.log('locale:', locale)
        // this.props.navigation.setParams({Title: this.state.postTitle})
        console.log('honepics:', this.state.pic)
        AsyncStorage.getItem('userToken', (err, item) => {
            this.setState({'currentUserId': item})
            console.log("this cur id:", item)
        })
        let sysLang = ''
        locale === 'ru_RU' ? sysLang = 'ru_RU' : sysLang = 'en_US';
        axios.post(`http://185.12.95.84:3000/eventdescrip`, {postId: this.state.postId, sysLang: sysLang})
            .then(res => {
                this.setState({town: res.data.town})
                this.setState({org: res.data.org})
                this.setState({whogo: res.data.whogo})
                console.log('rrrrrrrrrrrrrrrrr:',res.data)
                console.log('whogo:', res.data.whogo)
                console.log('whogostate:', this.state.whogo)
            });
    }

    renderItem = ({item, index}) => {
        return (
            <Image style={styles.logoStyle} source={{uri: item}}/>
        );
    }

    render() {

        const iGo = () => {
            console.log("NICE")
            AsyncStorage.getItem('userToken', (err, item) => {
                axios.post(`http://185.12.95.84:3000/igo`,
                    {user_id: item, postId: this.state.postId}).then(res => {
                        if (res.data.done) {
                            this.setState({whogo: [...this.state.whogo, item]})
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
                    {user_id: item, postId: this.state.postId}).then(res => {
                        if (res.data.done) {
                            this.setState({whogo: this.state.whogo.map(w => w !== this.state.currentUserId)})
                        } else {
                            console.log('error')
                        }
                });
            })
        }

        return (
            this.state.town === "" ? <ActivityIndicator size="large" color="#009788" /> :
            <View style={{display: 'flex', flexDirection: 'column', paddingLeft: 10, paddingRight: 10}}>
                <View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <SafeAreaView style={{height: 190}}>
                            <Carousel
                                inactiveSlideOpacity={0.6}
                                inactiveSlideScale={0.95}
                                layoutCardOffset={`18`}
                                firstItem={0}
                                itemWidth={width}
                                sliderWidth={width}
                                onSnapToItem={index => this.setState({activeSlide: index})} //for pagination
                                layout={'stack'}
                                data={this.state.pic}
                                renderItem={this.renderItem}
                                //contentContainerCustomStyle={{ alignItems: 'center' }}
                            />
                            <Pagination
                                dotsLength={this.state.pic.length} //dotの数
                                activeDotIndex={this.state.activeSlide} //どのdotをactiveにするか
                                containerStyle={{paddingVertical: 15}} //デフォルトではちと広い
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
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                          onPress={() => this.props.navigation.navigate('EventVisitorsDetailed', {
                                              visitors: this.state.visitors
                                          })}>
                            {this.state.visitors.length >= 3 && <EventVisitors visitors={this.state.visitors}/>}
                            {this.state.visitors.length === 2 && <EventVisitorsTwo visitors={this.state.visitors}/>}
                            {this.state.visitors.length === 1 && <EventVisitorsOne visitors={this.state.visitors}/>}
                        </TouchableOpacity>
                    </SafeAreaView>
                    {this.state.whogo.some(v => this.state.currentUserId == v) ?
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                          onPress={() => iDontGo()}>
                        <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'grey', margin: 10}}>Вы идете</Text>
                        </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                          onPress={() => iGo()}>
                            <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black', margin: 10}}>Я
                                    пойду!</Text>
                            </View>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                      onPress={() => this.props.navigation.navigate('Dialog', {
                                          msg: 'Some Msg'
                                      })}>
                        <View style={{margin: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black', margin: 10}}>Перейти в
                                беседу</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 20, color: 'black'}}>{this.state.postTitle}</Text>
                <Text>Организатор: {this.state.org}</Text>
                <Text>Street: {this.state.town}</Text>
                <Text>{this.state.postText}</Text>
            </View>
        )
    }
}

const styles = {
    logoStyle: {
        width: width,
        height: width / 2
    }
};


export default connect(null, {})(EventDetailsScreen);
