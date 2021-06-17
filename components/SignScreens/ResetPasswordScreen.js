import React, { useEffect, useState } from "react";
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
import ResetPasswordReduxForm from "../../ReduxForm/ResetPasswordReduxForm";
import * as axios from "axios";
import { connect } from "react-redux";
import { setUserId, setUserProfileBarThunk } from "../../state/appReducer";
import { useDarkMode } from 'react-native-dark-mode'
import { localizeSignInScreen } from "../../localization/localize";


const ResetPasswordScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [keyboardT, setKeyboardT] = useState(false);

    useEffect(() => {
        AsyncStorage.setItem('darkMode', false);
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _recoverAsync = (value) => {
        console.log('submitting form', value.loginOrEmail);
        axios.post(`http://185.12.95.84:3000/send_password_recovery_mail/`, { loginOrEmail: value.loginOrEmail, loginOrEmailCopy: value.loginOrEmailCopy })
            .then(async res => {
                console.log("ALL: " + res.data);
                // console.log(res.data);
                // if (res.data === 'ERROR') {
                //     setHasError(res.data);
                // } else if (res.data.done === true) {
                //     await AsyncStorage.setItem('userToken', res.data.resRows[0].user_id.toString());
                //     await AsyncStorage.setItem('userName', res.data.resRows[0].Username.toString());
                //     props.navigation.navigate('App')
                // } else {
                //     alert('server error')
                // }
            });
    };

    const _keyboardDidShow = () => {
        setKeyboardT(true)
    };

    const _keyboardDidHide = () => {
        setKeyboardT(false)
    };

    const sendEmail = () => {
        axios.post(`http://185.12.95.84:3000/send_password_recovery_mail`, {})
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#009788" />}
            <Text style={styles.custom}>Venue</Text>
            {!keyboardT && <Image
                style={{ width: 130, height: 130, margin: 20 }}
                source={avaSign}
            />}
            <ResetPasswordReduxForm setHasError={setHasError} hasError={hasError} _recoverAsync={_recoverAsync} />

            {!keyboardT && <View style={{ marginTop: 50, display: 'flex', alignItems: 'center' }}>
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

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { setUserId })(ResetPasswordScreen);
