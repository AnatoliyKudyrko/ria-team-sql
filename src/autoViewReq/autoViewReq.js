import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FetchDataSelect} from "../redux/action/action";
import io from "socket.io-client";
import {useDispatch} from "react-redux";

const SERVER = "http://127.0.0.1:4000";
const useStyles = makeStyles((theme) => ({
    root: {
         display:'flex',
         justifyContent:'center',
         alignContent:'center',
        textAlign:'center'

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
    const [req, setReq] = useState('');
    useEffect(()=>{
        setReq(`Select ${field} from ${table}`)
    },[table,field])

    const handleSubmit =()=>{
        const socket = io(SERVER);
        socket.emit("req", req, (err, res) => {
            dispatch(FetchDataSelect({
                    columns:res.columns,
                    rows:res.rows
                }
            ))
        });
    }
    return (
        <div className={classes.btn}>
            <Paper className={classes.root}>
                <p className={classes.reqTitle}>{req}</p>
            </Paper>
            <Button onClick={handleSubmit} color="primary" >виконати</Button>
        </div>
    );
};

export default AutoViewReq;