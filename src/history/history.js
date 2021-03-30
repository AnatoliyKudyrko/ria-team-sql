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
    FetchDataField, FilterDataHistory,
    HistoryExecute,
    HistoryExecuteId, LOAD_DATA_HISTORY,
    LoadDataHistory
} from "../redux/action/action";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";
import io from "socket.io-client";
import {SERVER} from "../dal/connectService";
import Toolbar from "@material-ui/core/Toolbar";
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
    const historyData = useSelector(state=>state.history.data);
    const dispatch = useDispatch();

    useEffect(()=>{
       socket.emit("selectQueries",{user_id:Number(data.map(item=>item.user_id))} ,(err,data) => {
           console.log(data.data)
         dispatch(LoadDataHistory(data.data))
        })

    },[])
    const itemNone = (
        <ListItem>
            <ListItemText primary="Немає подій"  />
        </ListItem> )




    const ButtonGroup = ({i,index})=>{
        const executeReqHistory = (item)=>{
            dispatch(HistoryExecute(true))
            dispatch(HistoryExecuteId(item))
            history.push("/dashboard/main");
        }

        const deleteHistoryID =(id)=>{

            socket.emit("removeQuery", {request_id:id}, (err, res) => {
             if (res.success){
            dispatch(FilterDataHistory({idQuery:id}));
             }

            });
        }
        return (
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <Button color='primary' variant='contained' onClick={()=>executeReqHistory(i)} >Виконати</Button>
                <Button  onClick={()=>deleteHistoryID(index)} >Видалити</Button>
            </div>
        )

    }
    const itemYes = (historyData.map((item,i)=>{
        return (
            <div key={i}>
                <ListItem key={i} style={{display:"flex", justifyContent:'space-between'}}>
                    <ListItemText primary={data.map(item=>item.first_name)} align='center' style={{width:'20%'}}/>
                    <ListItemText primary={item.request_query_name} align='center' style={{width:'20%'}}/>
                    <ListItemText primary={item.request_date} align='center' style={{width:'20%'}}/>
                    <ListItemText align='right' style={{width:'20%'}}>
                        <ButtonGroup i={i} index={item.request_id}/>
                    </ListItemText>

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
                        Історія запитів  <span style={{textTransform:'uppercase'}}>{data.map(item=><span key={item.user_id} style={{fontSize:'16px'}}>{item.first_name}</span>)}</span>
                    </Typography>
                </Box>
                <div style={{display:'flex',alignItems:'center', justifyContent:'flex-end'}}>
            <Box m={2} style={{textAlign:'right'}}>
                <div>
                    <span style={{color:'#5e122d'}} >Очистити</span>
                    <Button style={{color:'#e2e6e9'}} ><ClearAllIcon style={{color:'#5e122d'}} onClick={()=>dispatch(DeleteDataHistory({}))}/></Button>
                </div>
            </Box>
                </div>
                <ListItem>
                    <ListItemText primary="Логін" align='center'  />
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