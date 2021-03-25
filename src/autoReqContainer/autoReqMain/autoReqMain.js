import React, {useEffect, useState} from 'react';
import {Button, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SelectTable} from "../selectTable/selectTable";
import SelectField from "../SelectField/SelectField";
import AutoViewReq from "../autoViewReq/autoViewReq";
import Filter from "../filter/filter";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {FetchDataActiveField} from "../../redux/action/action";
import GroupReq from "../groupReq/groupReq";
import OrderReq from "../OrderReq/OrderReq";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:'10px'
    },
    block:{
        textAlign:'center',
        fontSize:'18px',
        color:'#fff'
    },
    flex:{
        display:'flex',
        width:'50%'
    },
    blockTwo:{
        background:'#e57373',
        textAlign:'center',
        fontSize:'18px',
        color:'#fff',
        width:'300px'
    },
}));

const AutoReqMain = () => {
    const classes = useStyles();
    const [tableName,setTableName] = useState('slon.facts');
    const [fieldArray,setFieldArray] = useState([]);
    const [checkedTable,setCheckedTable] = useState('');
    const dataActiveField = useSelector(state=>state.select.dataActiveField);


    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(FetchDataActiveField(fieldArray))
    },[fieldArray])

    const getTableName = (name)=>{
        setTableName(name);
    }
    const getFieldName = (name)=>{
        setFieldArray(item => [...item, name])
    }
    const delFieldName = (name)=>{
        setFieldArray(item=>[...item.filter(item => item !== name)])
    }

    const JoinTable = ()=>{
        let req = `Select ${[...fieldArray]} from ${tableName}`;

    }
    return (
        <div>
            {
                dataActiveField.length !== 0 ?
                <Button color='primary' size='small' onClick={()=>JoinTable()}>Об'єднати з </Button> : null
            }
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                     <Paper>
                        <span> Таблиці</span>
                    <SelectTable getTableName={getTableName} />
                     </Paper>
                    </Grid>
                    <Grid item xs={2}>
                     <Paper>
                        <span> Поля</span>
                    <SelectField getFieldName={getFieldName} delFieldName={delFieldName} />
                     </Paper>
                    </Grid>
                    {
                        dataActiveField.length !== 0 ? <MoreParam dataActiveField={dataActiveField} /> : null
                    }
                </Grid>
            </div>
            <AutoViewReq table = {tableName} field={fieldArray} />
            <Filter table = {tableName} field={fieldArray}  />
        </div>
    );
}

const MoreParam =({dataActiveField})=>{
    return (
        <>
        <Grid item xs={6}>
            <Paper>
                <GroupReq dataActiveField={dataActiveField} />
            </Paper>
        </Grid>
    <Grid item xs={2}>
        <Paper>
            <OrderReq dataActiveField={dataActiveField} />
        </Paper>
    </Grid>
        </>
    )
}

export default AutoReqMain;