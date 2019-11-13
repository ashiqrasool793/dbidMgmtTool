import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { relData } from '../releaseList';

class Releases extends Component {

  useStyles = () => makeStyles(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  render() {
    const classes = this.useStyles();

    return (
      <div className={classes.root}>
      <h2 style={{  marginLeft: '20px' }}>Releases</h2>
        {relData.map((d, idx) => {
          return (
            <ExpansionPanel key={idx} style={{ width: '50%', marginLeft: '20px', marginTop: '15px' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{fontWeight: '700'}}className={classes.heading}>{d.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                {d.projects.map((p, ix) => {
                  return (
                    <div style={{ padding: '10px' }}>
                      <Typography className={classes.heading}>{'Project Name: ' + p.name}</Typography>
                      <Typography className={classes.body}>{'Horizontal Lead: ' + p.horizontalLead}</Typography>
                      <Typography className={classes.body}>{'Release Manager: ' + p.releaseManager}</Typography>
                      <Typography className={classes.body}>{'Deadline: ' + p.deadline}</Typography>
                      <Typography className={classes.body}>{'iOS: ' + p.ios.map(d => { return " " + d.name })}</Typography>
                      <Typography className={classes.body}>{'Android: ' + p.android.map(d => { return " " + d.name })}</Typography>
                      <Typography className={classes.body}>{'React: ' + p.react.map(d => { return " " + d.name  })}</Typography>
                      <Typography className={classes.body}>{'Kony: ' + p.kony.map(d => { return " " + d.name })}</Typography>
                    </div>
                  )
                })}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </div>
    );
  }
}

export default Releases;

