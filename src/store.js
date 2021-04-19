import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import LoginReducer from './features/login/redux/LoginReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const reducers = combineReducers({
    login: LoginReducer
})
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


export default createStore(reducers);