import React, {useEffect} from "react";
import {
    AsyncStorage,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
} from "react-native";
import {Icon} from "react-native-elements";
import * as axios from "axios";
import {formatDate} from "../common/formatDate";
import {connect} from "react-redux";

const UserProfile = (props) => {
    let user_id = props.navigation.state.params.user_id;

    const [a, setA] = React.useState(true);
    const [profile, setProfile] = React.useState({});
    const [subscribes, setSubscribes] = React.useState([]);
    const [subscribers, setSubscribers] = React.useState([]);
    const [eventType, setEventType] = React.useState(0);
    const [eventInfoData, setEventInfoData] = React.useState([]);
    const [backgroundPic, setBackgroundPic] = React.useState('');
    const [profilePic, setProfilePic] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        console.log('redraw')
        console.log('subs current:', props.userProfileBar[0].subscribes)
        console.log(props.userProfileBar[0].subscribes.some(s => s == 30))
        console.log(props.userProfileBar[0].subscribes)
        props.userProfileBar[0].subscribers.length != 0 && console.log('userProfileBarX:', props.userProfileBar[0])
        console.log(user_id)
        AsyncStorage.getItem('userToken', (err, item) => {

            axios.post(`http://185.12.95.84:5000/checkforfriend`, {currentUserId: item, userId: user_id})
                .then(res => {
                    console.log('t od f:', res.data)
                });
        })

        axios.post(`http://185.12.95.84:3000/getprofile`, {
            userId: user_id
        }).then(res => {
            setProfile(res.data[0]);
            setSubscribes(res.data[0].subscribes);
            setSubscribers(res.data[0].subscribers)
            setProfilePic(res.data[0].profile_pic)
            setBackgroundPic(res.data[0].background_pic)
        })

        axios.post(`http://185.12.95.84:3000/geteventinfo`, {
            userId: user_id,
            eventType: 0
        }).then(res => {
            setEventInfoData(res.data);
            console.log(res.data)
        })

        console.log('subscribes:', subscribes)
        console.log('subscribers:', subscribers)
        console.log('userProfileBar:', props.userProfileBar)

    }, [user_id, subscribers.length, subscribes.length]);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const scroll = React.createRef();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        axios.post(`http://185.12.95.84:3000/getprofile`, {
            userId: user_id
        }).then(res => {
            setProfile(res.data[0]);
            setSubscribes(res.data[0].subscribes);
            setSubscribers(res.data[0].subscribers)
            setProfilePic(res.data[0].profile_pic)
            setBackgroundPic(res.data[0].background_pic)
        })

        axios.post(`http://185.12.95.84:3000/geteventinfo`, {
            userId: user_id,
            eventType: 0
        }).then(res => {
            setEventInfoData(res.data);
            console.log(res.data)
        })

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const eventInfo = () => {
        axios.post(`http://185.12.95.84:3000/geteventinfo`, {
            userId: user_id,
            eventType: eventType
        }).then(res => {
            setEventInfoData(res.data);
            console.log(res.data)
        })
    }

    let addToFriends = (friend_id) => {
        AsyncStorage.getItem('userToken', (err, item) => {
            axios.post(`http://185.12.95.84:3000/addtofriends`, {user_id: item, friend_id: friend_id})
            props.userProfileBar[0].subscribes.push(Number(user_id))
            console.log('friend_id:', friend_id)
            setSubscribers(subscribers.push(user_id))
            console.log(subscribers)
        });
    }

    let removeFromFriends = (friend_id) => {
        Alert.alert(
            "Unsubscribe",
            "Are you shure?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        console.log("OK Pressed")
                        AsyncStorage.getItem('userToken', (err, item) => {
                            axios.post(`http://185.12.95.84:3000/deletefriend`, {user_id: item, friend_id: friend_id})
                            let index = subscribers.indexOf(friend_id);
                            props.userProfileBar[0].subscribes.splice(index, 1)
                            console.log('index:', index)
                            setSubscribers(subscribers.splice(index, 1))
                            console.log(subscribers)

                            console.log('friend_id:', friend_id)

                        });

                    }
                }
            ],
            {cancelable: true}
        );
    }


    return (
        <View style={{display: 'flex', flexDirection: 'column'}}>
            <ScrollView ref={scroll} showsVerticalScrollIndicator={true} decelerationRate={"normal"} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <View style={{height: 180, marginBottom: 10}}>
                    {a && <Image blurRadius={0.7} source={{uri: backgroundPic}}
                                 style={{height: '100%', position: 'relative', zIndex: -100, top: 0}}/>}

                    {a && <Image source={{uri: profilePic}}
                                 style={{
                                     width: '30%',
                                     height: '60%',
                                     borderRadius: 100,
                                     borderWidth: 2,
                                     borderColor: 'white',
                                     top: '20%',
                                     left: '35%',
                                     position: 'absolute'
                                 }}/>}
                </View>
                <View style={{height: '70%'}}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: 'lightgrey',
                        paddingBottom: 5,
                        alignItems: "center"
                    }}>
                        <View style={{width: '100%'}}>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 20,
                                    fontFamily: 'Oxygen-Bold',
                                    paddingVertical: 7
                                }}>@{profile.Username}</Text>
                                <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    {!props.userProfileBar[0].subscribes.some(s => user_id == s) ?
                                        <TouchableOpacity key={user_id} onPress={() =>
                                            addToFriends(user_id)
                                        }>
                                            {/*<Icon name="person-add" size={30} color={'grey'}/>*/}
                                            <Text style={{
                                                color: 'rgba(20,23,26,0.56)',
                                                fontSize: 18,
                                                fontFamily: 'Oxygen-Bold',
                                                borderWidth: 2,
                                                borderColor: '#009788',
                                                borderRadius: 30,
                                                paddingTop: 6,
                                                paddingBottom: 1,
                                                paddingLeft: 9,
                                                paddingRight: 9
                                            }}>Subscribe</Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity key={user_id} onPress={() =>
                                            removeFromFriends(user_id)
                                        }>
                                            {/*<Icon name="person-add" size={30} color={'grey'}/>*/}
                                            <Text style={{
                                                color: 'rgba(20,23,26,0.56)',
                                                fontSize: 18,
                                                fontFamily: 'Oxygen-Bold',
                                                borderWidth: 2,
                                                borderColor: '#009788',
                                                borderRadius: 30,
                                                paddingTop: 6,
                                                paddingBottom: 1,
                                                paddingLeft: 9,
                                                paddingRight: 9
                                            }}>Subscribed</Text>
                                        </TouchableOpacity>}
                                    {!props.userProfileBar[0].subscribers.some(s => user_id == s) &&
                                    <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}
                                                      onPress={() => {
                                                          props.navigation.navigate('EditProfile', {
                                                              profilePic,
                                                              backgroundPic,
                                                              profile
                                                          })
                                                      }}>
                                        <Text style={{
                                            color: 'rgba(20,23,26,0.56)',
                                            fontSize: 18,
                                            fontFamily: 'Oxygen-Bold',
                                            borderWidth: 2,
                                            borderColor: '#009788',
                                            borderRadius: 30,
                                            paddingTop: 6,
                                            paddingBottom: 1,
                                            paddingLeft: 9,
                                            paddingRight: 9
                                        }}>Edit</Text>
                                    </TouchableOpacity>}
                                </View>
                            </View>
                            {profile.name !== '' && <View style={{display: "flex", flexDirection: "row"}}>
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 16,
                                    fontFamily: 'Oxygen-Bold',
                                    paddingVertical: 2
                                }}>Name: </Text>
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 16,
                                    fontFamily: 'Oxygen-Regular',
                                    paddingVertical: 2
                                }}>{profile.name}</Text>
                            </View>}
                            {profile.description !== '' && <View style={{display: "flex", flexDirection: "row"}}>
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 16,
                                    fontFamily: 'Oxygen-Bold',
                                    paddingVertical: 2
                                }}>Bio: </Text>
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 16,
                                    fontFamily: 'Oxygen-Regular',
                                    paddingVertical: 2
                                }}>{profile.description}</Text>
                            </View>}
                            <View style={{display: "flex", flexDirection: "row"}}>
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 16,
                                    fontFamily: 'Oxygen-Bold',
                                    paddingVertical: 2
                                }}>Birthday: </Text>
                                <Text style={{
                                    color: '#14171A',
                                    fontSize: 16,
                                    fontFamily: 'Oxygen-Regular',
                                    paddingVertical: 2
                                }}>{formatDate(new Date(profile.birthday))}</Text>
                            </View>
                            <View style={{display: "flex", flexDirection: "row"}}>
                                <TouchableOpacity style={{display: "flex", flexDirection: "row"}} onPress={() => {
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
                                    }}>{subscribes.length} </Text>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Bold',
                                        paddingVertical: 2
                                    }}>Subscriptions</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{display: "flex", flexDirection: "row", paddingLeft: 15}}
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
                                    }}>{subscribers.length} </Text>
                                    <Text style={{
                                        color: '#14171A',
                                        fontSize: 16,
                                        fontFamily: 'Oxygen-Bold',
                                        paddingVertical: 2
                                    }}>Subscribers</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View>
                        <View
                            style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <TouchableOpacity onPress={() => {
                                setEventType(0);
                                eventInfo();
                            }}><Text style={eventType === 0 ? styles.nav : styles.navChoosed}>Organized
                                events</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setEventType(1);
                                eventInfo();
                            }}><Text style={eventType === 0 ? styles.navChoosed : styles.nav}>Visited
                                events</Text></TouchableOpacity>
                        </View>


                        <View style={{paddingHorizontal: 10}}>
                            {eventInfoData.length === 0 ?
                                <View style={{display: 'flex', alignItems: "center", paddingTop: 10}}><Text style={{
                                    color: 'rgba(20,23,26,0.39)',
                                    fontSize: 20,
                                    fontFamily: 'Oxygen-Bold'
                                }}>Nothing found</Text></View> :
                                <View>
                                    {eventInfoData.map(a => <TouchableOpacity activeOpacity={0.8} key={a.id}
                                                                              onPress={() =>
                                                                                  props.navigation.navigate('EventDetails', {
                                                                                      postId: a.id,
                                                                                      userId: a.userId,
                                                                                      postText: a.postText,
                                                                                      pic: a.pic,
                                                                                      visitors: a.visitors,
                                                                                      postTitle: a.postTitle
                                                                                  })}><View style={{
                                        marginBottom: 10,
                                        alignItems: 'center',
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'lightgrey'
                                    }}>
                                        <Text style={{
                                            color: '#14171A',
                                            fontSize: 20,
                                            fontFamily: 'Oxygen-Regular'
                                        }}>{a.postTitle}</Text>
                                        {a.pic[0] != null && <Image
                                            style={{width: '100%', height: 200, borderRadius: 8}}
                                            source={{uri: a.pic[0]}}
                                        />}
                                        <Text style={{
                                            color: '#14171A',
                                            fontSize: 15,
                                            fontFamily: 'Oxygen-Regular'
                                        }}>{a.postText.substr(0, 120) + '...'}</Text>
                                        <Text>{a.id}</Text>
                                    </View></TouchableOpacity>)}
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    navChoosed: {
        color: 'rgba(20,23,26,0.73)',
        fontSize: 18,
        fontFamily: 'Oxygen-Bold',
        paddingTop: 5
    },
    nav: {
        color: '#009788',
        fontSize: 18,
        fontFamily: 'Oxygen-Bold',
        paddingTop: 5,
        borderTopWidth: 2,
        borderTopColor: '#009788'
    }
});

let mapStateToProps = (state) => ({
    cur_us_id: state.appReducer.cur_us_id,
    userProfileBar: state.appReducer.userProfileBar
})

export default connect(mapStateToProps, {})(UserProfile);

