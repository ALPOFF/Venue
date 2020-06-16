import React, {Component, useState} from 'react';
import {
    View,
    StyleSheet, AsyncStorage, TouchableOpacity, Text, Image, TextInput
} from 'react-native';
import EventReduxForm from "../../ReduxForm/EventReduxForm";
import * as axios from "axios";
import {Icon, Input} from "react-native-elements";
import {Field} from "redux-form";
import imgEvent from './../../assets/imgEvent.png'
import ImagePicker from 'react-native-image-crop-picker';

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
            pickedImg: {}
        };
    }


    render() {
         const _addEvent = (value) => {
            console.log('submitting form', value.eventName);
             AsyncStorage.getItem('userName', (err, item) => {
                 axios.post(`https://warm-ravine-29007.herokuapp.com/event/`, {
                     eventName: value.eventName,
                     eventText: value.eventText,
                     place: value.place,
                     userId: item
                 })
                     .then(res => {
                         if (res.data) {
                             this.props.navigation.navigate('Main')
                         }
                         else {
                             alert('error')
                         }
                     });
             });
        };

        let _getPhotoLibrary = async () => {
            ImagePicker.openPicker({
                width: 1080,
                height: 720,
                cropping: true
            }).then(image => {
                console.log(image);
                this.setState({pickedImg: image})
            });
        }

        let sendimg = async () => {
            console.log(this.state.image)
            axios.post(`http://185.12.95.84:5000/sendimage`, {img: res})
        }

        return (
            <View style={styles.container}>
                {this.state.pickedImg.path === undefined ? <Image source={imgEvent} style={{width: '100%', height: 200}} alt=""/>
                    : <Image source={{uri: this.state.pickedImg.path}} style={{width: '100%', height: 200}} alt=""/>}
                <View>
                <TextInput onChange={(value) => {this.setState({eventName: value})}} name="eventName" component={renderInput} placeholder={'Event Name...'}/>
                {this.state.image.image ? <Image
                    style={{width: '80%', height: '30%', marginTop: 10, marginBottom: 15}}
                    source={{uri: this.state.image.image}}
                /> : <View/>
                }
                <TextInput onChange={(value) => {this.setState({description: value})}} name="eventText" component={renderInput} placeholder={'Type here the description of your event...'}/>
                <TextInput onChange={(value) => {this.setState({category: value})}} name="eventText" component={renderInput} placeholder={'Choose category...'}/>
                </View>
                <TouchableOpacity onPress={_getPhotoLibrary}
                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Text style={{color: '#3C2274', fontWeight: 'bold', fontSize: 20}}>Pick Pic</Text>
                    <Icon name="camera" size={40} color={'#3C2274'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    this.props.navigation.navigate('MapForPickPlace')}
                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Text style={{color: '#3C2274', fontWeight: 'bold', fontSize: 20}}>Pick Place</Text>
                    <Icon name="explore" size={40} color={'#3C2274'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={_getPhotoLibrary}
                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Text style={{color: '#3C2274', fontWeight: 'bold', fontSize: 20}}>Add event</Text>
                    <Icon name="event" size={40} color={'#3C2274'}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: '5%'
    }
});

export default DetailScreen;
