import React, {useState, useEffect} from "react";
import {
    AsyncStorage,
    Image, KeyboardAvoidingView, Keyboard,
    StyleSheet,
    Text,
    View
} from "react-native";
import appIcon from "../../assets/Venue_new/logo_hands.png";
import avaSign from "../../assets/Venue_new/avatarSign.png";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserId} from "../../state/appReducer";
import SignUpReduxForm from "../../ReduxForm/SignUpReduxForm";
import {BackHandler} from "react-native";

const SignUpScreen = (props) => {
    const [hasError, setHasError] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [keyboardT, setKeyboardT] = useState(false);

    const _signUpAsync = (value) => {
        console.log('submitting form', value.email, value.password, value.passwordVerif, value.login);

        (value.passwordVerif !== value.password) ? setHasError(true) :
            axios.post(`https://warm-ravine-29007.herokuapp.com/registr/`, {
                Email: value.email,
                Password: value.password,
                Login: value.login
            })
                .then(async res => {
                    console.log("ALL: " + res.data);
                    if (res.data === 'done') {
                        await AsyncStorage.setItem('userToken', res.data[0].user_id.toString());
                        await AsyncStorage.setItem('userName', value.login);
                        props.navigation.navigate('App')
                    } else if (res.data === 'already exists') {
                        setEmailExists(true)
                    } else (
                        alert('error')
                    )
                });
    };

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, [() => {
        props.navigation.navigate('SignInScreen')
    }]);

    const handleBackButtonClick = () => {
        // After clicking on Back Button
        // To go to any other screen
        props.navigation.navigate('SignInScreen');
        // Returning true/false is described below
        return true;
    }

    const _keyboardDidShow = () => {
        setKeyboardT(true)
    };

    const _keyboardDidHide = () => {
        setKeyboardT(false)
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.custom}>Venue</Text>
            {/*{*/}
            {/*    !keyboardT && <Text style={{fontSize: 20}}>Sign Up</Text>*/}
            {/*}*/}
            {!keyboardT && <Image
                style={{width: 130, height: 130, margin: 20}}
                source={avaSign}
            />}
            <SignUpReduxForm setEmailExists={setEmailExists} emailExists={emailExists} setHasError={setHasError} hasError={hasError} _signUpAsync={_signUpAsync}/>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    custom: {
        fontFamily: 'Yesteryear-Regular',
        fontSize: 60,
        color: '#009788'
    },
    resetSignUpView: {
        display: 'flex',
        flexDirection: 'row'
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

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {setUserId})(SignUpScreen);
