import React, {useEffect} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import io from "socket.io-client";
import {FetchDataSelect} from "../redux/action/action";


const SERVER = "http://127.0.0.1:4000";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflow: 'scroll',
        width: '100%',
        height: '200px'
    },
    formControl: {
        margin: theme.spacing(3),
    }
}));
const SelectField = () => {
    const classes = useStyles();
    const slon = 'slon';
    const table = 'slon.facts';
   useEffect(()=>{
       const socket = io(SERVER);
       socket.emit("getFields", slon,table,( res) => {
           console.log(res);
       })
   })
    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox  name="gilad" />}
                        label="Gilad Gray"
                    />
                    <FormControlLabel
                        control={<Checkbox  name="jason" />}
                        label="Jason Killian"
                    />
                    <FormControlLabel
                        control={<Checkbox  name="antoine" />}
                        label="Antoine Llorca"
                    />
                    <FormControlLabel
                        control={<Checkbox  name="gilad" />}
                        label="Gilad Gray"
                    />
                    <FormControlLabel
                        control={<Checkbox  name="jason" />}
                        label="Jason Killian"
                    />
                    <FormControlLabel
                        control={<Checkbox  name="antoine" />}
                        label="Antoine Llorca"
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
};

export default SelectField;