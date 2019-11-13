import { FETCH_TEAMINFO, FETCH_TEAMS } from "../actions/types";


const INITIAL_STATE = {
    isFetching: true,
    teamList: [],
    teams: []
  };

  const teamDetails = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TEAMINFO:
            return {
                ...state,
                isFetching: false,
                teamList: action.payload.teamList,
                teams: action.payload.teamNames
            };
        case FETCH_TEAMS:
            return {
                ...state,
                isFetching: false,
                teams: action.payload,
            };
        default:
            return state;
    }
  }

  export default teamDetails;
