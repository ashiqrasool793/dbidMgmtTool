import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { getThemeProps } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function rand() {
    return Math.round(Math.random() * 10) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
        color: 'white',
        borderColor: 'white'
    },
    button1: {
        margin: theme.spacing(2),
        color: 'white',
        borderColor: 'green',
        borderWidth: '3px'

    },
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [textError, setTextError] = React.useState(false);
    const [teamName, setTeamName] = React.useState('');


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTeamName('');
        setOpen(false);
    };

    const handleOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const onNameChange = (name) => {
        setTeamName(name);
    };

    const addTeam = () => {
        if (teamName === '' || teamName === null) {
            setTextError(true)
        }
        else {
            props.addTeam(teamName)
            handleClose()
        }
    }

    const deleteTeam = () => {
        console.log(props.tableKey + "HAHAHA")
            props.deleteTeam(props.tableKey, props.tableName)
            handleClose1()
    }


    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="secondary" className={classes.button1}>
                Add team
        </Button>
            <Button onClick={handleOpen1} variant="outlined" color="secondary" className={classes.button}>
                Delete Team
      </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="outlined-basic"
                                className={classes.textField}
                                label="Team Name"
                                margin="normal"
                                variant="outlined"
                                error={textError}
                                onChange={(e) => { onNameChange(e.target.value) }}
                            />
                            <Button onClick={addTeam} variant="contained" color="secondary" className={classes.button}>
                                Add team
        </Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this team?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete the team and its members
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteTeam} color="secondary" autoFocus>
                        Yes, Please Delete
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
