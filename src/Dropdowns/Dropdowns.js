import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: 28,
        right: '0',
        zIndex: 1,
        border: '1px solid',
        backgroundColor: theme.palette.background.paper,
        width: '150px'
    },
}));

const DropDowns = (props)=> {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const countHistory = useSelector(state => state.history.count);
    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    const handleClickAway = () => {
        setOpen(false);
    };
    useEffect(()=>{

    },[countHistory])
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <div onClick={handleClick}>
                    {props.icon}
                </div>
                {open ? (
                    <div className={classes.dropdown}>
                        <List component="nav"  aria-label="contacts">
                            {
                                props.content === 'Notifications'  ?  <Notifications data={countHistory} /> :
                                        props.content === 'Account'  ?  <Account  /> : null
                            }

                        </List>

                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}
const Notifications =({data})=> {
    return (
               data !== 0 ?
                <ListItem>
                    <ListItemText primary="Добавлено в історію"  style={{color:'black'}}/>
                </ListItem> : null
    )

}
const Account =()=> {
    return (
        <List component="nav" aria-label="main mailbox folders" style={{color:'black'}}>
            <Link to='/dashboard/user'>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsApplicationsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Змінити" />
                </ListItem>
            </Link>
            <Link to='/'>
                <ListItem button>
                    <ListItemIcon>
                        < ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Вийти" />
                </ListItem>
            </Link>

        </List>
    )
}

export  default DropDowns;