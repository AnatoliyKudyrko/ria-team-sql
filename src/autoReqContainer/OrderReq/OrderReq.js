import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, MenuItem} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import {makeStyles} from "@material-ui/core/styles";

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
    const handleChange = (event) => {
        setGroupBy(event.target.value);
    }
    const handleChangeOrder = (event) => {
        setOrderBy(event.target.value);
    }
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
                    {dataActiveField.map((item,i)=><MenuItem key={i} value={item}>{item}</MenuItem>)}
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
        </div>
    );
};

export default OrderReq;