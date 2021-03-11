import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import userProfileReducer from "../state/userProfileReducer";
import { localizeHHH } from "../localization/localize";

class Hhh extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('updated')
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (this.props.subscribers.length == nextProps.subscribers.length) {

        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.subscribers.length == prevProps.subscribers.length) { }
    }

    render() {
        return (
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text onPress={() => { this.props.subscribes.push(1) }}>ffffffff</Text>
                <TouchableOpacity style={{ display: "flex", flexDirection: "row" }} onPress={() => {
                    props.navigation.navigate('Subscriptions', {
                        subscriptions: subscribes,
                        user_id: user_id
                    })
                }}>
                    <Text style={{
                        color: '#14171A',
                        fontSize: 16,
                        fontFamily: 'Oxygen-Bold',
                        paddingVertical: 2
                    }}>{this.props.subscribes.length} </Text>
                    <Text style={{
                        color: '#14171A',
                        fontSize: 16,
                        fontFamily: 'Oxygen-Bold',
                        paddingVertical: 2
                    }}>Subscriptions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ display: "flex", flexDirection: "row", paddingLeft: 15 }}
                    onPress={() => {
                        props.navigation.navigate('Subscribers', {
                            subscribers, user_id: user_id
                        })
                    }}>
                    <Text style={{
                        color: '#14171A',
                        fontSize: 16,
                        fontFamily: 'Oxygen-Bold',
                        paddingVertical: 2
                    }}>{this.props.subscribers.length} </Text>
                    <Text style={{
                        color: '#14171A',
                        fontSize: 16,
                        fontFamily: 'Oxygen-Bold',
                        paddingVertical: 2
                    }}>{localizeHHH.subscribers}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    subscribers: state.userProfileReducer.subscribers,
    subscribes: state.userProfileReducer.subscribes
})

export default connect(mapStateToProps, {})(Hhh);
