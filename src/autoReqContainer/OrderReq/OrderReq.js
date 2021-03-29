import React, {useEffect, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, MenuItem} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {LoadDataGroup, LoadDataLimit, LoadDataOrder} from "../../redux/action/action";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const OrderReq = ({dataActiveField}) => {
    const classes = useStyles();
    const [groupBy, setGroupBy] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [limit, setLimit] = useState('');
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setGroupBy(event.target.value);
    }
    const handleChangeOrder = (event) => {
        setOrderBy(event.target.value);
    }
    const handleChangeLimit = (event) => {
        setLimit(event.target.value);
    };
    useEffect(()=>{
        if(groupBy !== ''){
            dispatch(LoadDataGroup(`GROUP BY ${groupBy}`))
        }
        if(orderBy !== ''){
            dispatch(LoadDataOrder(`ORDER BY ${orderBy}`))
        }
        if(limit !== ''){
            dispatch(LoadDataLimit(`LIMIT ${limit}`))
        }

    },[groupBy,orderBy,limit])

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Group by</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={groupBy}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Немає</em>
                    </MenuItem>
                    {dataActiveField.map((item,i)=><MenuItem key={i} value={item} >{item}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Order by</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={orderBy}
                    onChange={handleChangeOrder}
                >
                    <MenuItem value="">
                        <em>Немає</em>
                    </MenuItem>
                    {dataActiveField.map((item,i)=><MenuItem key={i} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Limit</InputLabel>
                <Select
                    value={limit}
                    onChange={handleChangeLimit}
                >
                    <MenuItem value="">
                        <em>Немає</em>
                    </MenuItem>
                    <MenuItem value='25'>25</MenuItem>
                    <MenuItem value='50'>50</MenuItem>
                    <MenuItem value='100'>100</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default OrderReq;