import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";
import {SERVER} from "../dal/connectService";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import {InputLabel, MenuItem, Switch} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';

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
            !success ? <div style={{marginTop:'200px'}}>
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
                        style={{marginTop:'10px'}}
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
    const [updateUser,setUpdateUser] = useState(false);
    const [valueFilter, setValueFilter] = React.useState('всі');

    const handleChangeFilter = (event) => {
        setValueFilter(event.target.value);
    };
    useEffect(()=>{
        if(valueFilter === 'всі'){
            socket.emit("getAllUsers", {}, (err, res) => {
                console.log(res)
                setData(res.data);
            });
        }
        if(valueFilter === 'активовані'){
            socket.emit("getAllUsers", {}, (err, res) => {
                setData(res.data.filter(item=> item.isApproved === 1));
            });
        }
        if(valueFilter === 'блоковані'){
            socket.emit("getAllUsers", {}, (err, res) => {
                setData(res.data.filter(item=> item.isApproved === 0));
            });
        }


    },[updateUser,valueFilter])

    const deleteUserID =(userID)=>{
        socket.emit("deleteUser", {user_id:userID.id}, (err, res) => {
            if(res.success) {
                setUpdateUser(prev=>!prev)
            }
       });
    }



    const ButtonGroup = ({id,isApproved})=>{
        const [state, setState] = useState(isApproved);
         useEffect(()=>{

         },[data,isApproved])
        const setApprove = ()=>{
            socket.emit('setApprove',{user_id:id,value:isApproved !== 0 ? 0 : 1},(err, res) => {
                console.log(res)
                if(res.success) {
                    setUpdateUser(prev=>!prev)
                }
            })
        }

        let color = state !== 0 ? 'secondary': 'primary';

        return (
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',cursor:'pointer'}}>
             <Button variant="contained" color={color} onClick={setApprove}>{state !== 0 ? 'блок': 'активувати'}</Button>
                <CloseIcon onClick={()=>deleteUserID(id)}/>
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
                        <ButtonGroup id={item.user_id} isApproved={item.isApproved } />
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
                        Панель адміністратора
                    </Typography>
                </Box>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Box m={2}>
                            <FormControl >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={valueFilter}
                                    onChange={handleChangeFilter}
                                >
                                    <MenuItem value='всі'>Всі</MenuItem>
                                    <MenuItem value='активовані'>активовані</MenuItem>
                                    <MenuItem value='блоковані'>блоковані</MenuItem>
                                </Select>
                            </FormControl>
                    </Box>
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