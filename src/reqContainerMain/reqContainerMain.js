import React, {useEffect, useState} from 'react';
import {Box, Checkbox, FormControlLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import HandReq from "../handRegContainer/handReq/handReq";
import TableView from "../tableView/tableView";
import {useSelector} from "react-redux";
import AutoReqMain from "../autoReqContainer/autoReqMain/autoReqMain";




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



const ReqContainerMain = () => {
    const classes = new useStyles();
    const [nameReq,setNameReq] = useState('checkedAuto');
    const [viewTableStatus,setViewTableStatus] = useState(false);
    const data = useSelector(state => state.selectData.data);

    const viewTable =(tableStatus)=> {
        setViewTableStatus(tableStatus);
    }

    useEffect(()=>{
    },[viewTableStatus])

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
                     nameReq === 'checkedAuto' ?  <AutoReqMain viewTable={viewTable}/> : <HandReq viewTable={viewTable} />
                 }
             </Paper>

            {
                viewTableStatus ?    <Paper>
                    <TableView column={data.columns} rows={data.rows.map((item,i)=>{return{id:i,...item}})} />
                </Paper> : null
            }


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

export default ReqContainerMain;