import React, {Component, useEffect, useState} from "react";
import {
    View,
    Text,
    TextInput,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import {Icon} from "react-native-elements";
import * as axios from "axios";
import {connect} from "react-redux";
import {
    getDUsers, setCurDialogId,
    setCurDialogsUser,
    setDialogName,
    setNewLstMsg,
    setttUserDialog,
    setUserDialog,
    setUserId
} from "../state/appReducer";

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog_id: props.navigation.state.params.dialog_id,
            friend_id: props.navigation.state.params.friend_id,
            eventType: props.navigation.state.params.eventType,
            users_id: props.navigation.state.params.users_id,
            dialogTitle: props.navigation.state.params.dialogTitle,
            key: null,
            msgContent: '',
            title: ''
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('Title', 'Initialization ...'),
            //Default Title of ActionBar
            headerStyle: {
                // backgroundColor: navigation.getParam('BackgroundColor', '#ED2525'),
                //Background color of ActionBar
            },
            // headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
            //Text color of ActionBar
        };
    };

//d_id null frid 4
    componentDidMount() {
        console.log('users_id:', this.state.users_id)
        console.log("mounted");
        if (this.state.dialog_id != "none") {
            // SET AND GET INFO ABOUT DIALOG BY ID which is exist
            this.props.setUserDialog(this.state.dialog_id)
            !this.state.eventType ? AsyncStorage.getItem('userToken', (err, item) => {
                //console.log('title:', this.state.users_id.filter(u => u != item))
                axios.post(`http://185.12.95.84:3000/getusername`, {user_id: this.state.users_id.filter(t => t != item)}).then(res => {
                        console.log('us:', res.data)
                        this.props.navigation.setParams({Title: res.data[0].Username})
                        this.setState({title: res.data[0].Username})
                    }
                )
                this.props.setUserId(item);
                this.setState({key: item})
            }) : this.props.navigation.setParams({Title: this.state.dialogTitle});
            if (this.state.dialog_id != null) {
                this.props.getDUsers(this.state.dialog_id);
            }
        } else {
            !this.state.eventType ?  AsyncStorage.getItem('userToken', (err, item) => {
                axios.post(`http://185.12.95.84:3000/getusername`, {user_id: this.state.friend_id}).then(res => {
                        console.log('us:', res.data)
                        this.props.navigation.setParams({Title: res.data[0].Username})
                        this.setState({title: res.data[0].Username})
                    }
                )
                this.props.setUserId(item);
                this.setState({key: item})
            }) : this.props.navigation.setParams({Title: this.state.dialogTitle}); 
            this.props.setttUserDialog([])
            // SET AND GET INFO ABOUT DIALOG BY ID which is not exist
            //this.props.setttUserDialog([])
        }
        console.log('HEREX:', this.props.dialogs)
        this.props.setCurDialogId(this.state.dialog_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('userDialog', this.props.userDialog)
        console.log('dlgidcur:', this.state.dialog_id)
        console.log('cdi:', this.props.curDialogId)
        if (this.props.skt !== prevProps.skt ) {
            console.log('prevProps:', prevProps.skt)
            console.log('props:', this.props.skt)
            console.log("mountedUpdate")
            console.log("dialog_id: " + this.props.curDialogId);
            if (this.props.curDialogId !== "none") {
                if (this.props.curDialogId != null) {
                    this.props.setUserDialog(this.props.curDialogId);
                } else {
                    this.props.setUserDialog([this.props.curDialogId]);
                }
                AsyncStorage.getItem('userToken', (err, item) => {
                    this.props.setUserId(item);
                    this.setState({key: item})
                });
                this.props.curDialogId != null && this.props.getDUsers(this.props.curDialogId)
            } else {

                this.props.setUserDialog(this.props.skt.dialog_id);

                AsyncStorage.getItem('userToken', (err, item) => {
                    this.props.setUserId(item);
                    this.setState({key: item})
                });
                this.props.getDUsers(this.props.skt.dialog_id)
                this.setState({dialog_id: this.props.skt.dialog_id})
            }
            this.props.setCurDialogId(this.state.dialog_id)
        }
    }

    render() {
        // ON MESSAGING
        const onTextInput = (text) => {
            // console.log(this.props.dialogs)
            // console.log("text: " + text);
            // console.log(this.state.key)
            // console.log('cdu', this.props.curdialogusers)
            // console.log(this.state.dialogTitle)
        };

        //ON SEND
        const onTextSend = () => {
            AsyncStorage.getItem('userToken', (err, item) => {
                if (!this.state.eventType) {
                    console.log('isnull:', this.props.curDialogId)
                    if (this.props.curDialogId !== 'none') {
                        console.log(this.props.curDialogId )
                        console.log('dialog id is not none')
                        let to_id = 4;
                        console.log('to_id', this.state.friend_id)
                        axios.post(`http://185.12.95.84:3000/sendmsg`,
                            {
                                content: this.state.msgContent,
                                dialog_id: this.props.curDialogId,
                                from_id: item,
                                to_id: to_id,
                                eventType: this.state.eventType
                            });
                        setCurDialogsUser([{dialog_id: this.props.curDialogId, last_msg: this.state.msgContent}])
                    } else {
                        console.log('dialog id is none')

                        // axios.post(`https://warm-ravine-29007.herokuapp.com/setnewdialogid`,
                        //     {content: this.state.msgContent, dialog_id: this.state.dialog_id, from_id: item, to_id: this.state.friend_id});

                        axios.post(`http://185.12.95.84:3000/sendmsg`,
                            {
                                content: this.state.msgContent,
                                dialog_id: this.props.curDialogId,
                                from_id: item,
                                to_id: this.state.friend_id,
                                eventType: this.state.eventType
                            });
                        setCurDialogsUser([{dialog_id: this.props.curDialogId, last_msg: this.state.msgContent}])
                    }
                    console.log('LETS GO:', this.props.curdialogusers)
                    //this.props.setNewLstMsg(this.props.curdialogusers[0].dialog_id, this.state.msgContent)
                } else {
                    console.log('this is event dlg')



                    if (this.props.curDialogId !== 'none') {
                        console.log('dialog id is not none')
                        axios.post(`http://185.12.95.84:3000/sendmsg`,
                            {
                                content: this.state.msgContent,
                                dialog_id: this.props.curDialogId,
                                from_id: item
                            });
                        setCurDialogsUser([{dialog_id: this.props.curDialogId, last_msg: this.state.msgContent}])
                    } else {
                        console.log('dialog id is none')
                        axios.post(`http://185.12.95.84:3000/sendmsg`,
                            {
                                content: this.state.msgContent,
                                dialog_id: this.state.dialog_id,
                                from_id: item
                            });
                        setCurDialogsUser([{dialog_id: this.props.curDialogId, last_msg: this.state.msgContent}])
                    }


                }
            })
        };

        return (
            <KeyboardAvoidingView style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                {(this.props.userDialog != []) ?
                    <ScrollView showsVerticalScrollIndicator={true} decelerationRate={"normal"}
                                style={{display: "flex", margin: 7, backgroundColor: '#F1EFF1'}}>
                        {this.props.userDialog.map(d =>
                            (d.user_id == this.state.key)
                                ?
                                <View key={d.message_id} style={styles.messageA}>
                                    <Text
                                        style={{fontWeight: "bold", fontSize: 16, paddingLeft: 20}}>{d.Username}</Text>
                                    <Text style={{paddingLeft: 20}}>{d.content}</Text>
                                    {/*<Text style={{paddingLeft: 20}}>{this.state.dialog_id}</Text>*/}
                                </View>
                                :
                                <View key={d.message_id} style={styles.messageB}>
                                    <View>
                                        {/*<Text>{d.user_id}</Text>*/}
                                        <Text style={{
                                            fontWeight: "bold",
                                            fontSize: 16,
                                            paddingRight: 20
                                        }}>{d.Username}</Text>
                                        <Text style={{paddingRight: 20}}>{d.content}</Text>
                                    </View>
                                </View>
                        )}
                    </ScrollView>
                    :
                    <View><Text>111</Text></View>}
                <View style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>
                    <TextInput style={{height: 40, width: "89%", backgroundColor: 'color'}}
                               placeholder="Введите сообщение" onChangeText={(text) => {
                        this.setState({msgContent: text});
                        onTextInput(text)
                    }} value={this.state.msgContent}/>
                    <TouchableOpacity onPress={() => onTextSend()
                    }>
                        <Icon name="ios-send" type="ionicon" size={30} color={'#010743'}/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    messageA: {
        // borderColor: 'red',
        backgroundColor: "lightgrey",
        // borderWidth: 1,
        marginBottom: 10,
        display: "flex",
        alignItems: "flex-start",
        borderRadius: 30,
        marginRight: "25%",
        padding: 2
    },
    messageB: {
        // borderColor: 'blue',
        backgroundColor: "rgba(1,6,69,0.37)",
        borderRadius: 30,
        // borderWidth: 1,
        marginBottom: 10,
        alignItems: "flex-end",
        marginLeft: "25%"
    }
});

const mapStateToProps = (state) => ({
    skt: state.appReducer.skt,
    dialogs: state.appReducer.dialogs,
    curdialogusers: state.appReducer.curdialogusers,
    userDialog: state.appReducer.userDialog,
    dialogName: state.appReducer.dialogName,
    curDialogId: state.appReducer.curDialogId
});

export default connect(mapStateToProps, {
    setCurDialogsUser,
    getDUsers,
    setttUserDialog,
    setUserDialog,
    setCurDialogId,
    setDialogName,
    setUserId,
    setNewLstMsg
})(Dialog);

