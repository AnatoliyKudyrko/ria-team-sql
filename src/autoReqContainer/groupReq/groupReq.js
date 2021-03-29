import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { InputLabel, MenuItem} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import {DeleteDataWhereField, LoadDataFunField, LoadDataWhereField} from "../../redux/action/action";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const GroupReq = ({dataActiveField,table}) => {
    const [activeField, setActiveField] = useState([]);
    useEffect(()=>{
        console.log(activeField)
    },[activeField])
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
            {activeField.length !== 0 ? activeField.map(item=><GroupReqItem name={item} key={item} table={table}/> ): null }
        </div>
    );
};

const GroupReqItem = ({name,table})=>{
    const classes = useStyles();
    const [fun, setFun] = useState('');
    const [operator, setOperator] = useState('=');
    const [value, setValue] = useState('');
    const [type, setType] = useState(false);
    const [req,setReq] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setFun(event.target.value);
    }
    const handleChangeOperator = (event) => {
        setOperator(event.target.value);
    }
    useEffect(()=>{
        name.indexOf('Date') === -1 ?  setType(false) : setType(true)
    },[name])

    useEffect(()=>{
        if (fun !== ''){
            if(fun === 'WHERE' && value !== ''){
                dispatch(LoadDataWhereField(`${fun} ${name} ${operator} ${value}`))
            }
            if(fun !== 'WHERE'){
                    dispatch(LoadDataFunField(`,${fun}(${name})`))
                if(value === ''){
                    dispatch(DeleteDataWhereField(`${fun}(${name})`))
                }
            }
        }

    },[fun,value,operator,name])

    const handleChangeValue = (event) => {setValue(event.target.value)};

    return (
        <ListItem style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <ListItemText primary={name}  />
            {
                fun === 'WHERE' ?
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={operator}
                                onChange={handleChangeOperator}
                            >
                                <MenuItem value={'='}> {'='} </MenuItem>
                                <MenuItem value={'<'}> {'<'} </MenuItem>
                                <MenuItem value={'>'}> {'>'} </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField  type={type ? 'date' : ''} onChange={handleChangeValue} color="secondary" value={value} style={{marginRight:'10px'}} />
                    </div> : null
            }
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