import React from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import { reduxForm, Field } from 'redux-form';
import { Icon } from "react-native-elements";
import { localizeEditProfileForm } from "../localization/localize";

const renderInput = ({ placeholder, security, input: { onChange, inputType, ...restInput } }) => {
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
    const { hasError, changeProfile, handleSubmit } = props;

    return (
        <View style={{ alignItems: "center", height: '70%' }}>
            <Text>{localizeEditProfileForm.nameText}:</Text>
            <Field name="name" component={renderInput} placeholder={'Enter username ...'} />
            <Text>{localizeEditProfileForm.bioText}:</Text>
            <Field name="bio" component={renderInput} placeholder={'Enter bio ...'} />
            <Text>{localizeEditProfileForm.birthdayText}:</Text>
            <Field name="birth" component={renderInput} placeholder={'Enter birthday ...'} />
            <TouchableOpacity activeOpacity={0.8}
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                    backgroundColor: 'transparent',
                    zIndex: 999
                }}
                onPress={handleSubmit(changeProfile)}>
                <Image
                    style={{ opacity: 1, width: 50, height: 50, marginRight: 10, marginBottom: 50, marginTop: 5 }}
                    source={require('./../assets/Venue_new/doneIcon3.png')} />
            </TouchableOpacity>
        </View>
    )
};

const EditReduxForm = reduxForm({
    form: 'edit',
    enableReinitialize: true
})(EditForm);

export default EditReduxForm;
