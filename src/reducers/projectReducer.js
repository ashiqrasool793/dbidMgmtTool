import { FETCH_PROJECTINFO } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PROJECTINFO:
            return action.payload;
        default:
            return state;
    }
};