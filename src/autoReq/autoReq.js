import React from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        background:'#bbb',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));
const AutoReq = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Paper >
                    Таблиці
                </Paper>
                <Paper >
                    поля
                </Paper>
                <Paper >
                    Групування
                </Paper>
                <Paper >
                    Join
                </Paper>
            </div>
        </div>
    );
};

export default AutoReq;