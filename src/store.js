import {combineReducers, createStore} from 'redux';
import bluetoothReducer from './reducers/bluetoothReducer';

const configureStore = () => {
    return createStore(combineReducers({
        bluetooth: bluetoothReducer
    }));
};

export default configureStore;