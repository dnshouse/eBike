import {combineReducers, createStore} from 'redux';
import bluetoothReducer from './reducers/bluetoothReducer';
import locationReducer from './reducers/locationReducer';

const configureStore = () => {
    return createStore(combineReducers({
        bluetooth: bluetoothReducer,
        location: locationReducer
    }));
};

export default configureStore;