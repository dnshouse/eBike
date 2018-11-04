import {STATUS_UPDATED} from './types';

export const statusUpdated = (currentStatus) => {
    return {
        type: STATUS_UPDATED,
        payload: currentStatus,
    }
};