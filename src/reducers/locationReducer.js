import {LOCATION_UPDATED} from '../actions/types';
import haversine from "haversine";
import moment from 'moment';

const initialState = {
    since: new Date(),
    currentLocation: {
        coords:{ accuracy: 0, altitude: 0, heading: 0, latitude: null, longitude: null, speed: 0 },
        timestamp: 0
    },
    routeCoordinates: [],
    currentSpeed: 0,
    avgSpeed: 0,
    tripDistance: 0,
    odoMiles: 0,
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_UPDATED:

            const speed = ((action.payload.coords.speed * 60 * 60) / 1000) * 0.621371;
            const currentSpeed = speed > 1.5 ? speed :0;

            let tripDistance = 0;
            if (state.currentLocation.coords.latitude !== null && state.currentLocation.coords.longitude !== null) {
                tripDistance = ((haversine({
                    latitude: state.currentLocation.coords.latitude,
                    longitude: state.currentLocation.coords.longitude
                }, {
                    latitude: action.payload.coords.latitude,
                    longitude: action.payload.coords.longitude
                }, {
                    unit: 'meter'
                }) / 1000) * 0.621371) || 0;
            }

            const now = new Date();
            const upTimeHours = ((now.getTime() - state.since.getTime())/1000)/60/60;
            const avgSpeed = tripDistance !== 0 ? (state.tripDistance + tripDistance) / upTimeHours : 0;
            const odoMiles = state.odoMiles + tripDistance;

            return {
                ...state,
                currentLocation: action.payload,
                // routeCoordinates: state.routeCoordinates.concat({
                //     latitude: action.payload.coords.latitude,
                //     longitude: action.payload.coords.longitude
                // }),
                currentSpeed: currentSpeed,
                avgSpeed: avgSpeed,
                tripDistance: state.tripDistance + tripDistance,
                odoMiles: odoMiles
            };
        default:
            return state;
    }
};

export default locationReducer;