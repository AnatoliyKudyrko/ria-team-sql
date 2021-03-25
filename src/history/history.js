import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import {Button} from "@material-ui/core";
import ClearAllIcon from '@material-ui/icons/ClearAll';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));
function History(props) {
    const classes = useStyles();
    const itemNone = (
        <ListItem>
            <ListItemText primary="Немає подій"  />
        </ListItem> )

    const itemYes = (props.history.map((item=>{
        return (
            <div>
                <ListItem key={item.data}>
                    <ListItemText primary={item.name}  />
                    <ListItemText primary={item.data.slice(0,16)} style={{textAlign:'center'}}/>
                </ListItem>
                <Divider />
            </div>
        )
    })))

    return (
        <div>
            <List className={classes.root} >
                <div style={{textAlign:'right'}}>
                    <span style={{color:'#5e122d'}}>Очистити</span>
                    <Button style={{color:'#e2e6e9'}} ><ClearAllIcon style={{color:'#5e122d'}}/></Button>
                </div>
                <ListItem>
                    <ListItemText primary="Юзер"  />
                    <ListItemText primary="Запит"  />
                    <ListItemText primary="Час" style={{textAlign:'center'}}/>
                </ListItem>
                <Divider />
                {
                    props.history.length === 0  ? itemNone:itemYes
                }
            </List>
        </div>
    );
}


export default History;