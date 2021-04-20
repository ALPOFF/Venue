import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import { colors } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setSuggestCoords } from "../../state/appReducer";
import { connect } from "react-redux";
import e from 'cors';




const MapInput = (props) => {
    const [suggestResult, setSuggestResult] = useState([])
    const [queryText, setQueryText] = useState('')
    const [suggestListVision, setSuggestListVision] = useState(false)

    const suggest = (phrase) => {
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        let token = "8f37ec67bb9f304e467d1e08fe5061f4f8b3223c";
        // let query = "москва хабар";

        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({ query: phrase })
        }

        fetch(url, options)
            .then(response => response.text())
            .then(result => { setSuggestResult(JSON.parse(result).suggestions) })
            .catch(error => console.log("error", error));
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'column', position: 'absolute', width: '100%', height: 300, zIndex: 999 }}>
            <TextInput
                onChangeText={(value) => {
                    setQueryText(value); suggest(value); setSuggestListVision(true)
                }} value={queryText} placeholder={'some text'} />
            {suggestListVision && <View style={{ backgroundColor: 'white', marginTop: -10 }}>
                {suggestResult.map(el => <TouchableOpacity onPress={() => {
                    props.moveToMarker({ latitude: Number(el.data.geo_lat), longitude: Number(el.data.geo_lon) });
                    setQueryText(el.value); props.getSuggest({
                        latitude: Number(el.data.geo_lat), longitude:
                            Number(el.data.geo_lon)
                    }); setSuggestListVision(false)
                }} >
                    <View style={{ borderWidth: 1, borderColor: 'lightgrey', height: 40, paddingLeft: 5, display: 'flex', justifyContent: 'center' }}>
                        <Text>{el.value}</Text>
                    </View>
                </TouchableOpacity>)}
            </View>}
        </View>
    );
}

export default connect(null, { setSuggestCoords })(MapInput);

const styles = StyleSheet.create({
    con: {

    }
})
