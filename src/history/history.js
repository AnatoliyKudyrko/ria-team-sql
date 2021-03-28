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
import {useDispatch, useSelector} from "react-redux";
import NearMeIcon from '@material-ui/icons/NearMe';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import {HistoryExecute, HistoryExecuteId} from "../redux/action/action";
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
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setName(event.target.value);
    };

    useEffect(()=>{

    },[data])
    const itemNone = (
        <ListItem>
            <ListItemText primary="Немає подій"  />
        </ListItem> )

    const ButtonGroup = (i)=>{
        const executeReqHistory = (item)=>{
            console.log(i)
            dispatch(HistoryExecute())
            dispatch(HistoryExecuteId(item))
        }
        return (
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <Button color='primary' variant='contained' onClick={()=>executeReqHistory(i)} >Виконати</Button>
                <NearMeIcon color='primary'/>
                <CloseIcon />
            </div>
        )

    }
    const itemYes = (data.map((item,i)=>{
        return (
            <div key={i}>
                <ListItem key={i} style={{display:"flex", justifyContent:'space-between'}}>
                    <ListItemText primary={item.name}  style={{width:'20%'}}/>
                    <ListItemText primary={item.nameReq} align='center' style={{width:'20%'}}/>
                    <ListItemText primary={item.date} align='center' style={{width:'20%'}}/>
                    <ListItemText align='right' style={{width:'20%'}}>
                                      <ButtonGroup i={i} />
                    </ListItemText>
                </ListItem>
                <Divider />
            </div>
        )
    }))



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
                    <ListItemText primary="Запит" align='center'  />
                    <ListItemText primary="Час" align='center' />
                    <ListItemText primary="Дії" align='center' />
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