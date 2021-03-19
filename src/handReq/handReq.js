import React, {useEffect, useState} from 'react';
import {Button, TextareaAutosize} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";
import {FetchDataSelect} from "../redux/action/action";

const SERVER = "http://127.0.0.1:4000";


const useStyles = makeStyles((theme) => ({
    textarea: {
        width:'70%'
    },
    centerV:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        marginLeft:'20px'
    }

}));
const HandReq = () => {
    const classes = new useStyles();
    const [value,setValue] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{
    },[])
    const handleChange = (event) =>{
        setValue(event.target.value);
    }
    const handleSubmit = (event)=> {
        console.log(value);
        console.log(typeof value)
        alert(value);
        const socket = io(SERVER);
        new Promise((resolve, reject) => {
            socket.emit("req", value, (err, res) => {
                console.log(res)
                dispatch(FetchDataSelect(res.meta))
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
            event.preventDefault();
        })
    }
    return (
        <div className={classes.centerV}>
            <TextareaAutosize
                rowsMax={100}
                placeholder="введіть запит"
                className={classes.textarea}
                onChange={handleChange}
            />
            <Button variant="contained" color="primary" className={classes.btn} onClick={handleSubmit}>
                ОК
            </Button>
        </div>
    );
};

export default HandReq;