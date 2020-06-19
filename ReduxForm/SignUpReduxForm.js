import React from "react";
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native'
import { reduxForm, Field } from 'redux-form';
import {Icon} from "react-native-elements";

const renderInput = ({ placeholder, input: { onChange, inputType, ...restInput }}) => {
    return <TextInput placeholder={placeholder}
                      type={inputType}
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
    const {hasError, _signInAsync, handleSubmit} = props;

    return (
        <>
            <Field name="email" component={renderInput} placeholder={'Email'}/>
            <Field name="password" component={renderInput} placeholder={'Password'} inputType={'password'}/>
            <Field name="password" component={renderInput} placeholder={'Retype password'} inputType={'password'}/>
            {(hasError === 'ERROR') && <Text style={{color: 'red'}}>Incorrect login or password</Text>}
            <View style={{display: 'flex', justifyContent: 'flex-end', paddingTop: 20}}>
                <TouchableOpacity onPress={handleSubmit(_signInAsync)}>
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
