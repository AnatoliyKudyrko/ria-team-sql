import React, {useState} from 'react';
import {Box, Divider, FormControl, InputLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SelectContainer} from "../selectContainer/selectContainer";
import {useSelector} from "react-redux";
import SelectField from "../SelectField/SelectField";
import {Select} from "../redux/reducers/select";
import AutoViewReq from "../autoViewReq/autoViewReq";

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
    const [tableName,setTableName] = useState('slon.facts');
    const [fieldArray,setFieldArray] = useState([]);
    const getTableName = (name)=>{
        setTableName(name);
    }
    const getFieldName = (name)=>{
        setFieldArray(item => [...item, name])
    }
    return (
        <div>
            <div className={classes.root}>
                <Paper >
                     <div className={classes.block}>
                        <span> Таблиці</span>
                     </div>
                    <SelectContainer getTableName={getTableName}/>
                </Paper>
                <Paper>
                    <div className={classes.block}>
                        <span> Поля</span>
                    </div>
                    <SelectField getFieldName={getFieldName}/>
                </Paper>
                <Paper >
                    <div className={classes.block}>
                        <span> Групування</span>
                    </div>
                </Paper>
            </div>
            <AutoViewReq table = {tableName} field={fieldArray} />
        </div>
    );
};

export default AutoReq;