import { FETCH_TEAMINFO, FETCH_TEAMS, LOGIN_USER, LOGOUT, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from "./types";
import { iosTeamRef, databaseRef, db, authRef } from "../config/firebase";
import teamReducer from "../reducers/teamReducer";
import moment from 'moment';

export const loginUser = (email, password ) => {
    console.log("email in 1" + email)

    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        console.log("email in " + email)

        authRef.signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => loginUserFail(dispatch, error)
            );
    };
};

export const logoutUser = ({ user }) => {
    return (dispatch) => {
        dispatch({ type: LOGOUT });

        authRef.signOut();
    };
};

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.message
    });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
};

export const addTeam = (teamName) => dispatch => {
    const teamRef = databaseRef.child('teams');
    teamRef
        .push().set({ name: teamName })

    const teamList = databaseRef.child(teamName);

};

export const deleteTeam = (tableKey, tableName) => dispatch => {
    db.ref("teams/" + tableKey + "/").remove();
    //db.ref(tableName).remove();
};

export const updateTeamMember = (teamName, memberData) => dispatch => {
    console.log("HERE UPDATING")
    const updatedData = {
        name: memberData.name,
        startDate: memberData.startDate,
        employer: memberData.startDate,
        task: memberData.task,
        project: memberData.project,
        manDays: memberData.manDays,
        completionDate: memberData.completionDate,
    }
    console.log("donexw UPDATING" + db.ref(teamName + "/" + memberData.key + "/"))

    db.ref(teamName + "/" + memberData.key + "/").set(updatedData);

}

export const deleteMember = (teamName, memberData) => dispatch => {
    db.ref(teamName + "/" + memberData.key + "/").remove();
}

export const addTeamMember = (teamName, newMember) => dispatch => {
    const teamRef = databaseRef.child(teamName);
    teamRef
        .push().set(newMember)
};

export function fetchTeams() {
    return dispatch => {
        let data1 = []
        const teamRef = databaseRef.child('teams');
        teamRef.once('value', snapshot => {
            snapshot.forEach(item => {
                let temp = { name: item.val().name, key: item.key };
                data1.push(temp);
            })
            dispatch({
                type: FETCH_TEAMS,
                payload: data1
            })
        }
        )
    }
}



export function fetchTeamInfo() {
    console.log("namestart")

    return dispatch => {
        let teamNames = []
        let data1 = []


        const teamNamesRef = databaseRef.child('teams');
        teamNamesRef.once('value', snapshot => {
            snapshot.forEach(item => {
                let temp = { name: item.val().name, key: item.key };
                teamNames.push(temp);
            })


            console.log("namestart1" + JSON.stringify(teamNames))
            let fullList = []
            teamNames.forEach((team, idx) => {
                const teamRef = databaseRef.child(`${team.name}`);
                console.log("name" + team.name)
                teamRef.once('value', snapshot => {
                    snapshot.forEach(item => {
                        console.log("KEY", item.key)
                        let temp = {
                            name: item.val().name,
                            startDate: moment(item.val().startDate, 'DD-MM-YYYY').toDate(),
                            employer: item.val().startDate,
                            task: item.val().task,
                            project: item.val().project,
                            manDays: item.val().manDays,
                            completionDate: moment(item.val().completionDate, 'DD-MM-YYYY').toDate(),
                            key: item.key
                        };
                        data1.push(temp);
                    })
                    fullList.push(data1)
                    data1 = []
                    if (fullList.length === teamNames.length) {
                        console.log("FULLLIST" + JSON.stringify(fullList) + "namestart1" + JSON.stringify(teamNames))
                        dispatch({
                            type: FETCH_TEAMINFO,
                            payload: { teamNames: teamNames, teamList: fullList }
                        })
                    }
                })
            })


        })
    }
}
