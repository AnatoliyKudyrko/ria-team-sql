import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        borderRadius: 3,
        '&:active': {
            background: '#0062cc'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
            background: '#0062cc'
        },
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    panel: {
        borderRadius: theme.shape.borderRadius,
        background: 'rgba(0, 0, 0, 0.04)',
        width: '100%',
        textAlign:'center',
        marginLeft:'100px',
        display:'flex',
        justifyContent:'space-around',

    },
    linksActive:{
        textDecoration:'none',
        padding:'10px',
        borderRadius: theme.shape.borderRadius,
        color:'#fff',

},
    bottom:{
        marginBottom:'20px'
    }
}));

const Header = () =>{
    const classes = useStyles();
    const classNavLink = {
        textDecoration:'none',
        background:'#757de8',
        padding:'10px'
    }
    return (
        <AppBar position="static" className={classes.bottom}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Конструктор
                </Typography>
                <Paper className={classes.panel}>
                    <NavLink className={classes.linksActive}  to='/select'  activeStyle={classNavLink}>Вибірка</NavLink>
                    <NavLink className={classes.linksActive}  to='/req' activeStyle={classNavLink}>Запити</NavLink>
                    <NavLink className={classes.linksActive}  to='/analytic' activeStyle={classNavLink}>Аналітика</NavLink>
                </Paper>
            </Toolbar>
        </AppBar>
    );
}


export default Header;