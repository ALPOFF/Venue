import React, {useEffect} from "react";
import {AsyncStorage, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import * as axios from "axios";
import ava from './../assets/Venue_new/userIcon.png'

const Subscribers = (props) => {
    let subscriber = props.navigation.state.params.subscribers
    const [subscrib, setSubscrib] = React.useState([]);

    useEffect(() => {
        console.log('subscribers:', subscriber)
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/getsubscrib`, {subscriber, user_id: item}).then(res => {
                setSubscrib(res.data);
                console.log(res.data)
            })
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {subscrib.map(s => <View style={{display: "flex", flexDirection: "row"}}>
                    {s.profile_pic == null ? <Image source={ava} style={{height: 40, width: 40}}/> :
                        <Image source={{uri: s.profile_pic}}/>}
                    <TouchableOpacity onPress={() => {props.navigation.navigate('UserProfile', {user_id: s.user_id})}}>
                        <Text style={{
                            paddingLeft: 10, color: '#14171A',
                            fontSize: 18,
                            fontFamily: 'Oxygen-Bold',
                            paddingVertical: 7
                        }}>{s.Username}</Text>
                    </TouchableOpacity>
                </View>)}
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
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 23
    },
});

export default Subscribers;