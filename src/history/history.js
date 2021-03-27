import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import {Button, InputLabel, MenuItem} from "@material-ui/core";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
}));
function History() {
    const classes = useStyles();
    const [name, setName] = useState(10);
    const data = useSelector(state => state.history.data);
    const handleChange = (event) => {
        setName(event.target.value);
    };

    useEffect(()=>{

    },[data])
    const itemNone = (
        <ListItem>
            <ListItemText primary="Немає подій"  />
        </ListItem> )

    const itemYes = (data.map((item=>{
        return (
            <div>
                <ListItem key={item}>
                    <ListItemText primary={item.name}  />
                    <ListItemText primary={item.reqData} style={{textAlign:'left'}}/>
                    <ListItemText primary={item.date} style={{textAlign:'center'}}/>
                </ListItem>
                <Divider />
            </div>
        )
    })))

    return (
        <div>
            <List className={classes.root} >
                <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
                <div style={{textAlign:'left',display:'flex',alignItems:'center'}}>
                    <span style={{color:'#000'}}>Сортувати</span>
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={name}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Мої</MenuItem>
                            <MenuItem value={20}>Всі</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{textAlign:'right'}}>
                    <span style={{color:'#5e122d'}}>Очистити</span>
                    <Button style={{color:'#e2e6e9'}} ><ClearAllIcon style={{color:'#5e122d'}}/></Button>
                </div>
                </div>
                <ListItem>
                    <ListItemText primary="Юзер"  />
                    <ListItemText primary="Запит"  />
                    <ListItemText primary="Час" style={{textAlign:'center'}}/>
                </ListItem>
                <Divider />
                {
                    data.length === 0  ? itemNone:itemYes
                }
            </List>
        </div>
    );
}


export default History;