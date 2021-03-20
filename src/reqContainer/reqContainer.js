import React, {useEffect, useState} from 'react';
import {Box, Checkbox, FormControlLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import HandReq from "../handReq/handReq";
import io from "socket.io-client";
import TableView from "../tableView/tableView";
import {useSelector} from "react-redux";
import AutoReq from "../autoReq/autoReq";



const SERVER = "http://127.0.0.1:4000";

const useStyles = makeStyles((theme) => ({
    root: {

    },
    textarea: {
        width:'70%'
    },
    centerV:{
        display:"flex",
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        marginLeft:'20px'
    },
    controlReq:{
      textAlign:'right',
        backgroundColor:'rgba(0, 0, 0, 0.04)'
    }

}));



const ReqContainer = () => {
    const classes = new useStyles();
    const [nameReq,setNameReq] = useState('checkedAuto');
    const data = useSelector(state => state.selectData.data);
    const getControlReq = (name) =>{
        setNameReq(name);
    }
    return (
        <div>
            <div className={classes.controlReq}>
                <ControlReq getControlReq={getControlReq}/>
            </div>
             <Paper className={classes.root}>
                 {
                     nameReq === 'checkedAuto' ?  <AutoReq /> : <HandReq />
                 }
             </Paper>
            <Paper>
               <TableView column={data.columns} rows={data.rows.map((item,i)=>{return {id:i,...item}})} />

            </Paper>

        </div>
    );
};

const ControlReq = (props)=>{
    const [state, setState] = useState({
        checkedAuto: true,
        checkedHand: false

    })

    const handleChange = (event) => {
        if(  [event.target.name].toString() === 'checkedHand' && event.target.checked === true ){
            setState({ checkedAuto: false, checkedHand: true });
            props.getControlReq('checkedHand');
        }
        if(  [event.target.name].toString() === 'checkedAuto' && event.target.checked === true ){
            setState({ checkedHand: false,checkedAuto: true });
            props.getControlReq('checkedAuto');
        }
    };
    return (
        <div>
            <Box component="span" m={1}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedAuto}
                            onChange={handleChange}
                            name="checkedAuto"
                            color="primary"
                        />
                    }
                    label="авто"
                />
            </Box>
            <Box component="span" m={1}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedHand}
                            onChange={handleChange}
                            name="checkedHand"
                            color="primary"
                        />
                    }
                    label="руч."
                />
            </Box>

        </div>
    )
}

export default ReqContainer;