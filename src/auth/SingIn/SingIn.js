import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import {FetchDataSelect, FetchDataUser} from "../../redux/action/action";
import {SERVER} from "../../dal/connectService";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useDispatch} from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const validationSchema = yup.object({
    email: yup
        .string('Введіть свій email')
        .email('Введіть валідний email')
        .required('Email обовязковий'),
    password: yup
        .string('Введіть свій пароль')
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .required('Пароль обовязковий'),
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

const SignIn = ()=>{
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [loggedIn,setLoggedIn] = useState(false);
    const [error,setError] = useState(false);
    const CheckUser =(values)=>{
        const socket = io(SERVER);
        socket.emit('checkUser', {login:values.email,password:values.password}, (err, res) => {
            console.log(res)
            if( res.success ){
                setLoggedIn( res.success );
                dispatch(FetchDataUser(res.data));
                setError(false);
            }
                    if( !res.success){
                        setLoggedIn(false);
                        setError(true);
                    }
            console.log(res);
        });

    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            CheckUser(values);
        },
    });

    useEffect(()=>{
        if(loggedIn) {
            history.push("/dashboard");
        }
    },[loggedIn])


    const ToSingUp =()=>{
        history.push("/singup");
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вхід
                </Typography>
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
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Пароль"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    {
                        error ?  <Typography component="p" color='error' m={0.5}>
                            Перевірте написання email або пароля
                        </Typography> : null
                    }
                    <Button
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        type="submit"
                    >
                        Увійти
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Забули пароль
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={()=>ToSingUp()}>
                                {"Не має аккаунта? Зареєструватися"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default SignIn;