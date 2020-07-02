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
import {connect} from "react-redux";

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
            pickedImg: []
        };
    }





    render() {
         const _addEvent = (value) => {
             console.log('marker:', this.props.marker)
             console.log('eventName:', this.state.eventName)
             console.log('category:', this.state.category)
             console.log('description:', this.state.description)
             console.log('pickedImg:', this.state.pickedImg)
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
                cropping: true,
                includeBase64: true,
                multiple: true,
            }).then(image => {
                console.log(image);
                this.setState({pickedImg: image})
            });
        }

        let sendimg = async () => {
            console.log('marker:', this.props.marker)
            console.log('rtype:', this.state.pickedImg[0].path) //pic
            AsyncStorage.getItem('userToken', (err, item) => {
                axios.post(`http://185.12.95.84:3000/sendimage`, {img: this.state.pickedImg, postText: this.state.description, eventName: this.state.eventName, userId: item, postCategory: this.state.category, coords: this.props.marker})
            })
        }

        return (
            <View style={styles.container}>
                {this.state.pickedImg[0] === undefined  ? <Image source={imgEvent} style={{width: '100%', height: 200}} alt=""/>
                    : <Image source={{uri: this.state.pickedImg[0].path}} style={{width: '100%', height: 200}} alt=""/>}
                <View>
                <TextInput onChangeText={(value) => {this.setState({eventName: value})}} value={this.state.eventName} placeholder={'Event Name...'}/>
                <TextInput onChangeText={(value) => {this.setState({description: value})}} value={this.state.description} placeholder={'Type here the description of your event...'}/>
                <TextInput onChangeText={(value) => {this.setState({category: value})}} value={this.state.category} placeholder={'Choose category...'}/>
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
                <TouchableOpacity onPress={sendimg}
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

const mapStateToProps = (state) => ({
    marker: state.appReducer.marker
});

export default connect(mapStateToProps, {})(DetailScreen);
