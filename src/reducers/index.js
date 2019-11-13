import { combineReducers } from "redux";

import projectDetails from "./projectReducer";
import teamDetails from "./teamReducer";
import authDetails from "./authReducer";

export default combineReducers({
    projectDetails,
    teamDetails,
    authDetails
});