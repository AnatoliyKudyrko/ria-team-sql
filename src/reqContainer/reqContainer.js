import React, {useEffect, useState} from 'react';
import {Box, Checkbox, FormControlLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import HandReq from "../handReq/handReq";
import io from "socket.io-client";
import TableView from "../tableView/tableView";
import {useSelector} from "react-redux";



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

class GridToolbarExport extends React.Component {
    render() {
        return null;
    }
}

const ReqContainer = () => {
    const classes = new useStyles();
    const [nameReq,setNameReq] = useState('checkedHand');
    const data = useSelector(state => state.selectData.data);

    const columns = [
        { field: 'user_id', headerName: 'user_id', width: 130 }]




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
                     nameReq === 'checkedHand' ? <HandReq /> : 'sasda'
                 }
             </Paper>
         <TableView column={columns} rows={data.map((item,i)=>{return {id:i,user_id:item.user_id}})} c/>
        </div>
    );
};

const ControlReq = (props)=>{
    const [state, setState] = useState({
        checkedHand: true,
        checkedAuto: false

    });

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
                            checked={state.checkedHand}
                            onChange={handleChange}
                            name="checkedHand"
                            color="primary"
                        />
                    }
                    label="руч."
                />
            </Box>
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
        </div>
    )
}

export default ReqContainer;