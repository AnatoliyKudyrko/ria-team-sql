import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Checkbox, FormHelperText, InputLabel, MenuItem} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const GroupReq = ({dataActiveField}) => {
    const [activeField, setActiveField] = useState([]);
    return (
        <div>
            <Autocomplete
                multiple
                id="multiple-limit-tags"
                options={dataActiveField}
                getOptionLabel={(option) => option}
                onChange={(event, value) => setActiveField(()=>[...value])}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Виберіть поля" />
                )}
            />
            {activeField.length !== 0 ? activeField.map(item=><GroupReqItem name={item} /> ): null }
        </div>
    );
};

const GroupReqItem = ({name})=>{
    const classes = useStyles();
    const [fun, setFun] = useState('');
    const handleChange = (event) => {
        setFun(event.target.value);
    }
    useEffect(()=>{
        console.log(fun)
    })
    return (
        <ListItem>
            <ListItemText primary={name}  />
            <div>
                <TextField size='small' label="=" color="secondary" style={{width: "70px",marginRight:'10px'}} />
                <TextField size='small' label="<" color="secondary" style={{width: "70px",marginRight:'10px'}} />
                <TextField size='small' label=">" color="secondary" style={{width: "70px",marginRight:'10px'}} />
                <TextField size='small' label="<>" color="secondary" style={{width: "70px",marginRight:'10px'}} />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Функції</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={fun}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>Немає</em>
                        </MenuItem>
                        <MenuItem value={'WHERE'}>WHERE</MenuItem>
                        <MenuItem value={'Count'}>COUNT</MenuItem>
                        <MenuItem value={'SUM'}>SUM</MenuItem>
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'AVG'}>AVG</MenuItem>
                        <MenuItem value={'MIN'}>MIN</MenuItem>
                        <MenuItem value={'MAX'}>MAX</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </ListItem>
    )
}




export default GroupReq;