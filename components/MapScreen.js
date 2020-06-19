import React, {Component} from "react";
import {StyleSheet, Text, View, Alert , Dimensions, PermissionsAndroid, Platform, ActivityIndicator} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {Icon} from "react-native-elements";
import mapStyle from './../common/mapConfig'
import Geolocation  from '@react-native-community/geolocation';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export async function request_location_runtime_permission() {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'ReactNativeCode Location Permission',
                'message': 'ReactNativeCode App needs access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            Alert.alert("Location Permission Granted.");
        }
        else {

            Alert.alert("Location Permission Not Granted");

        }
    } catch (err) {
        console.warn(err)
    }
}

class MapScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            long: null,
            err: ''
        };
    }

       componentDidMount(): void {
           Geolocation.getCurrentPosition((position) => {
               console.log(position);
               this.setState({lat: position.coords.latitude})
               this.setState({long: position.coords.longitude})
           }, (error) => {
               // См. таблицы кодов ошибок выше.
               console.log(error.code, error.message);
           }, {
               enableHighAccuracy: false,
               timeout: 10000,
               maximumAge: 100000
           });

        //let that = this;
        //Checking for the permission just after component loaded
        // async function requestCameraPermission() {
        //     //Calling the permission function
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.CAMERA,
        //         {
        //             title: 'AndoridPermissionExample App Camera Permission',
        //             message: 'AndoridPermissionExample App needs access to your camera ',
        //         }
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         that.proceed();
        //     } else {
        //         alert('CAMERA Permission Denied.');
        //     }
        // }
        // if (Platform.OS === 'android') {
        //     requestCameraPermission();
        // } else {
        //     this.proceed();
        // }

        // Geolocation.getCurrentPosition((position) => {
        //     console.log(position);
        // }, (error) => {
        //     // См. таблицы кодов ошибок выше.
        //     console.log(error.code, error.message);
        // }, {
        //     enableHighAccuracy: false,
        //     timeout: 10000,
        //     maximumAge: 100000
        // });

        // Geolocation.getCurrentPosition(
        //      info => console.log(info) //was false
        // );
        //
        // (position) => {
        //     setLat(position.coords.latitude);
        //     console.log(position.coords.latitude)
        //     setLong(position.coords.longitude)
        //     console.log(position.coords.longitude)
        //
        // },
        //     (error) => setError(error.message),
        //     { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 },
    }

    render() {



        let markers = [
            {
                latitude: 54.940290,
                longitude: 43.328117,
                title: '1 km',
                subtitle: 'Somebody wants to do drink some coffee?'
            },
            {
                latitude: 54.936761,
                longitude: 43.329193,
                title: '1.4 km',
                subtitle: 'Search a partner for morning run'
            }
        ];
        return (
            <View style={styles.container}>
                {this.state.lat && this.state.long
                    ?

                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.lat,
                            longitude: this.state.long,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005 * (screenWidth / screenHeight),
                        }}
                        customMapStyle={mapStyle}
                    >

                        {
                            markers.map(m => <Marker key={m.latitude}
                                                     draggable
                                                     coordinate={{
                                                         latitude: m.latitude,
                                                         longitude: m.longitude,
                                                     }}
                                                     onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                                                     title={m.title}
                                                     description={m.subtitle}
                            >
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <Icon name="md-hand" type="ionicon" size={40} color={'#010743'}/>
                                    <Text style={{color: '#010743', fontWeight: 'bold'}}>{m.title}</Text>
                                </View>


                            </Marker>)
                        }

                        {this.state.lat !== null && this.state.long !== null &&
                        <Marker
                            draggable
                            coordinate={{
                                latitude: this.state.lat,
                                longitude: this.state.long,
                            }}
                            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}

                        >
                            <Text style={{color: '#010743', fontWeight: 'bold'}}>You are here</Text>
                            <Icon name="navigation" size={30} color={'#010743'}/>
                        </Marker>
                        }

                    </MapView> : <View>
                        <ActivityIndicator size="large" color="#009788"/>
                    </View>
                }
            </View>
        );

    }
}


const styles = StyleSheet.create({
    resetSignUpView: {
        display: 'flex',
        flexDirection: 'row'
    },
    signIn: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 27,
        lineHeight: 42,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.015,

        color: '#3C2274'
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        position: 'absolute',
        paddingTop: 20,
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

export default MapScreen;
