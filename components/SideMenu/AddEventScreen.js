import React, { Component, useState } from 'react';
import {
    View,
    StyleSheet, AsyncStorage, TouchableOpacity, Text, Image, TextInput, Alert, ScrollView
} from 'react-native';
import EventReduxForm from "../../ReduxForm/EventReduxForm";
import * as axios from "axios";
import { Icon, Input } from "react-native-elements";
import { Field } from "redux-form";
import imgEvent from './../../assets/Venue_new/new_pic.png'
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from "react-redux";
import { setMarker, setNewEventCat, setNewEventDescr, setNewEventName, setNewEventPic, setNewEventDate } from "../../state/appReducer";
import { localizeDetailScreen } from "../../localization/localize";
import RNPickerSelect from 'react-native-picker-select';
import { geocodeLocationByCoords, geocodeLocationByCoordsYandex } from "../../common/locationservice";
import { BackHandler } from 'react-native';
import DatePicker from 'react-native-date-picker'
import DateTimePicker from '../../common/DateTimePicker';
import { formatDateAndTime } from '../../common/formatDateAndTime';

const renderInput = ({ placeholder, input: { onChange, inputType, ...restInput } }) => {
    return <TextInput placeholder={placeholder}
        type={inputType}
        style={{
            textAlign: 'center',
            margin: 7,
            width: '80%',
            height: 40,
            borderRadius: 3,
            borderColor: '#543E85',
            borderWidth: 1
        }} onChangeText={onChange} {...restInput} />
};

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            image: {},
            res: null,
            eventName: '',
            category: '',
            description: '',
            pickedImg: [],
            town: ""
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        console.log(this)
        Alert.alert(
            "Внимание!",
            "Ваш эвент не будет сохранен",
            [
                {
                    text: "Отмена",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Ок", onPress: () => {
                        this.props.navigation.goBack(null);
                        this.props.setNewEventName('')
                        this.props.setNewEventDescr('')
                        this.props.setNewEventCat(null)
                        this.props.setMarker({})
                        this.props.setNewEventPic([])
                        this.setNewEventDate('')
                    }
                }
            ]
        );

        return true;
    }


    render() {
        const _addEvent = (value) => {
            console.log('marker:', this.props.marker)
            console.log('eventName:', this.state.eventName)
            console.log('category:', this.state.category)
            console.log('description:', this.state.description)
            // console.log('pickedImg:', this.state.pickedImg)
            console.log('this.props.marker:', this.props.marker)
            AsyncStorage.getItem('userName', (err, item) => {
                axios.post(`http://185.12.95.84:3000/event/`, {
                    eventName: value.eventName,
                    eventText: value.eventText,
                    place: value.place,
                    userId: item,
                    coords: this.props.marker
                })
                    .then(res => {
                        if (res.data) {
                            this.props.navigation.navigate('Main')
                        } else {
                            alert('error')
                        }
                    });
            });
        };

        let _getPhotoLibrary = async () => {
            ImagePicker.openPicker({
                width: 1080,
                height: 720,
                cropping: true,
                includeBase64: true,
                multiple: true,
            }).then(image => {
                console.log(image);
                //this.setState({pickedImg: image})
                this.props.setNewEventPic(image)
            });
        }

        let sendimg = async () => {
            console.log('marker:', this.props.marker)
            console.log('rtype:', this.props.newEventPic[0].path) //pic
            console.log('CATEGORY!', this.props.newEventCat)
            AsyncStorage.getItem('userToken', (err, item) => {
                axios.post(`http://185.12.95.84:3000/sendimage`, {
                    img: this.props.newEventPic,
                    postText: this.props.newEventDescr,
                    eventName: this.props.newEventName,
                    userId: item,
                    postCategory: this.props.newEventCat,
                    coords: this.props.marker,
                    eventDate: this.props.newEventDate
                }).then(
                    this.props.navigation.navigate('Main')
                )
                this.props.setNewEventName('')
                this.props.setNewEventDescr('')
                this.props.setNewEventCat(null)
                this.props.setMarker({})
                this.props.setNewEventPic([])
                this.props.setNewEventDate('')
            })
        }

        return (
            <ScrollView showsVerticalScrollIndicator={true} decelerationRate={"normal"}>
                <View style={styles.container}>
                    {this.props.town == "" ? <View style={{ width: '100%', height: 40, display: "flex", justifyContent: "flex-end", flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MapForPickPlace')}>
                            <Text style={{
                                color: '#14171A',
                                fontSize: 17,
                                fontFamily: 'Oxygen-Regular'
                            }}>Далее</Text>
                        </TouchableOpacity>
                    </View> : <View style={{ width: '100%', height: 40, display: "flex", justifyContent: "flex-end", flexDirection: "row" }}></View>}
                    {this.props.newEventPic[0] === undefined ?
                        <TouchableOpacity onPress={_getPhotoLibrary}>
                            <Image source={imgEvent} style={{ width: '100%', height: 160 }}
                                alt="" />
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={_getPhotoLibrary}>
                            <Image source={{ uri: this.props.newEventPic[0].path }} style={{ width: '100%', height: 160 }}
                                alt="" />
                        </TouchableOpacity>}
                    <View>
                        <View style={{ paddingBottom: 10 }}>
                            <Text>Название:</Text>
                            <TextInput style={{ borderBottomWidth: 2, borderBottomColor: 'lightgrey', paddingBottom: 5 }}
                                onChangeText={(value) => {
                                    // this.setState({eventName: value})
                                    this.props.setNewEventName(value)
                                }} value={this.props.newEventName} placeholder={localizeDetailScreen.eventNameText} />
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <Text>Описание:</Text>
                            <TextInput style={{ borderBottomWidth: 2, borderBottomColor: 'lightgrey', paddingBottom: 5 }}
                                onChangeText={(value) => {
                                    // this.setState({description: value})
                                    this.props.setNewEventDescr(value)
                                }} value={this.props.newEventDescr}
                                placeholder={localizeDetailScreen.eventDescrText} />
                        </View>
                        <View>
                            <Text>Категория:</Text>
                            <RNPickerSelect placeholder={{ label: localizeDetailScreen.eventCategText }}
                                style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
                                onValueChange={(value) => this.props.setNewEventCat(value)}
                                items={[
                                    { label: 'Квартирник', value: '0' },
                                    { label: 'Концерт', value: '1' },
                                    { label: 'Игры', value: '2' },
                                    { label: 'Бизнес', value: '3' },
                                    { label: 'Здоровье', value: '4' },
                                    { label: 'Образование', value: '5' },
                                    { label: 'Спорт', value: '6' },
                                    { label: 'Другое', value: '7' }
                                ]}
                            />
                        </View>
                        <View>
                            <Text>Время и дата события:</Text>
                            {/* <Text>{formatDateAndTime(this.props.newEventDate)}</Text> */}
                            <DateTimePicker />
                        </View>
                        {this.props.town != "" && <TouchableOpacity onPress={() => this.props.navigation.navigate('MapForPickPlace')}><View>
                            <Text>Место:</Text>
                            {this.props.town != "" &&
                                <Text>{this.props.town}</Text>}
                        </View></TouchableOpacity>}
                    </View>
                    {this.props.marker.latitude != undefined && this.props.town != '' && <TouchableOpacity activeOpacity={0.8}
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'transparent',
                            zIndex: 999
                        }}
                        onPress={() => {
                            sendimg();
                        }}>
                        <Image
                            style={{ opacity: 1, width: 50, height: 50, marginBottom: 25, marginTop: 5 }}
                            source={require('./../../assets/Venue_new/doneIcon3.png')} />
                    </TouchableOpacity>}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: '5%',
        marginTop: 10,
        height: '100%'
    }
});

const mapStateToProps = (state) => ({
    marker: state.appReducer.marker,
    newEventName: state.appReducer.newEventName,
    newEventDescr: state.appReducer.newEventDescr,
    newEventCat: state.appReducer.newEventCat,
    newEventPic: state.appReducer.newEventPic,
    town: state.appReducer.town,
    newEventDate: state.appReducer.newEventDate
});

export default connect(mapStateToProps, {
    setNewEventPic,
    setMarker,
    setNewEventName,
    setNewEventDescr,
    setNewEventCat,
    setNewEventDate
})(DetailScreen);
