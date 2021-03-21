import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Checkbox, FormControlLabel, InputLabel, ListSubheader, Radio, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    flex:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    }
}));
const Filter = () => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
         <div>
             <Typography variant="h6" component="h2">
                 Полярні запити
             </Typography>
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Фільтрація по даті</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <ListSubheader>Запити</ListSubheader>
                    <MenuItem value={'Кількість автомобілів'}>Кількість автомобілів</MenuItem>
                    <MenuItem value={'Кількість юзерів'}>Кількість юзерів</MenuItem>
                    <MenuItem value={'Кількість юзерів за парметром'}>
                        Кількість юзерів за парметром
                    </MenuItem>
                    <ListSubheader>Дата</ListSubheader>
                </Select>
                <div>
                    <Radio
                        checked={selectedValue === 'a'}
                        onChange={handleChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    <Radio
                        checked={selectedValue === 'd'}
                        onChange={handleChange}
                        value="d"
                        color="default"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'D' }}
                    />
                </div>
            </FormControl>
        </div>
         </div>
    );
};

export default Filter;