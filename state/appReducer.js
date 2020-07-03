import {getcurDUsers, getCurUsD, getUserDialog} from "../api/api";

const SET_SOCKET = 'tariff/SET_SOCKET';
const SET_CUR_DIALOGS_USER = 'tariff/SET_CUR_DIALOGS_USER';
const SET_CUR_DIALOG_USERS = 'tariff/SET_CUR_DIALOG_USERS';
const SETTT_USER_DIALOG = 'tariff/SETTT_USER_DIALOG';
const SET_DIALOG_NAME = 'tariff/SET_DIALOG_NAME';
const SET_USER_ID = 'tariff/SET_USER_ID';
const SET_NEW_LST_MSG = 'tariff/SET_NEW_LST_MSG';
const SET_MARKER = 'tariff/SET_MARKER';
const SET_CUR_DIALOG_ID = 'tariff/SET_CUR_DIALOG_ID';
const SET_USER_COORD = 'tariff/SET_USER_COORD';
const SET_LAST_POST = 'tariff/SET_LAST_POST';
const SET_EVENT_DATA = 'tariff/SET_EVENT_DATA';
const ADD_NEW_EVENT_DATA = 'tariff/ADD_NEW_EVENT_DATA';

let initialState = {
    dialogList: [
        {nickname: 'Alex', lastMsg: 'some text'},
        {nickname: 'Lev', lastMsg: 'some text2'},
        {nickname: 'Test1', lastMsg: 'some text1'},
        {nickname: 'Test2', lastMsg: 'some text3'},
        {nickname: 'Test3', lastMsg: 'some text5'},
    ],
    skt: null,
    dialogs: [],
    curdialogusers: [],
    userDialog: [],
    xxx: 555,
    dialogName: '',
    userId: null,
    marker: {},
    curDialogId: null,
    userCoord: {},
    last_post: 0,
    eventData: []
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return {
                ...state,
                skt: action.skt
            };
        case SET_EVENT_DATA:
            return {
                ...state,
                eventData: action.eventData
            };
        case ADD_NEW_EVENT_DATA:
            return {
                ...state,
                eventData: [...state.eventData, ...action.newEventData]
            };
        case SET_CUR_DIALOGS_USER:
            return {
                ...state,
                dialogs: action.dialogs
            };
        case SET_LAST_POST:
            return {
                ...state,
                last_post: action.last_post
            };
        case SET_CUR_DIALOG_USERS:
            return {
                ...state,
                curdialogusers: action.curdialogusers
            };
        case SETTT_USER_DIALOG:
            return {
                ...state,
                userDialog: action.userDialog.reverse()
            };
        case SET_DIALOG_NAME:
            return {
                ...state,
                dialogName: state.curdialogusers.filter(t => t.user_id != state.userId)[0].user_id
            };
        case SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            };
        case SET_USER_COORD:
            return {
                ...state,
                userCoord: {"latitude": state.lat, "longitude": state.long}
            };
        case SET_NEW_LST_MSG:
            return {
                ...state,
                dialogs: state.dialogs.map(d => {
                    console.log('d:', action.dlg_id);
                    if (d.dialog_id == action.dlg_id) {
                        d.last_msg = action.lst_msg
                    }
                })
            };
        case SET_MARKER:
            return {
                ...state,
                marker: action.marker
            };
        case SET_CUR_DIALOG_ID:
            return {
                ...state,
                curDialogId: action.curDialogId
            };
        default:
            return state;
    }
};

export const setMarker = (marker) => {
    return {
        type: SET_MARKER,
        marker
    }
};

export const setEventData = (eventData) => {
    return {
        type: SET_EVENT_DATA,
        eventData
    }
};

export const addNewEventData = (newEventData) => {
    return {
        type: ADD_NEW_EVENT_DATA,
        newEventData
    }
};

export const setUserCoord = (lat, long) => {
    return {
        type: SET_USER_COORD,
        lat,
        long
    }
};

export const setSocket = (skt) => {
    return {
        type: SET_SOCKET,
        skt
    }
};

export const setLastPost = (last_post) => {
    return {
        type: SET_LAST_POST,
        last_post
    }
};

export const setCurDialogsUser = (dialogs) => {
    return {
        type: SET_CUR_DIALOGS_USER,
        dialogs
    }
};

export const setCurDialogsUsers = (curdialogusers) => {
    return {
        type: SET_CUR_DIALOG_USERS,
        curdialogusers
    }
};

export const setttUserDialog = (userDialog) => {
    return {
        type: SETTT_USER_DIALOG,
        userDialog
    }
};

export const setDialogName = (dialogName) => {
    return {
        type: SET_DIALOG_NAME,
        dialogName
    }
};

export const setUserId = (userId) => {
    return {
        type: SET_USER_ID,
        userId
    }
};

export const setNewLstMsg = (dlg_id, lst_msg) => {
    return {
        type: SET_NEW_LST_MSG,
        dlg_id,
        lst_msg
    }
};

export const setCurDialogId = (curDialogId) => {
    return {
        type: SET_CUR_DIALOG_ID,
        curDialogId
    }
};

export const getCurDialogsUser = (currentUserId) => async (dispatch) => {
    console.log("1111111111111111111111")
    let response = await getCurUsD(currentUserId);
    dispatch(setCurDialogsUser(response.data))
}

export const getDUsers = (dialog_id) => async (dispatch) => {
    let response = await getcurDUsers(dialog_id)
    dispatch(setCurDialogsUsers(response.data))
}

export const setUserDialog = (dialog_id) => async (dispatch) => {
    let response = await getUserDialog(dialog_id)
    dispatch(setttUserDialog(response.data))
}


export default appReducer;
