import {getcurDUsers, getCurUsD, getUserDialog} from "../api/api";

const SET_SOCKET = 'tariff/SET_SOCKET';
const SET_CUR_DIALOGS_USER = 'tariff/SET_CUR_DIALOGS_USER';
const SET_CUR_DIALOG_USERS = 'tariff/SET_CUR_DIALOG_USERS';
const SETTT_USER_DIALOG = 'tariff/SETTT_USER_DIALOG';
const SET_DIALOG_NAME = 'tariff/SET_DIALOG_NAME';
const SET_USER_ID = 'tariff/SET_USER_ID';

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
    userId: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return {
                ...state,
                skt: action.skt
            };
            case SET_CUR_DIALOGS_USER:
            return {
                ...state,
                dialogs: action.dialogs
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
        default:
            return state;
    }
};

export const setSocket = (skt) => {
    return {
        type: SET_SOCKET,
        skt
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
