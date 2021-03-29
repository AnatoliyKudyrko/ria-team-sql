import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import {Button, InputLabel, MenuItem} from "@material-ui/core";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import {
    DeleteDataHistory,
    FetchDataField,
    HistoryExecute,
    HistoryExecuteId,
    LoadDataHistory
} from "../redux/action/action";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";
import io from "socket.io-client";
import {SERVER} from "../dal/connectService";
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
    const socket = io(SERVER);
    let history = useHistory();
    const data = useSelector(state => state.Auth.data);
    const dispatch = useDispatch();

    useEffect(()=>{
       socket.emit("selectQueries",{user_id:Number(data.map(item=>item.user_id))} ,(data) => {
          console.log(data)
        })

    },[data])
    const itemNone = (
        <ListItem>
            <ListItemText primary="Немає подій"  />
        </ListItem> )

    const ButtonGroup = (i)=>{
        const executeReqHistory = (item)=>{
            console.log(data[item])
            dispatch(HistoryExecute(true))
            dispatch(HistoryExecuteId(item))
            history.push("/dashboard/main");
        }
        return (
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <Button color='primary' variant='contained' onClick={()=>executeReqHistory(i)} >Виконати</Button>
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
                    { item.name ?  <ListItemText align='right' style={{width:'20%'}}>
                        <ButtonGroup i={i} />
                    </ListItemText> : null}

                </ListItem>
                <Divider />
            </div>
        )
    }))



    return (
        <div>
            <List className={classes.root} >
                <Box m={2} >
                    <Typography variant="h5" component="h5" >
                        Історія запитів
                    </Typography>
                </Box>
                <div style={{display:'flex',alignItems:'center', justifyContent:'flex-end'}}>
                   {/*<Box m={2}>*/}
                   {/*    <div style={{textAlign:'left',display:'flex',alignItems:'center'}}>*/}
                   {/*        <FormControl className={classes.formControl}>*/}
                   {/*            <Select*/}
                   {/*                labelId="demo-simple-select-label"*/}
                   {/*                id="demo-simple-select"*/}
                   {/*                value={name}*/}
                   {/*                onChange={handleChange}*/}
                   {/*            >*/}
                   {/*                <MenuItem value={10}>Мої</MenuItem>*/}
                   {/*                <MenuItem value={20}>Всі</MenuItem>*/}
                   {/*            </Select>*/}
                   {/*        </FormControl>*/}
                   {/*    </div>*/}
                   {/*</Box>*/}
            <Box m={2} style={{textAlign:'right'}}>
                <div>
                    <span style={{color:'#5e122d'}} >Очистити</span>
                    <Button style={{color:'#e2e6e9'}} ><ClearAllIcon style={{color:'#5e122d'}} onClick={()=>dispatch(DeleteDataHistory({}))}/></Button>
                </div>
            </Box>
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