import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./state/appReducer";
import thunkMiddleware from "redux-thunk"
import userProfileReducer from "./state/userProfileReducer"; //import thunkmiddleware

let reducers = combineReducers({
    appReducer: appReducer,
    userProfileReducer: userProfileReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

window.store = store;
