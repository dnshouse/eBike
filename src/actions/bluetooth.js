import {BLUETOOTH_CONNECTED, BLUETOOTH_DISABLED, BLUETOOTH_ENABLED} from './types';

export const bluetoothEnabled = (devices) => {
    return {
        type: BLUETOOTH_ENABLED,
        payload: devices,
    }
};

export const bluetoothDisabled = () => {
    return {
        type: BLUETOOTH_DISABLED,
    }
};

export const bluetoothConnected = () => {
    return {
        type: BLUETOOTH_CONNECTED,
    }
};
