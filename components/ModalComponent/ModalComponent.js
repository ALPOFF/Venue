import React, { useState } from "react";
import Modal from 'react-native-modal';

import {
    NativeModules,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

const ModalComponent = (props) => {

    return (
        <Modal isVisible={props.isModalVisible}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.modalView}
            transparent={true}
            onRequestClose={() => { props.toggleModal() }}
        >
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPressOut={() => { props.toggleModal(); console.log('clicked') }}
            >
            </TouchableOpacity>
            <View style={styles.containerStyle}>
                <View style={styles.content}>

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 0,

        justifyContent: 'flex-end',
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',

    },
    content: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        overflow: 'hidden',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
});

export default ModalComponent;