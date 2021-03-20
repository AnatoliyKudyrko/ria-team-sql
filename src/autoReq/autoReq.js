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
        background:'rgba(0, 0, 0, 0.04)',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(30),
        },
    },
    block:{
        background:'#e57373',
        textAlign:'center',
        fontSize:'18px',
        color:'#fff'
    }

}));
const AutoReq = () => {
    const classes = useStyles();
    const data = useSelector(state => state.select);

    return (
        <div>
            <div className={classes.root}>
                <Paper >
                     <div className={classes.block}>
                        <span> Таблиці</span>
                     </div>
                    <SelectContainer />
                </Paper>
                <Paper>
                    <div className={classes.block}>
                        <span> Поля</span>
                    </div>
                    <SelectField />
                </Paper>
                <Paper >
                    <div className={classes.block}>
                        <span> Групування</span>
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default AutoReq;