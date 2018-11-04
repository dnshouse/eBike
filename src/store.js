import {combineReducers, createStore} from 'redux';
import bluetoothReducer from './reducers/bluetoothReducer';
import locationReducer from './reducers/locationReducer';
import statusReducer from './reducers/statusReducer';

const configureStore = () => {
    return createStore(combineReducers({
        bluetooth: bluetoothReducer,
        location: locationReducer,
        status: statusReducer,
    }));
};

export default configureStore;