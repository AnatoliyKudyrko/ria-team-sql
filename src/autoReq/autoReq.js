import React from 'react';
import {Box, Divider, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SelectContainer} from "../selectContainer/selectContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        background:'#bbb',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(30),
        },
    },
}));
const AutoReq = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Paper>
                    <span>tab</span>
                    <hr/>
                    <SelectContainer />
                </Paper>
                <Paper >
                    поля
                </Paper>
                <Paper >
                    Групування
                </Paper>
            </div>
        </div>
    );
};

export default AutoReq;