import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Image,
    ActivityIndicator, AsyncStorage
} from "react-native";
import * as axios from "axios";

const UserEvents = () => {
    const [eventsData, setEventsData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        AsyncStorage.getItem('userName', (err, item) => {

            axios.post(`https://warm-ravine-29007.herokuapp.com/userevents`, {currentUserId: item})
                .then(res => {
                    setEventsData(res.data);
                    console.log(res.data)
                });
        })

    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const scroll = React.createRef();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        axios.get(`https://warm-ravine-29007.herokuapp.com/userevents`, {currentUserId: currentUser})
            .then(res => {
                setEventsData(res.data);
            });
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <View style={{display: 'flex', margin: 20}}>
            {eventsData ? <View style={{display: 'flex'}}>
                    <View style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                    </View>
                    <View>
                        {eventsData ?
                            <ScrollView ref={scroll} showsVerticalScrollIndicator={true} decelerationRate={"normal"}
                                        refreshControl={
                                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                                {eventsData.map(a => <TouchableOpacity key={a.id} onPress={() =>
                                    props.navigation.navigate('EventDetails', {
                                        postId: a.id,
                                    })}><View style={{
                                    marginBottom: 10,
                                    alignItems: 'center',
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#3C2274'
                                }}>
                                    <Text style={{color: '#3C2274', fontFamily: 'arr', fontSize: 20}}>{a.postTitle}</Text>
                                    <Image
                                        style={{width: '100%', height: 200, borderRadius: 8}}
                                        source={{uri: a.pic}}
                                    />
                                    <Text style={{fontFamily: 'georgia', color: 'darkgrey', fontSize: 15}}>{a.place}</Text>
                                    <Text>{a.postText}</Text>
                                </View></TouchableOpacity>)}
                            </ScrollView>
                            : <ActivityIndicator size="large" color="#3C2274" style={{margin: 30}}/>
                        }
                    </View>
                </View>
                : <Text style={styles.signIn}>You have not got any events yet</Text>}
        </View>
    )
};

const styles = StyleSheet.create({
    resetSignUpView: {
        display: 'flex',
        flexDirection: 'row'
    },
    signIn: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: 42,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: -0.015,

        color: '#3C2274'
    },
    container: {
        position: 'absolute',
        top: 0,
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


export default UserEvents;

