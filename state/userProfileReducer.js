import {getcurDUsers, getCurUsD, getTown, getUserDialog, getUserProfileBar, userProfileAPI} from "../api/api";

const SET_SUBSCRIBES = 'tariff/SET_SUBSCRIBES';
const SET_SUBSCRIBERS = 'tariff/SET_SUBSCRIBERS';
const SET_PROFILE_PIC = 'tariff/SET_PROFILE_PIC';
const SET_BACKGR_PIC = 'tariff/SET_BACKGR_PIC';
const SET_PROFILE = 'tariff/SET_PROFILE';

let initialState = {
    subscribes: [],
    subscribers: [],
    profile_pic: '',
    backgroundPic: '',
    profile: []
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIBES:
            return {
                ...state,
                subscribes: action.subscribes
            };
        case SET_SUBSCRIBERS:
            return {
                ...state,
                subscribers: action.subscribers
            };
        case SET_PROFILE_PIC:
            return {
                ...state,
                profilePic: action.profilePic
            };
        case SET_BACKGR_PIC:
            return {
                ...state,
                backgroundPic: action.backgroundPic
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        default:
            return state;
    }
};

export const setSubscribes = (subscribes) => {
    return {
        type: SET_SUBSCRIBES,
        subscribes
    }
};

export const setSubscribers = (subscribers) => {
    return {
        type: SET_SUBSCRIBERS,
        subscribers
    }
};

export const setProfilePic = (profilePic) => {
    return {
        type: SET_PROFILE_PIC,
        profilePic
    }
};

export const setBackgroundPic = (backgroundPic) => {
    return {
        type: SET_BACKGR_PIC,
        backgroundPic
    }
};

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        profile
    }
};

export const getProfile = (user_id) => async (dispatch) => {
    let response = await userProfileAPI.getUserProfile(user_id)
    dispatch(setSubscribes(response.data[0].subscribes))
    dispatch(setSubscribers(response.data[0].subscribers))
    dispatch(setProfilePic(response.data[0].profile_pic))
    dispatch(setBackgroundPic(response.data[0].background_pic))
    dispatch(setProfile(response.data[0]))
}

export default userProfileReducer;
