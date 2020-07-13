import React, {useEffect} from "react";
import {AsyncStorage, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import * as axios from "axios";
import {formatDate} from "../common/formatDate";
import EditReduxForm from "../ReduxForm/editProfileForm";

const EditProfile = (props) => {
    let profilePic = props.navigation.state.params.profilePic;
    let backgroundPic = props.navigation.state.params.backgroundPic
    const [newProfilePic, setNewProfilePic] = React.useState({});
    const [newBgPic, setNewBgPic] = React.useState({});

    const [newName, setNewName] = React.useState('');
    const [newBio, setNewBio] = React.useState('');
    const [newBirthday, setNewBirthday] = React.useState('');

    let profile = props.navigation.state.params.profile

    useEffect(() => {
        console.log('mounted')
        console.log('pr:', profile)
        console.log('pic:', profilePic)
        console.log(profile.name)
        profile.name == null ? setNewName('') : setNewName(profile.name)
        setNewBio(profile.description)
        setNewBirthday(profile.birthday)
    }, [])
    let _getProfilePicPhoto = async () => {
        ImagePicker.openPicker({
            width: 720,
            height: 720,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            console.log(image);
            setNewProfilePic(image)
        });
    }

    let _getBgPicPhoto = async () => {
        ImagePicker.openPicker({
            width: 1080,
            height: 720,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            console.log(image);
            setNewBgPic(image)
        });
    }

    let changeProfile = () => {
        // AsyncStorage.getItem('userToken', (err, item) => {
        //     axios.post(`http://185.12.95.84:3000/sendimage`, {
        //         img: this.state.pickedImg,
        //         postText: this.state.description,
        //         eventName: this.state.eventName,
        //         userId: item,
        //         postCategory: this.state.category,
        //         coords: this.props.marker
        //     }).then(this.props.navigation.navigate('Main'))
        // })
    }

    const xxxx = (value) => {
        //changeProfileInfo
        console.log('submitting form', value.name);
        console.log('submitting form', value.bio);
        console.log('pic:', newProfilePic)
        console.log('xx:', newBgPic)
        let prof = {};
        let backgr = {};
        newProfilePic.data === undefined ? prof = profilePic : prof = newProfilePic;
        newBgPic.data === undefined ? backgr = backgroundPic : backgr = newBgPic;
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/changeprofileinfo`, {
                user_id: item,
                name: value.name,
                description: value.bio,
                profile_pic: prof,
                background_pic: backgr
            }).then(
                props.navigation.navigate('YourProfile')
            )
        })
    }

    return (
        <View style={{display: 'flex', flexDirection: 'column'}}>
            <View style={{height: '30%', marginBottom: 10}}>
                {newBgPic.data === undefined ? <Image blurRadius={3} source={{uri: backgroundPic}}
                                                      style={{
                                                          height: '100%',
                                                          position: 'relative',
                                                          zIndex: -100,
                                                          top: 0
                                                      }}/> :
                    <Image blurRadius={1} source={{uri: newBgPic.path}}
                           style={{height: '100%', position: 'relative', zIndex: -100, top: 0}}/>}
                <TouchableOpacity style={{position: 'absolute', zIndex: 1, top: '37%', left: '44%'}} onPress={() => {
                    _getProfilePicPhoto()
                }}>
                    <Icon name="add-a-photo" type="material" size={40} color='white'/>
                </TouchableOpacity>
                {newProfilePic.data === undefined ? <Image blurRadius={1} source={{uri: profilePic}}
                                                           style={{
                                                               width: '30%',
                                                               height: '60%',
                                                               borderRadius: 100,
                                                               borderWidth: 2,
                                                               borderColor: 'white',
                                                               top: '20%',
                                                               left: '35%',
                                                               position: 'absolute',
                                                               zIndex: 0
                                                           }}/> :
                    <Image blurRadius={1} source={{uri: newProfilePic.path}}
                           style={{
                               width: '30%',
                               height: '60%',
                               borderRadius: 100,
                               borderWidth: 2,
                               borderColor: 'white',
                               top: '20%',
                               left: '35%',
                               position: 'absolute',
                               zIndex: 0
                           }}/>}
                <TouchableOpacity style={{position: 'absolute', zIndex: 1, top: '40%', right: '10%'}} onPress={() => {
                    _getBgPicPhoto()
                }}>
                    <Icon name="add-a-photo" type="material" size={40} color='white'/>
                </TouchableOpacity>
            </View>
            <EditReduxForm xxxx={xxxx}
                           initialValues={{
                               name: `${newName}`,
                               bio: `${newBio}`,
                               birth: `${formatDate(new Date(newBirthday))}`
                           }}/>
            {/*<View style={{height: '70%', paddingHorizontal: 10}}>*/}
            {/*    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>*/}
            {/*        <Text>Name: </Text>*/}
            {/*        <TextInput onChangeText={(value) => {*/}
            {/*            setNewName(value)*/}
            {/*        }} value={newName} placeholder={'Enter your name...'}/>*/}
            {/*    </View>*/}
            {/*    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>*/}
            {/*        <Text>Bio: </Text>*/}
            {/*        <TextInput onChangeText={(value) => {*/}
            {/*            setNewBio(value)*/}
            {/*        }} value={newBio} placeholder={'Bio...'}/>*/}
            {/*    </View>*/}
            {/*    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>*/}
            {/*        <Text>Birthday: </Text>*/}
            {/*        <TextInput onChangeText={(value) => {*/}
            {/*            setNewBirthday(value)*/}
            {/*        }} value={formatDate(new Date(newBirthday))} placeholder={'Birthday...'}/>*/}
            {/*    </View>*/}
            {/*</View>*/}
            {/*<TouchableOpacity activeOpacity={0.8}*/}
            {/*                  style={{*/}
            {/*                      position: 'absolute',*/}
            {/*                      right: 10,*/}
            {/*                      bottom: 10,*/}
            {/*                      backgroundColor: 'transparent',*/}
            {/*                      zIndex: 999*/}
            {/*                  }}*/}
            {/*                  onPress={() => changeProfile()}>*/}
            {/*    <Image*/}
            {/*        style={{opacity: 1, width: 50, height: 50, marginRight: 10, marginBottom: 10, marginTop: 5}}*/}
            {/*        source={require('./../assets/Venue_new/addIcon3.png')}/>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
}

export default EditProfile;
