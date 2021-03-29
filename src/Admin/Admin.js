import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {FetchDataActiveField, FetchDataSelect} from "../redux/action/action";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";
import {SERVER} from "../dal/connectService";
import {InputLabel, Paper} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AccordionDetails from "@material-ui/core/AccordionDetails";


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
        const socket = io(SERVER);
        socket.emit("autorizeSA", {login, password}, (err, res) => {
            console.log(res)
        });

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
            </div> : null
        }
        </div>
    );
};

const MainPanel = ()=>{
    return (
        <Paper>

        </Paper>
    )
}

export default Admin;