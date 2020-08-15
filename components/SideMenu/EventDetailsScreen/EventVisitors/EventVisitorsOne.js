import {Image, Text, TouchableOpacity, View} from "react-native";
import userPic from "../../../../assets/Screenshot_6.png";
import React, {useEffect} from "react";

const EventVisitorsOne = (props) => {
    useEffect(() => {
        console.log('visitors:', props.visitors)
    }, []);

    return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{
            height: 40,
            borderWidth: 1,
            width: 40,
            borderRadius: 30,
            position: 'relative',
            zIndex: 3,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Image source={{uri: props.visitors[0].profile_pic}} style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#333733',
                width: 40,
                borderRadius: 30,
                position: 'relative',
                zIndex: 3,
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}/>
        </View>
    </View>
)
};

export default EventVisitorsOne;
