import {BLUETOOTH_CONNECTED, BLUETOOTH_DISABLED, BLUETOOTH_ENABLED} from '../actions/types';

const initialState = {
    bluetoothDevices: [],
    isBluetoothEnabled: false,
    isBluetoothConnected: false,
};

const bluetoothReducer = (state = initialState, action) => {
    switch (action.type) {
        case BLUETOOTH_ENABLED:
            return {
                ...state,
                bluetoothDevices: action.payload,
                isBluetoothEnabled: true,
            };
        case BLUETOOTH_DISABLED:
            return {
                ...state,
                bluetoothDevices: [],
                isBluetoothEnabled: false,
            };
        case BLUETOOTH_CONNECTED:
            return {
                ...state,
                isBluetoothConnected: true,
            };
        default:
            return state;
    }
};

export default bluetoothReducer;