import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {
    DeleteDataHistory,
    FetchDataActiveField,
    FetchDataSelect,
    HistoryExecute,
    HistoryExecuteId
} from "../redux/action/action";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";
import {SERVER} from "../dal/connectService";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ClearAllIcon from "@material-ui/icons/ClearAll";

const socket = io(SERVER);

const Admin = () => {
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const [success,setSuccess] = useState(false);

    const handleLogin = (event)=> {
        setLogin(event.target.value)

    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }
    const checkAdmin = ()=>{
        socket.emit("autorizeSA", {login, password}, (err, res) => {
            setSuccess(res.success)
        })
    }
    return (
        <div>
        {
            !success ? <div>
                <Box style={{width:'20%',margin:'auto'}}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Login"
                        value={login}
                        onChange={handleLogin}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Пароль"
                        value={password}
                        onChange={handlePassword}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={()=>checkAdmin()}
                    >Увійти</Button>
                </Box>
            </div> : <MainPanel />
        }
        </div>
    );
};

const MainPanel = ()=>{

    const [data,setData] = useState([]);

    useEffect(()=>{
        socket.emit("getAllUsers", {}, (err, res) => {
            setData(res.data);
            console.log(data)
        });
    },[])
    const ButtonGroup = (i)=>{
        return (
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <CloseIcon />
            </div>
        )
    }

    const itemYes = (data.map((item,i)=>{
        return (
            <div key={i}>
                <ListItem key={i} style={{display:"flex", justifyContent:'space-between'}}>
                    <ListItemText primary={item.user_id}  style={{width:'20%'}}/>
                    <ListItemText primary={item.first_name} align='center' style={{width:'20%'}}/>
                    <ListItemText primary={item.last_name} align='center' style={{width:'20%'}}/>
                    <ListItemText primary={item.login} align='center' style={{width:'20%'}}/>
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
            <List >
                <Box m={2} >
                    <Typography variant="h5" component="h5" >
                        Админ
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
                            <Button style={{color:'#e2e6e9'}} ><ClearAllIcon style={{color:'#5e122d'}}/></Button>
                        </div>
                    </Box>
                </div>
                <ListItem color='primary'>
                    <ListItemText primary="Id"  />
                    <ListItemText primary="Імя" align='center'  />
                    <ListItemText primary="Прізвище" align='center' />
                    <ListItemText primary="Логін" align='center' />
                    <ListItemText primary="Дії" align='center' />
                </ListItem>
                <Divider />
                {
                    data.length === 0  ? null:itemYes
                }
            </List>
        </div>
    );
}

export default Admin;