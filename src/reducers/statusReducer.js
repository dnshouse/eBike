import {STATUS_UPDATED} from '../actions/types';

const initialState = {
    maxSpeed: 30,
    batteryLevel: 0,
    tripDistance: 0,
    odoMiles: 0,
    currentSpeed: 0,
    avgSpeed: 0,
};

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATUS_UPDATED:

            const {
                avgSpeed,
                batteryLevel,
                currentSpeed,
                odoMiles,
                status,
                tripDistance
            } = action.payload;

            return {
                ...state,
                avgSpeed,
                batteryLevel,
                currentSpeed,
                odoMiles,
                status,
                tripDistance
            };

        default:
            return state;
    }
};

export default statusReducer;