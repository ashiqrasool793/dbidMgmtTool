import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ExampleTable from '../componentsTask/exampleTable';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ModalInput from './modalInput';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    color: 'white'
  },
  indicator: {
    backgroundColor: 'white',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'white',
      opacity: 1,
    },
    '&$selected': {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: 'white',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: '#2e1534',
  },
  demo2: {
    backgroundColor: 'rgb(43,182,170)',
    background: 'radial-gradient(circle, rgba(43,182,170,1) 49%, rgba(14,1,1,1) 94%)',
    borderRadius: '5px',
    boxShadow: '7px 9px 13px -5px rgba(0,0,0,0.47) '
  },
  button: {
    margin: theme.spacing(1),
    color: 'white',
    borderColor: 'white'
  },
  input: {
    display: 'none',
  },
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTeam = (teamName) => {
    props.addTeam(teamName)
}

const deleteTeam = (teamName) => {
  props.deleteTeam(teamName)
}
let tableName = props.teamNames.map(a => a.name);
let tableKey = props.teamNames.map(a => a.key)


  return (
    <div className={classes.root}>
      <div className={classes.demo2}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          {props.teamNames.map((teamName, idx) => {
            return (
              <AntTab label={teamName.name} />
            )
          })}

          {console.log("TableName" + tableName[value])}

        
        <ModalInput tableName={tableName[value]} tableKey={tableKey[value]} deleteTeam={deleteTeam} addTeam={addTeam}/>
      

        </AntTabs>
        {props.teamList.map((team, idx) => {
          let tableName = props.teamNames.map(a => a.name);
          return (
            <TabPanel value={value} index={idx}>
              <ExampleTable deleteMember={props.deleteMember} updateMember={props.updateMember} onAddRow={props.onAddRow} tableName={tableName[idx]} data={team} />
            </TabPanel>
          )
        })}

      </div>
    </div>
  );
}
