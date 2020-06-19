import React, {useEffect, useState} from "react";
import {
    AsyncStorage,
    Image,
    Linking,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator, KeyboardAvoidingView, Keyboard, BackHandler
} from "react-native";
import appIcon from "../../assets/Venue_new/logo_hands.png";
import avaSign from "../../assets/Venue_new/avatarSign.png";
import SignInReduxForm from "../../ReduxForm/LogInReduxForm";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserId} from "../../state/appReducer";

const SignInScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [keyboardT, setKeyboardT] = useState(false);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _signInAsync = (value) => {
        console.log('submitting form', value.email);
            axios.post(`https://warm-ravine-29007.herokuapp.com/auth/`, {Username: value.email, Password: value.password})
            .then(async res => {
                console.log("ALL: "+res.data);
                if (res.data === 'ERROR') {
                    setHasError(res.data);
                }
                else {
                    await AsyncStorage.setItem('userToken', res.data[0].user_id.toString());
                    await AsyncStorage.setItem('userName', value.email);
                    props.navigation.navigate('App')
                }
            });
    };

    const _keyboardDidShow = () => {
        setKeyboardT(true)
    };

    const _keyboardDidHide = () => {
        setKeyboardT(false)
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#009788" />}
            <Text style={styles.custom}>Venue</Text>
            {!keyboardT && <Image
                style={{width: 130, height: 130, margin: 20}}
                source={avaSign}
            />}
            <SignInReduxForm setHasError={setHasError} hasError={hasError} _signInAsync={_signInAsync}/>

            {!keyboardT && <View style={{marginTop: 50, display: 'flex', alignItems: 'center'}}>
                <View style={styles.resetSignUpView}>
                    <Text style={{color: '#A7A7A7', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Forgot your password? </Text>
                    <Text style={{color: '#009788', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} onPress={() => props.navigation.navigate('')}>Reset</Text>
                    <Text style={{color: 'orange', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>-In dev</Text>
                </View>
                <View style={styles.resetSignUpView}>
                    <Text style={{color: '#A7A7A7'}}>Don't have an account? </Text>
                    <Text style={{color: '#009788'}} onPress={() => props.navigation.navigate('SignUpScreen')}>Sign Up</Text>
                </View>
            </View>}
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    custom: {
        fontFamily: 'Yesteryear-Regular',
        fontSize: 60,
        color: '#009788',
        paddingTop: 20
    },
    resetSignUpView: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5
    },
    signIn: {
        fontStyle: 'normal',
        fontSize: 32,
        lineHeight: 42,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.015,
        color: '#009788'
    },
    container: {
        display: 'flex',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
    },
});

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {setUserId})(SignInScreen);
