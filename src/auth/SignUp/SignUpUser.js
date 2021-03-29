import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import io from "socket.io-client";
import * as yup from "yup";
import {useFormik} from "formik";

const SERVER = "http://127.0.0.1:4000";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = yup.object({
    email: yup
        .string('Введіть свій email')
        .email('Введіть валідний email')
        .required('Email обовязковий'),
    firstName: yup
        .string('Введіть свое імя')
        .max(50)
        .required('Імя обовязкове'),
    lastName: yup
        .string('Введіть свое прізвище')
        .max(50)
        .required('Прізвище обовязкове'),
    password: yup
        .string('Введіть свій пароль')
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .required('Пароль обовязковий'),

});

const SignUpUser = () =>{
    const classes = useStyles();
    const [registerIn,setRegisterIn] = useState(false);
    useEffect(()=>{

    },[registerIn])
    const RegisterUser = ({email, firstName, lastName, password})=>{
        const socket = io(SERVER);
        socket.emit("createUser", {login:email,first_name:firstName,last_name:lastName,password:password}, (err, res) => {
            console.log(res.data)
            setRegisterIn(res.success)
        });

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName:'',
            lastName:'',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values,actions) => {
            RegisterUser(values);
            actions.resetForm();
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Реєстрація
                </Typography>
                {
                    registerIn  ? <SuccessReqister /> :
                        <form className={classes.form} onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Імя"
                                        autoFocus
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Прізвище"
                                        name="lastName"
                                        autoComplete="lname"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Пароль"
                                        type="password"
                                        id="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                type="submit"
                            >
                                Зареєструватися
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to='/'>
                                        Вже є аккаунт ? Увійдіть
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                }

            </div>
        </Container>
    );
}

const SuccessReqister = ()=>{
    return (
        <Box component="div" m={5} style={{textAlign:'center'}}>
            <div  style={{fontSize:'18px', marginBottom:'20px'}}>
                Дякуєм за регістрацію
            </div>
            <Link to='/'>
                На сторінку входу
            </Link>
        </Box>
        )

}
export default SignUpUser;