import React from 'react';
import {Box, Divider, FormControl, InputLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SelectContainer} from "../selectContainer/selectContainer";
import {useSelector} from "react-redux";
import SelectField from "../SelectField/SelectField";
import {Select} from "../redux/reducers/select";

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
    const data = useSelector(state => state.select);

    return (
        <div>
            <div className={classes.root}>
                <Paper>
                    <span>tab</span>
                    <hr/>
                    <SelectContainer />
                </Paper>
                <Paper>
                    <span>Filed</span>
                    <hr/>
                    <SelectField />
                </Paper>
                <Paper >
                    sadas
                </Paper>
            </div>
        </div>
    );
};

export default AutoReq;