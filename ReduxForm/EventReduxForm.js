import React, {useState} from "react";
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native'
import {reduxForm, Field} from 'redux-form';
import imgEvent from "../assets/imgEvent.png";
import {Icon} from "react-native-elements";
import * as axios from "axios";

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


const EventForm = (props) => {
    const [imageData, setImageData] = useState({image: null});
    const [res, setRes] = useState({res: null});
    const {_addEvent, handleSubmit} = props;

    let _getPhotoLibrary = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     base64: true
        // });
        // if (!result.cancelled) {
        //     setImageData({image: result.uri});
        //     setRes({res: result.base64})
        //     console.log(result.uri)
        //     console.log(typeof result.uri)
        //     console.log(result)
        // }
    }

    let sendimg = async () => {
        console.log(imageData)
        axios.post(`http://185.12.95.84:5000/sendimage`, {img: res})
    }

    return (
        <>
            <Field name="eventName" component={renderInput} placeholder={'EVENT NAME'}/>
            {imageData.image ? <Image
                style={{width: '80%', height: '30%', marginTop: 10, marginBottom: 15}}
                source={{uri: imageData.image}}
            /> : <View/>
            }
            <Field name="eventText" component={renderInput} placeholder={'Type here the description of your event...'}/>
            <Field name="eventText" component={renderInput} placeholder={'Choose category...'}/>
            <TouchableOpacity onPress={_getPhotoLibrary}
                              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
                <Text style={{color: '#3C2274', fontWeight: 'bold', fontSize: 20}}>Add event</Text>
                <Icon name="satellite" size={40} color={'#3C2274'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendimg}
                              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
                <Text style={{color: '#3C2274', fontWeight: 'bold', fontSize: 20}}>Send</Text>
                <Icon name="satellite" size={40} color={'#3C2274'}/>
            </TouchableOpacity>
        </>
    )
};

const EventReduxForm = reduxForm({
    form: 'addEvent'
})(EventForm);

export default EventReduxForm;
