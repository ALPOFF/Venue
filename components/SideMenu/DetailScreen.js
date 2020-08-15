import React, {Component, useState} from 'react';
import {
    View,
    StyleSheet, AsyncStorage, TouchableOpacity, Text, Image, TextInput
} from 'react-native';
import EventReduxForm from "../../ReduxForm/EventReduxForm";
import * as axios from "axios";
import {Icon, Input} from "react-native-elements";
import {Field} from "redux-form";
import imgEvent from './../../assets/Venue_new/new_pic.png'
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from "react-redux";
import {setMarker, setNewEventCat, setNewEventDescr, setNewEventName, setNewEventPic} from "../../state/appReducer";
import {localizeDetailScreen} from "../../localization/localize";
import RNPickerSelect from 'react-native-picker-select';
import {geocodeLocationByCoords, geocodeLocationByCoordsYandex} from "../../common/locationservice";

const renderInput = ({placeholder, input: {onChange, inputType, ...restInput}}) => {
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
            AsyncStorage.getItem('userToken', (err, item) => {
                axios.post(`http://185.12.95.84:3000/sendimage`, {
                    img: this.props.newEventPic,
                    postText: this.props.newEventDescr,
                    eventName: this.props.newEventName,
                    userId: item,
                    postCategory: this.props.newEventCat,
                    coords: this.props.marker
                }).then(
                    this.props.navigation.navigate('Main')
                )
                this.props.setNewEventName('')
                this.props.setNewEventDescr('')
                this.props.setNewEventCat(null)
                this.props.setMarker({})
                this.props.setNewEventPic([])
            })
        }

        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: 40, display: "flex", justifyContent: "flex-end", flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MapForPickPlace')}>
                        <Text style={{
                            color: '#14171A',
                            fontSize: 17,
                            fontFamily: 'Oxygen-Regular'
                        }}>Далее</Text>
                    </TouchableOpacity>
                </View>
                {this.props.newEventPic[0] === undefined ?
                    <TouchableOpacity onPress={_getPhotoLibrary}>
                        <Image source={imgEvent} style={{width: '100%', height: 160}}
                               alt=""/>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={_getPhotoLibrary}>
                        <Image source={{uri: this.props.newEventPic[0].path}} style={{width: '100%', height: 160}}
                               alt=""/>
                    </TouchableOpacity>}
                <View>
                    <View style={{paddingBottom: 10}}>
                        <Text>Название:</Text>
                        <TextInput style={{borderBottomWidth: 2, borderBottomColor: 'lightgrey', paddingBottom: 5}}
                                   onChangeText={(value) => {
                                       // this.setState({eventName: value})
                                       this.props.setNewEventName(value)
                                   }} value={this.props.newEventName} placeholder={localizeDetailScreen.eventNameText}/>
                    </View>
                    <View style={{paddingBottom: 10}}>
                        <Text>Описание:</Text>
                        <TextInput style={{borderBottomWidth: 2, borderBottomColor: 'lightgrey', paddingBottom: 5}}
                                   onChangeText={(value) => {
                                       // this.setState({description: value})
                                       this.props.setNewEventDescr(value)
                                   }} value={this.props.newEventDescr}
                                   placeholder={localizeDetailScreen.eventDescrText}/>
                    </View>
                    <View>
                        <Text>Категория:</Text>
                        {/*<TextInput style={{borderBottomWidth: 2, borderBottomColor: 'lightgrey', paddingBottom: 5}} onChangeText={(value) => {*/}
                        {/*    //this.setState({category: value})*/}
                        {/*    this.props.setNewEventCat(value)*/}
                        {/*}} value={this.props.newEventCat} placeholder={localizeDetailScreen.eventCategText}/>*/}
                        <RNPickerSelect placeholder={{label: localizeDetailScreen.eventCategText}}
                                        style={{ borderBottomWidth: 1, borderBottomColor: 'black'}}
                                        onValueChange={(value) => this.props.setNewEventCat(value)}
                                        items={[
                                            {label: 'Квартирник', value: '0'},
                                            {label: 'Концерт', value: '1'},
                                            {label: 'Игры', value: '2'},
                                            {label: 'Бизнес', value: '3'},
                                            {label: 'Здоровье', value: '4'},
                                            {label: 'Образование', value: '5'},
                                            {label: 'Спорт', value: '6'}
                                        ]}
                        />
                    </View>
                    {this.props.town != "" && <View>
                        <Text>Место:</Text>
                        {this.props.town != "" &&
                        <Text>{this.props.town}</Text>}
                    </View>}
                </View>
                <View style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {/*<TouchableOpacity onPress={() =>*/}
                    {/*    this.props.navigation.navigate('MapForPickPlace')}*/}
                    {/*                  style={{*/}
                    {/*                      display: 'flex',*/}
                    {/*                      flexDirection: 'row',*/}
                    {/*                      alignItems: 'center'*/}
                    {/*                  }}>*/}
                    {/*    <Text style={{*/}
                    {/*        color: 'rgba(0,0,0,0.72)',*/}
                    {/*        fontWeight: 'bold',*/}
                    {/*        fontSize: 16*/}
                    {/*    }}>{localizeDetailScreen.PickPlaceText}</Text>*/}
                    {/*    <Icon name="explore" size={40} color={'rgba(0,0,0,0.72)'}/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity onPress={() => {*/}
                    {/*    sendimg();*/}
                    {/*}}*/}
                    {/*                  style={{*/}
                    {/*                      display: 'flex',*/}
                    {/*                      flexDirection: 'row',*/}
                    {/*                      alignItems: 'center',*/}
                    {/*                      marginTop: 10*/}
                    {/*                  }}>*/}
                    {/*    <Text style={{color: 'rgba(0,0,0,0.72)', fontWeight: 'bold', fontSize: 20}}>Complete</Text>*/}
                    {/*    <Icon name="done" size={40} color={'rgba(0,0,0,0.72)'}/>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                {this.props.marker.latitude != undefined && <TouchableOpacity activeOpacity={0.8}
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
                        style={{opacity: 1, width: 50, height: 50, marginBottom: 25, marginTop: 5}}
                        source={require('./../../assets/Venue_new/doneIcon3.png')}/>
                </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
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
    town: state.appReducer.town
});

export default connect(mapStateToProps, {
    setNewEventPic,
    setMarker,
    setNewEventName,
    setNewEventDescr,
    setNewEventCat
})(DetailScreen);
