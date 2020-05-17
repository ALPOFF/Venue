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
    ActivityIndicator
} from "react-native";
import appIcon from "../assets/appIcon.png";
import avaSign from "../assets/avatarSign.png";
import SignInReduxForm from "../ReduxForm/LogInReduxForm";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserId} from "../state/appReducer";

const SignInScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {

    }, []);

    const _signInAsync = (value) => {
        console.log('submitting form', value.email);
        axios.post(`https://warm-ravine-29007.herokuapp.com/auth/`, {Username: value.email, Password: value.password})
            .then(async res => {
                console.log("ALL: "+res.data);
                setHasError(res.data);
                if (res.data) {
                    await AsyncStorage.setItem('userToken', res.data[0].user_id.toString());
                    await AsyncStorage.setItem('userName', value.email);
                    props.navigation.navigate('App')
                }
            });
    };

    return (
        <View style={styles.container}>
            <Image
                style={{width: 60, height: 60, marginTop: 50, marginBottom: 15}}
                source={appIcon}
            />
            {
                <Text style={styles.signIn}>Sign In</Text>
            }
            <Image
                style={{width: 130, height: 130, margin: 20}}
                source={avaSign}
            />
            <SignInReduxForm hasError={hasError} _signInAsync={_signInAsync}/>

            <View style={{marginTop: 100, display: 'flex', alignItems: 'center'}}>
                <View style={styles.resetSignUpView}>
                    <Text style={{color: '#A7A7A7'}}>Forgot your password? </Text>
                    <Text style={{color: '#3C2274'}} onPress={() => this.props.navigation.navigate('')}>Reset</Text>
                </View>
                <View style={styles.resetSignUpView}>
                    <Text style={{color: '#A7A7A7'}}>Don't have an account? </Text>
                    <Text style={{color: '#3C2274'}} onPress={() => Linking.openURL('http://google.com')}>Sign Up</Text>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
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
        color: '#3C2274'
    },
    container: {
        display: 'flex',
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
