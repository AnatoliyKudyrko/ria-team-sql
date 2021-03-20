import React, {useEffect} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import io from "socket.io-client";
import {FetchDataField, FetchDataSelect} from "../redux/action/action";
import {useDispatch, useSelector} from "react-redux";
import logger from "redux-thunk";


const SERVER = "http://127.0.0.1:4000";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflow: 'scroll',
        width: '100%',
        height: '200px'
    },
    flex: {
        display: 'flex',
        flexDirection:'column'
    }
}));


const SelectField = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const data = useSelector(state => state.select.checkedData);
    const field = useSelector(state => state.select.dataField);
    const active = data.filter(i=>i.status === true).map(item=>item.name).toString();


    const getNameDB = (active) =>{
         let index = active.indexOf('.');
         let name = active.slice(0,index);
         let table = active.slice(index+1,active.length);
         return {name,table};
     }
    useEffect(()=>{
       const socket = io(SERVER);
       socket.emit("getFields", getNameDB(active).name, getNameDB(active).table,(data) => {
           dispatch(FetchDataField(data))
       })
   },[data])
    const listItems = field.map((item,i) =>
            <FormControlLabel key={i}
                control={
                    <Checkbox
                        name={item.name}
                        color="primary"
                        size='small'
                    />
                }
                label={item.name}
            />
    )
    return (
        <div className={classes.root}>
            <div className={classes.flex}>
                    {
                        listItems
                    }

            </div>
        </div>
    );
};




export default SelectField;