import React from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import { reduxForm, Field } from 'redux-form';
import { Icon } from "react-native-elements";
import { localizeResetPasswordReduxScreen } from "../localization/localize";

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

const ResetForm = (props) => {
    const { hasError, _recoverAsync, handleSubmit } = props;

    return (
        <>
            <Field name="loginOrEmail" onChange={() => { props.setHasError(false) }} component={renderInput} placeholder={localizeResetPasswordReduxScreen.loginEmailText} />
            <Field name="loginOrEmailCopy" onChange={() => { props.setHasError(false) }} component={renderInput} placeholder={localizeResetPasswordReduxScreen.loginEmailTextCopy} security={true} inputType={'password'} />
            {(hasError === 'ERROR') && <Text style={{ color: 'red' }}>Incorrect login or password</Text>}
            <View style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20 }}>
                <TouchableOpacity onPress={handleSubmit(_recoverAsync)}>
                    {/*<Image style={{width: 40, height: 34}} source={require('./../assets/rightArrow.png')}/>*/}
                    <Icon type='antdesign' name="login" size={35} color={'#009788'} />
                </TouchableOpacity>
            </View>
        </>
    )
};

const ResetPasswordReduxForm = reduxForm({
    form: 'reset'
})(ResetForm);

export default ResetPasswordReduxForm;
