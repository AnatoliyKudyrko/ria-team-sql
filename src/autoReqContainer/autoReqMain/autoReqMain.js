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

const AutoReqMain = (props) => {
    const classes = useStyles();
    const [tableName,setTableName] = useState('slon.facts');
    const [fieldArray,setFieldArray] = useState([]);
    const [checkedTable,setCheckedTable] = useState(false);
    const dataActiveField = useSelector(state=>state.select.dataActiveField);
    const tableActive = useSelector(state=>state.select.activeNameTable);
    const dispatch = useDispatch();

    useEffect(()=>{
        fieldArray.length !== 0 ? setCheckedTable(true): setCheckedTable(false)
    },[fieldArray])

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
    return (
        <div>
            <Filter table = {tableName} field={fieldArray}  />
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                     <Paper>
                        <span> Таблиці</span>
                    <SelectTable getTableName={getTableName} checkedTable={checkedTable} />
                     </Paper>
                    </Grid>
                    <Grid item xs={2}>
                     <Paper>
                        <span> Поля</span>
                    <SelectField getFieldName={getFieldName} delFieldName={delFieldName} />
                     </Paper>
                    </Grid>
                    {
                        dataActiveField.length !== 0 ? <MoreParam dataActiveField={dataActiveField} table = {tableName} /> : null
                    }
                </Grid>
            </div>
            <AutoViewReq table = {tableActive} field={dataActiveField} viewTabel={props.viewTable} />

        </div>
    );
}

const MoreParam =({dataActiveField,table})=>{
    return (
        <>
        <Grid item xs={6}>
            <Paper>
                <span>Добавлення функцій</span>
                <GroupReq dataActiveField={dataActiveField} table={table} />
            </Paper>
        </Grid>
    <Grid item xs={2}>
        <Paper>
            <span>Групування та ліміт</span>
            <OrderReq dataActiveField={dataActiveField} />
        </Paper>
    </Grid>
        </>
    )
}

export default AutoReqMain;