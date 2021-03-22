import React, {useState} from 'react';
import {Button, ButtonGroup, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import io from "socket.io-client";
import {FetchDataSelect} from "../../redux/action/action";
import {SERVER} from "../../dal/connectService";



const useStyles = makeStyles((theme) => ({
    textarea: {
        width:'70%'
    },
    centerV:{
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    text:{
        width:'50%',
        marginTop:'10px',
        padding:'15px',
        height:'100%'
    },

}));
const HandReq = () => {
    const classes = new useStyles();
    const [value,setValue] = useState('');
    const dispatch = useDispatch();
    const handleChange = (event) =>{
        setValue(event.target.value);
    }

    const handleSubmit = ()=> {
        const socket = io(SERVER);
        socket.emit("reqData", value, (err, res) => {
            dispatch(FetchDataSelect({
                columns:res.columns,
                rows:res.rows
        }
            ))
        });
    }
    return (
        <div className={classes.centerV}>
            <TextField
                id="filled-multiline-flexible"
                multiline
                value={value}
                onChange={handleChange}
                placeholder="Запит"
                variant="outlined"
                className={classes.text}
            />
            {
                value !== "" ?
                <ButtonGroup size="small" aria-label="small outlined button group" className={classes.btn} color="primary">
                    <Button onClick={handleSubmit}>виконати</Button>
                    <Button color="secondary" onClick={()=>setValue('')}>очистити</Button>
                </ButtonGroup>
                    :null
            }

        </div>

);
};

export default HandReq;