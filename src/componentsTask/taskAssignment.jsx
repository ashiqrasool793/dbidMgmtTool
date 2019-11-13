import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExampleTable from './exampleTable';
import { addTeamMember, fetchTeamInfo, addTeam, fetchTeams, updateTeamMember } from "../actions";
import { connect } from "react-redux";
import { teams } from "../teams"
import { team } from "../teamList"

import VeritcalBar from "./verticalNavBar"

class TaskAssignment extends Component {

    constructor() {
        super()
        this.state = {
            teamList: [],
            index: 0,        
        }  
        
    }

    componentWillMount() {
        
        /*
       
        this.props.fetchTeams();
        this.props.fetchTeamInfo(this.props.teamNames);

        */
      
       this.props.fetchTeamInfo();
    
    }

    useStyles = () => makeStyles(theme => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));

    onAddRow = (tableName, newMember) => {
        this.props.addTeamMember(tableName, newMember);
    }

    getTeamData = (teamName) => {
        console.log("TRIGGERED" + teamName)
        this.props.fetchTeamInfo(teamName);
    }

    addTeam = (newTeamName) => {
        console.log("NEW TEAM: "+ newTeamName)
        this.props.addTeam(newTeamName)
        this.props.fetchTeamInfo()
    }

    updateMember = (tableName, newMemberData) => {
        this.props.updateTeamMember(tableName, newMemberData)
    }

    render() {
        if (this.props.isFetching) {
            return <h1>Loading...</h1>
        }
        else {
            console.log("TRIGGERED" + this.props.teamList)

            return (
                <div>
                    <VeritcalBar updateMember={this.updateTeamMember} addTeam={this.addTeam} isFetching={this.props.isFetching} teamNames={this.props.teams} onAddRow={this.onAddRow} teamList={this.props.teamList}>
                    </VeritcalBar>
                </div>
            );
        }
        }
    }



const mapStateToProps = state => {
    return {
        isFetching: state.teamDetails.isFetching,
        teamList: state.teamDetails.teamList,
        teams: state.teamDetails.teams
    };
};

export default connect(mapStateToProps, { fetchTeams, addTeamMember, fetchTeamInfo, addTeam, updateTeamMember })(TaskAssignment);

