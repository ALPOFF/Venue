import React, { Component } from "react";
import {
    Alert,
    Image,
    PermissionsAndroid,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    BackHandler,
    ScrollView
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import mapStyle from "../../../../common/mapConfig";
import { connect } from "react-redux";
import { setMarker, setThunkTown } from "../../../../state/appReducer";

import { geocodeLocationByName, getLocation } from "../../../../common/locationservice";
import * as axios from "axios";
import { localizeMapScreen } from "../../../../localization/localize";

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
        } else {

            Alert.alert("Location Permission Not Granted");

        }
    } catch (err) {
        console.warn(err)
    }
}

class MapForPickPlace extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            lat: null,
            long: null,
            err: '',
            region: {},
            coord: {},
            suggestCoords: {}
            // marker: {}
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        console.log(this)
        Alert.alert(
            "Внимание!",
            "Ваш эвент не будет сохранен",
            [
                {
                    text: "Отмена",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Ок", onPress: () => {
                        //TODO: clear data, refactor it to separate fucntion
                    }
                }
            ]
        );

        return true;
    }

    componentDidMount() {
        this.getInitialState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const duration = 500
        // console.log('FFFFFFFFFFFFF', this.mapRef)
        if (this.props.suggestCoords !== prevProps.suggestCoords) {
            this.mapRef.fitToCoordinates([54.42167759934996, 23.08439078181983], { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true })

            if (Platform.OS === 'android') {
                if (this.marker) {
                    this.marker.animateMarkerToCoordinate(
                        nextProps.suggestCoords,
                        duration
                    );
                }
            } else {
                this.state.suggestCoords.timing({
                    ...nextProps.suggestCoords,
                    duration
                }).start();
            }
        }
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                // console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        // console.log(loc)
        geocodeLocationByName(loc).then(
            (data) => {
                // console.log(data);
                this.setState({
                    region: {
                        latitude: data.results[0].geometry.location.latitude,
                        longitude: data.results[0].geometry.location.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    moveToMarker = (geoData) => {
        console.log('this', this)
        console.log('geoDATA:', geoData)
        this.setState({
            region: {
                latitude: geoData.latitude,
                longitude: geoData.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
    }

    getSuggest = (suggest) => {
        this.setState({ suggestCoords: suggest })
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }

    geocodeLocationByCoordsYandex(lat, long) {
        axios.get(`https://geocode-maps.yandex.ru/1.x?apikey=a2b8af4a-0675-4706-aafc-c386bc1661ee&lang=en_US&format=json&geocode=${long},${lat}`).then(res => {
            this.setState({ town: res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine })
        })
    }

    render() {
        let markers = [
            { "latitude": 37.42167759934996, "longitude": -122.08439078181983 }
        ];
        return (
            <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={styles.container}>


                    {this.state.region['latitude'] ? <MapView
                        style={styles.map}
                        ref={map => { this.mapRef = map }}
                        autoFocus={false}

                        region={{
                            latitude: this.props.currentEventCoords.latitude,
                            longitude: this.props.currentEventCoords.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003
                        }}
                        customMapStyle={mapStyle}
                        onMarkerDragEnd={() => alert('hi')}
                        onPress={(e) => {
                            console.log(e.nativeEvent.coordinate);
                            this.props.setMarker(e.nativeEvent.coordinate)
                            this.setState({ coord: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude } })
                        }}
                    >
                        {this.props.currentEventCoords.latitude !== null && this.props.currentEventCoords.longitude !== null &&
                            <Marker
                                draggable
                                coordinate={{
                                    latitude: this.props.currentEventCoords.latitude,
                                    longitude: this.props.currentEventCoords.longitude,
                                }}
                                onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}

                            >
                                <Text style={{ color: '#010743', fontWeight: 'bold' }}>Здесь</Text>
                                <Image
                                    style={{ opacity: 1, width: 30, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5 }}
                                    source={require('./../../../../assets/Venue_new/gpsIcon.png')} />
                            </Marker>
                        }
                        {/* {this.state.suggestCoords.latitude != undefined && <Marker.Animated
                            ref={marker => { this.marker = marker }}
                            coordinate={this.state.suggestCoords}
                        />} */}
                    </MapView> : null}

                    {/* <TouchableOpacity activeOpacity={0.8}
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 10,
                            backgroundColor: 'transparent',
                            zIndex: 999
                        }}
                        onPress={() => {
                            this.props.setThunkTown(this.state.coord.latitude, this.state.coord.longitude)
                            this.props.navigation.navigate('Detail');
                        }}>
                        <Image
                            style={{ opacity: 1, width: 50, height: 50, marginRight: 10, marginBottom: 90, marginTop: 5 }}
                            source={require('./../../../../assets/Venue_new/gpsIcon.png')} />
                    </TouchableOpacity> */}
                </View>
            </View>
        );

    }
}

const mapStateToProps = (state) => ({
    marker: state.appReducer.marker,
    suggestCoords: state.appReducer.suggestCoords
});

export default connect(mapStateToProps, { setMarker, setThunkTown })(MapForPickPlace);

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

    },
    map: {
        width: '100%',
        height: 400,
        position: 'relative',
        marginTop: 20,
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
