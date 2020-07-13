import React from "react";
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native'
import { reduxForm, Field } from 'redux-form';
import {Icon} from "react-native-elements";

const renderInput = ({ placeholder, security, input: { onChange, inputType, ...restInput }}) => {
    return <TextInput placeholder={placeholder}
                      type={inputType}
                      secureTextEntry={security}
                      style={{
                          textAlign: 'center',
                          margin: 7,
                          width: '80%',
                          height: 40,
                          borderRadius: 6,
                          borderColor: '#009788',
                          borderWidth: 1
                      }} onChangeText={onChange} {...restInput} />
};

const EditForm = (props) => {
    const {hasError, xxxx, handleSubmit} = props;

    return (
        <>
            <Field name="name" component={renderInput} placeholder={'Enter name ...'}/>
            <Field name="bio" component={renderInput} placeholder={'Enter bio ...'}/>
            <Field name="birth" component={renderInput} placeholder={'Enter birthday ...'}/>
            <TouchableOpacity onPress={handleSubmit(xxxx)}
                              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
                <Text style={{color: '#009788', fontWeight: 'bold', fontSize: 20}}>Save</Text>
                <Icon name="explore" size={40} color={'#009788'}/>
            </TouchableOpacity>
        </>
    )
};

const EditReduxForm = reduxForm({
    form: 'edit',
    enableReinitialize: true
})(EditForm);

export default EditReduxForm;
