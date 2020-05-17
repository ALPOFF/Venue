import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./state/appReducer";
import thunkMiddleware from "redux-thunk" //import thunkmiddleware

let reducers = combineReducers({
    appReducer: appReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
