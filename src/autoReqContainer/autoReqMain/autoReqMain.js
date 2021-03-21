import React, {useState} from 'react';
import {Checkbox, FormControlLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SelectTable} from "../selectTable/selectTable";
import SelectField from "../SelectField/SelectField";
import AutoViewReq from "../autoViewReq/autoViewReq";
import Filter from "../filter/filter";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'flex-start',
        margin:'20px',
        background:'rgba(0, 0, 0, 0.02)',
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
    },
    flex:{
        display:'flex',
        width:'50%'
    }

}));
const AutoReqMain = () => {
    const classes = useStyles();
    const [tableName,setTableName] = useState('slon.facts');
    const [fieldArray,setFieldArray] = useState([]);
    const getTableName = (name)=>{
        setTableName(name);
    }
    const getFieldName = (name)=>{
        setFieldArray(item => [...item, name])
    }
    const delFieldName = (name)=>{
        setFieldArray(item=>[...item.filter(item => item !== name)])
    }
    return (
        <div>
            <div className={classes.root}>
                <Paper >
                     <div className={classes.block}>
                        <span> Таблиці</span>
                     </div>
                    <SelectTable getTableName={getTableName}/>
                </Paper>
                <Paper>
                    <div className={classes.block}>
                        <span> Поля</span>
                    </div>
                    <SelectField getFieldName={getFieldName} delFieldName={delFieldName} />
                </Paper>
            </div>
            <AutoViewReq table = {tableName} field={fieldArray} />
            <Filter table = {tableName} field={fieldArray}  />
        </div>
    );
}

export default AutoReqMain;