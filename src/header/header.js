import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    bottom:{
        marginBottom:'20px'
    }
}));

const Header = () =>{
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.bottom}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Конструктор Delta
                </Typography>
            </Toolbar>
        </AppBar>
    );
}


export default Header;