import React, {useEffect, useState} from 'react';
import {Button, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FetchDataSelect, LoadDataHistory} from "../../redux/action/action";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";

const SERVER = "http://127.0.0.1:4000";
const useStyles = makeStyles((theme) => ({
    root: {
         display:'flex',
         justifyContent:'center',
         alignContent:'center',
        textAlign:'center',
        marginTop:'40px'

    },
    reqTitle:{
        fontSize:'18px'
    },
    btn: {
        textAlign:'center'

    },

}));
const AutoViewReq = ({table,field}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const name = useSelector(state => state.Auth.data);
    const [req, setReq] = useState('');
    const where = useSelector(state=>state.select.where)
    const funField = useSelector(state=>state.select.fieldFun)
    const group = useSelector(state=>state.select.group)
    const order = useSelector(state=>state.select.order)
    useEffect(()=>{
        setReq(`Select ${[...funField]} from ${table} ${where}`)
        console.log(req)
        console.log(group)
        console.log(order)
    },[table,field,where,funField])

    const handleSubmit =()=>{
        const socket = io(SERVER);
        socket.emit("reqData", `${req} LIMIT 1000`, (err, res) => {
            dispatch(FetchDataSelect({
                    columns:res.columns,
                    rows:res.rows
                }
            ))
        });

    }
    const handleSubmitHistory = ()=>{
      dispatch(LoadDataHistory({name:name.map(item=>item.first_name),reqData:req,date:new Date().toDateString()}))
    }
    return (
        <div className={classes.btn}>
            <Paper className={classes.root}>
                <p className={classes.reqTitle}>{`Запит:  ${req}`}</p>
            </Paper>
            {
                field.length !== 0 ? <Button variant="contained" onClick={handleSubmit} color="primary" >Виконати</Button> : null
            }
            <Button variant="contained" onClick={handleSubmitHistory} color="primary" >Зберегти</Button>
        </div>
    );
};

export default AutoViewReq;