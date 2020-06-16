import React, {Component} from 'react';
import {
    View,
    StyleSheet, AsyncStorage, TouchableOpacity, Text
} from 'react-native';
import EventReduxForm from "../../ReduxForm/EventReduxForm";
import * as axios from "axios";
import {Icon} from "react-native-elements";

class DetailScreen extends Component {
    render() {
         const _addEvent = (value) => {
            console.log('submitting form', value.eventName);
             AsyncStorage.getItem('userName', (err, item) => {
                 axios.post(`https://warm-ravine-29007.herokuapp.com/event/`, {
                     eventName: value.eventName,
                     eventText: value.eventText,
                     place: value.place,
                     userId: item
                 })
                     .then(res => {
                         if (res.data) {
                             this.props.navigation.navigate('Main')
                         }
                         else {
                             alert('error')
                         }
                     });
             });
        };

        return (
            <View style={styles.container}>
                <EventReduxForm _addEvent={_addEvent}/>
                <TouchableOpacity onPress={() =>
                    this.props.navigation.navigate('MapForPickPlace')}
                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
                    <Text style={{color: '#3C2274', fontWeight: 'bold', fontSize: 20}}>Pick Place</Text>
                    <Icon name="explore" size={40} color={'#3C2274'}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DetailScreen;
