import React from "react";
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native'
import { reduxForm, Field } from 'redux-form';

const renderInput = ({ placeholder, input: { onChange, inputType, ...restInput }}) => {
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

const LoginForm = (props) => {
    const {hasError, _signInAsync, handleSubmit} = props;

    return (
        <>
            <Field name="email" component={renderInput} placeholder={'Email'}/>
            <Field name="password" component={renderInput} placeholder={'Password'} inputType={'password'}/>
            {(hasError === 'ERROR') && <Text style={{color: 'red'}}>Incorrect login or password</Text>}
            <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={handleSubmit(_signInAsync)}>
                    <Image style={{width: 40, height: 34}} source={require('./../assets/rightArrow.png')}/>
                </TouchableOpacity>
            </View>
        </>
    )
};

const SignInReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

export default SignInReduxForm;
