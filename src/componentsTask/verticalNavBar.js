import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExampleTable from './exampleTable';
import ModalInput from './modalInput';

import Button from '@material-ui/core/Button';


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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
        flexShrink: 0,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
        minWidth:'150px'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    // let tableName = props.teamNames.map(a => a.name);

    const handleChange = (event, newValue, teamName) => {
        setValue(newValue);
    };

    const addTeam = (teamName) => {
        props.addTeam(teamName)
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {props.teamNames.map((teamName, idx) => {
                    return (
                        <Tab label={teamName.name} {...a11yProps(idx)} />
                    )
                })}
                <ModalInput addTeam={addTeam}/>
            </Tabs>
            {props.teamList.map((team, idx) => {
                    let tableName = props.teamNames.map(a => a.name);
                    if(props.isFetching) {
                        return (
                            <h1>Loading..</h1>
                        )
                    }
                    return (
                        <TabPanel value={value} index={idx}>
                            <ExampleTable onAddRow={props.onAddRow} tableName={tableName[idx]} data={team} />
                        </TabPanel>
                    )
            })}
            
        </div>
    );
}
