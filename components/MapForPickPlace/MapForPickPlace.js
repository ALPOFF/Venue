import React, {Component} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    PermissionsAndroid,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import MapView, {Marker} from "react-native-maps";
import mapStyle from "../../common/mapConfig";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";
import {setMarker} from "../../state/appReducer";
import MapInput from "./MapInput";
import {geocodeLocationByName, getLocation} from "../../common/locationservice";

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
        } else {

            Alert.alert("Location Permission Not Granted");

        }
    } catch (err) {
        console.warn(err)
    }
}

class MapForPickPlace extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            long: null,
            err: '',
            region: {}
            // marker: {}
        };
    }

    componentDidMount(): void {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
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
        console.log(loc)
        geocodeLocationByName(loc).then(
            (data) => {
                console.log(data);
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

    onMapRegionChange(region) {
        this.setState({ region });
    }


    render() {
        let markers = [
            {"latitude": 37.42167759934996, "longitude": -122.08439078181983}
        ];
        return (
            <View style={{display: "flex", flexDirection: "column"}}>


                <View style={styles.container}>
                    <View style={{width: '100%'}}>
                        <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)}/>
                    </View>


                    {this.state.region['latitude'] ? <MapView
                        style={styles.map}
                        // onRegionChange={(reg) => this.onMapRegionChange(reg)}
                        showsUserLocation={true}
                        autoFocus={false}
                        region={this.state.region}
                        customMapStyle={mapStyle}
                        onPress={(e) => {
                            console.log(e.nativeEvent.coordinate);
                            this.props.setMarker(e.nativeEvent.coordinate)
                        }}
                    >
                        {this.props.marker.latitude != null &&
                        <Marker
                            draggable
                            coordinate={{
                                latitude: this.props.marker.latitude,
                                longitude: this.props.marker.longitude,
                            }}
                            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                        >
                            <View style={{display: 'flex', alignItems: 'center'}}>
                                <Icon name="explore" size={40} color={'#010743'}/>
                                <Text style={{color: '#010743', fontWeight: 'bold'}}>HERE!</Text>
                            </View>
                        </Marker>
                        }

                        {/*{<Marker*/}
                        {/*    draggable*/}
                        {/*    coordinate={{*/}
                        {/*        latitude: this.state.region.latitude,*/}
                        {/*        longitude: this.state.region.longitude,*/}
                        {/*    }}*/}
                        {/*    onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}*/}
                        {/*>*/}
                        {/*    <Text style={{color: '#010743', fontWeight: 'bold'}}>You HERE</Text>*/}
                        {/*    <Icon name="navigation" size={30} color={'#010743'}/>*/}
                        {/*</Marker>*/}
                        {/*}*/}

                    </MapView> : null }

                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                    {/*                  style={{*/}
                    {/*                      position: 'absolute',*/}
                    {/*                      right: 10,*/}
                    {/*                      top: 10,*/}
                    {/*                      backgroundColor: 'transparent',*/}
                    {/*                      zIndex: 999*/}
                    {/*                  }}*/}
                    {/*                  onPress={() =>*/}
                    {/*                      this.props.navigation.navigate('Detail')}>*/}
                    {/*    <Icon style={{opacity: .8, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5}}*/}
                    {/*          name="close" size={40} color={'#009788'}/>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{
                                          position: 'absolute',
                                          right: 10,
                                          bottom: 10,
                                          backgroundColor: 'transparent',
                                          zIndex: 999
                                      }}
                                      onPress={() => this.props.navigation.navigate('Detail')}>
                        <Image
                            style={{opacity: 1, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5}}
                            source={require('./../../assets/Venue_new/doneIcon3.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}

const mapStateToProps = (state) => ({
    marker: state.appReducer.marker
});

export default connect(mapStateToProps, {setMarker})(MapForPickPlace);

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
        marginTop: 42,
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
