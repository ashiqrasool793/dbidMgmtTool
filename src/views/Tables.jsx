import React from "react";
import {
  addTeamMember,
  fetchTeamInfo,
  addTeam,
  fetchTeams,
  updateTeamMember,
  deleteMember,
  deleteTeam
} from "../actions";
import { css } from '@emotion/core';
import { connect } from "react-redux";
import ExampleTable from '../componentsTask/exampleTable';
import Tabs from '../componentsTask/tabs';
import { HashLoader } from 'react-spinners';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 25%;
    border-color: red;
`;

class Tables extends React.Component {

  constructor() {
    super()
    this.state = {
      teamList: [],
      index: 0,
    }
  }

  componentWillMount() {

    this.props.fetchTeamInfo();

  }

  onAddRow = (tableName, newMember) => {
    this.props.addTeamMember(tableName, newMember);
  }

  getTeamData = (teamName) => {
    console.log("TRIGGERED" + teamName)
    this.props.fetchTeamInfo(teamName);
  }

  addTeam = (newTeamName) => {
    console.log("NEW TEAM: " + newTeamName)
    this.props.addTeam(newTeamName)
    this.props.fetchTeamInfo()
  }

  deleteTeam = (teamKey, teamName) => {
    this.props.deleteTeam(teamKey, teamName)
    this.props.fetchTeamInfo()
  }

  updateMember = (tableName, newMemberData) => {
    this.props.updateTeamMember(tableName, newMemberData)
  }

  deleteMember = (tableName, memberData) => {
    this.props.deleteMember(tableName, memberData)
    this.props.fetchTeamInfo()
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className="content">
      <div className='sweet-loading'>
        <HashLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'red'}
          loading={this.state.loading}
        />
      </div>
      </div>
      )
    }
    else {
      return (

        <div className="content">
          <Tabs
            updateMember={this.updateMember}
            onAddRow={this.onAddRow}
            addTeam={this.addTeam}
            teamNames={this.props.teams}
            teamList={this.props.teamList}
            deleteMember={this.deleteMember}
            deleteTeam={this.deleteTeam}
          >

          </Tabs>

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

export default connect(mapStateToProps, { deleteMember, fetchTeams, addTeamMember, fetchTeamInfo, addTeam, deleteTeam, updateTeamMember })(Tables);
