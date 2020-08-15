import React, {useEffect} from "react";
import {AsyncStorage, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import * as axios from "axios";
import ava from "../assets/Venue_new/userIcon.png";

const Subscriptions = (props) => {
    let subscription = props.navigation.state.params.subscriptions
    const [subscrip, setSubscrip] = React.useState([]);

    useEffect(() => {
        console.log('subscription:', subscription)
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/getsubscrip`, {subscription, user_id: item}).then(res => {
                setSubscrip(res.data);
                console.log(res.data)
            })
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {subscrip.map(s =>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>
                        {s.profile_pic != undefined ? <Image source={{uri: s.profile_pic}} style={{
                                height: 40,
                                borderWidth: 1,
                                borderColor: 'rgba(51,55,51,0.87)',
                                width: 40,
                                borderRadius: 30,
                                position: 'relative',
                                zIndex: 1,
                                marginRight: 8,
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}/> :
                            <Image source={ava} style={{
                                height: 40,
                                borderWidth: 1,
                                borderColor: 'rgba(51,55,51,0.87)',
                                width: 40,
                                borderRadius: 30,
                                position: 'relative',
                                zIndex: 1,
                                marginRight: 8,
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}/>}
                        <TouchableOpacity onPress={() => {props.navigation.navigate('UserProfile', {user_id: s.user_id})}}>
                            <Text>{s.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableOpacity activeOpacity={0.8}
                                  style={{
                                      position: 'absolute',
                                      right: 10,
                                      top: 10,
                                      backgroundColor: 'transparent',
                                      zIndex: 999
                                  }}
                                  onPress={() =>
                                      props.navigation.navigate('YourProfile')}>
                    <Icon style={{opacity: .8, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5}}
                          name="close" size={40} color={'#009788'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    innerContainer: {
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 250,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
});

export default Subscriptions;
