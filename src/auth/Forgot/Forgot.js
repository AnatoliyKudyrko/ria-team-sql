import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import {SERVER} from "../../dal/connectService";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useDispatch} from "react-redux";
import Box from "@material-ui/core/Box";

const validationSchema = yup.object({
    email: yup
        .string('Введіть свій email')
        .email('Введіть валідний email')
        .required('Email обовязковий')
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Forgot = ()=>{
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [res,setRes] = useState();
    const [success,setSuccess] = useState([])
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [done,setDone]= useState([]);


     useEffect(()=>{
         console.log(success)

     },[success])

    const handleChange = (event) => {
        setCode(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
     const sendCode = ()=>{
         const socket = io(SERVER);
         socket.emit('remindUser', {code:code}, (err, res) => {
             setSuccess(res);
         });
     }
    const sendMail =(values)=>{
        const socket = io(SERVER);
        socket.emit('forgotUser', {login:values.email}, (err, res) => {
        });
    }

    const changePassword =()=>{
        const socket = io(SERVER);
        const {data} = success.data;
        socket.emit('updateUser',  { user_id:data.user_id, login:data.login, password:password, first_name:data.first_name, last_name:data.last_name}, (err, res) => {
            setDone(res);
        });
    }
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            sendMail(values);
        },
    });


    const ToSingIn =()=>{
        history.push("/");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {success.success ? 'Змінити пароль' : 'Забули пароль'}
                </Typography>
                {
                    success.success ?
                        <div>
                            {
                             done.success ?   <Box component="div" m={5} style={{textAlign:'center'}}>
                                     <div  style={{fontSize:'18px', marginBottom:'20px'}}>
                                         Ви успішно змінили пароль
                                     </div>
                                     <Link variant="body2" onClick={()=>ToSingIn()} >
                                         На сторінку входу
                                     </Link>
                                 </Box>:
                                 <div>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                                <Button
                                fullWidth
                                variant="contained"
                                onClick={()=>changePassword()}
                                >Змінити</Button>
                                </div>
                            }
                        </div>
                        :
                        <form className={classes.form} onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                type="submit"
                            >
                                Надіслати
                            </Button>
                            <TextField
                                fullWidth
                                name="Code"
                                label="Code"
                                value={code}
                                onChange={handleChange}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                onClick={()=>sendCode()}
                            >
                                Надіслати
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link variant="body2" onClick={()=>ToSingIn()}>
                                        {"Перейти на вхід"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                }


            </div>
        </Container>
    );
}
export default Forgot;