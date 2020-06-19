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

const LoginForm = (props) => {
    const {hasError, _signUpAsync, handleSubmit} = props;

    return (
        <>
            <Field name="email" onChange={() => {props.setHasError(false)}}component={renderInput} placeholder={'Email'}/>
            <Field name="password" onChange={() => {props.setHasError(false)}} component={renderInput} placeholder={'Password'} security={true} inputType={'password'}/>
            <Field name="passwordVerif" onChange={() => {props.setHasError(false)}} component={renderInput} placeholder={'Retype password'} security={true} inputType={'password'}/>
            {(hasError === 'ERROR') && <Text style={{color: 'red'}}>Password mismatch</Text>}
            <View style={{display: 'flex', justifyContent: 'flex-end', paddingTop: 20}}>
                <TouchableOpacity onPress={handleSubmit(_signUpAsync)}>
                    {/*<Image style={{width: 40, height: 34}} source={require('./../assets/rightArrow.png')}/>*/}
                    <Icon type='antdesign' name="login" size={35} color={'#009788'}/>
                </TouchableOpacity>
            </View>
        </>
    )
};

const SignUpReduxForm = reduxForm({
    form: 'signUp'
})(LoginForm);

export default SignUpReduxForm;