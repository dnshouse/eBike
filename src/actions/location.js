import {LOCATION_UPDATED} from './types';

export const locationUpdated = (currentLocation) => {
    return {
        type: LOCATION_UPDATED,
        payload: currentLocation,
    }
};