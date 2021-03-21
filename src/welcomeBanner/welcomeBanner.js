import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import React from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#cfe8fc',
        height: '50vh',
        width:'50vw',
        margin:'auto',
        marginTop:'5%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}));
const WelcomeBanner = ()=>{
    const classes = useStyles();
    return (
        <>
            <Container fixed>
                <Typography component="div" className={classes.root}>
                    <span>Вас вітає конструктор запитів БД ClickHouse</span>
                   <NavLink to='/req'>Розпочати роботу</NavLink>
                </Typography>
            </Container>

        </>
    )
}
export default WelcomeBanner;