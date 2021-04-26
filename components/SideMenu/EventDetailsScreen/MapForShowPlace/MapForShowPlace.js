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

class MapForPickPlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            long: null,
            err: '',
            region: {},
            coord: {},
            suggestCoords: {},
            currentEventCoords: props.navigation.state.params.currentEventCoords
            // marker: {}
        };
    }

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                // console.log(data);
                this.setState({
                    region: {
                        latitude: this.state.currentEventCoords.latitude,
                        longitude: this.state.currentEventCoords.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0
                    }
                });
            }
        );
    }

    render() {
        return (
            <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={styles.container}>
                    {this.state.region['latitude'] ? <MapView
                        style={styles.map}
                        // ref={map => { this.mapRef = map }}
                        autoFocus={false}

                        region={{
                            latitude: this.state.currentEventCoords.latitude,
                            longitude: this.state.currentEventCoords.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003
                        }}
                        customMapStyle={mapStyle}
                        onMarkerDragEnd={() => alert('hi')}
                        onPress={(e) => {
                            console.log(e.nativeEvent.coordinate);

                            this.setState({ coord: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude } })
                        }}
                    >
                        {this.state.currentEventCoords.latitude !== null && this.state.currentEventCoords.longitude !== null &&
                            <Marker
                                draggable
                                coordinate={{
                                    latitude: this.state.currentEventCoords.latitude,
                                    longitude: this.state.currentEventCoords.longitude,
                                }}
                                onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}

                            >
                                <Text style={{ color: '#010743', fontWeight: 'bold' }}>Здесь</Text>
                                <Image
                                    style={{ opacity: 1, width: 30, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5 }}
                                    source={require('./../../../../assets/Venue_new/gpsIcon.png')} />
                            </Marker>
                        }
                    </MapView> : null}
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
        height: '100%',
        position: 'relative',
        marginTop: 0,
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
