import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, Input, CheckBox, Linking } from 'react-native'
import { reduxForm, Field } from 'redux-form';
import { Icon } from "react-native-elements";
import { localizeSignUpScreen } from "../localization/localize";

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

const LoginForm = (props) => {
    const { hasError, loginExists, emailExists, _signUpAsync, handleSubmit } = props;
    const [isSelected, setSelection] = useState(false);

    const openRights = () => {
        Linking.canOpenURL('https://www.google.com/').then(supported => {
            if (supported) {
                Linking.openURL('https://www.google.com/');
            } else {
                console.log("Don't know how to open URI: " + 'https://www.google.com/');
            }
        });
    }

    return (
        <>
            <Field name="email" onChange={() => { props.setHasError(false); props.setEmailExists(false); props.setLoginExists(false) }} component={renderInput} placeholder={localizeSignUpScreen.emailText} />
            <Field name="login" onChange={() => { props.setHasError(false); props.setEmailExists(false); props.setLoginExists(false) }} component={renderInput} placeholder={localizeSignUpScreen.loginText} />
            <Field name="password" onChange={() => { props.setHasError(false); props.setEmailExists(false); props.setLoginExists(false) }} component={renderInput} placeholder={localizeSignUpScreen.passText} security={true} inputType={'password'} />
            <Field name="passwordVerif" onChange={() => { props.setHasError(false); props.setEmailExists(false); props.setLoginExists(false) }} component={renderInput} placeholder={localizeSignUpScreen.passReText} security={true} inputType={'password'} />
            {(hasError === 'ERROR') && <Text style={{ color: 'red' }}>Password mismatch</Text>}
            {(emailExists) && <Text style={{ color: 'red' }}>Email already exists</Text>}
            {(loginExists) && <Text style={{ color: 'red' }}>Login already in use</Text>}
            <View>
                <TouchableOpacity onPress={openRights}>
                    <Text style={{
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000"
                    }}>Правила пользования</Text>
                </TouchableOpacity>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                    />
                    <Text>Я прочитал(а)</Text>
                </View>

            </View>
            <TouchableOpacity onPress={handleSubmit(_signUpAsync)} disabled={!isSelected} style={{ opacity: isSelected ? 1 : 0.1 }}>
                <View style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 5 }}>
                    <Icon type='antdesign' name="login" size={35} color={'#009788'} />

                </View>
            </TouchableOpacity>
        </>
    )
};

const SignUpReduxForm = reduxForm({
    form: 'signUp'
})(LoginForm);

export default SignUpReduxForm;
