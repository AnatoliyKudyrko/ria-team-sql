import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    DeleteDataHistory,
    FetchDataActiveField,
    FetchDataSelect,
    FetchDataUser,
    LoadDataHistory
} from "../../redux/action/action";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {Add} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import moment from "moment";

const SERVER = "http://127.0.0.1:4000";
const useStyles = makeStyles((theme) => ({
    root: {
         display:'flex',
         justifyContent:'space-around',
         alignContent:'center',
         marginTop:'40px'

    },
    reqTitle:{
        fontSize:'18px'
    },
    btn: {
        textAlign:'center'

    },

}));
const AutoViewReq = ({table,field,viewTabel}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const name = useSelector(state => state.Auth.data);
    const [req, setReq] = useState('');
    const [reqHistory, setReqHistory] = useState('');
    const where = useSelector(state=>state.select.where)
    const funField = useSelector(state=>state.select.fieldFun)
    const group = useSelector(state=>state.select.group)
    const order = useSelector(state=>state.select.order)
    const history = useSelector(state=>state.history.execute);
    const historyData = useSelector(state=>state.history.data);
    const historyDataActive = useSelector(state=>state.history.activeItems)
    const socket = io(SERVER);

    useEffect(()=>{
        setReq(`Select ${field} ${[...funField]} from ${table.map(item=>item.name)} ${where} ${group} ${order}`)
    },[table,field,where,funField,group,order])

    useEffect(()=>{
        if(historyData[historyDataActive.i]  && history){
            setReqHistory(`${historyData[historyDataActive.i].reqData}`)
        }
        console.log(historyDataActive)
        console.log(history)
    },[history])

    const handleSubmit =()=>{
        viewTabel(true);
        let reqTemp='';
        if(historyData[historyDataActive.i]  && history){
            reqTemp=reqHistory;
        }
        if( field.length !== 0 ){
            reqTemp=req;
        }
        socket.emit("reqData", `${reqTemp} LIMIT 1000`, (err, res) => {
            dispatch(FetchDataSelect({
                    columns:res.columns,
                    rows:res.rows
                }
            ))
        });

    }
    const handleClear = ()=>{
        dispatch(FetchDataActiveField([]));

    }
    const handleClearHistory = ()=>{
        setReqHistory('');
    }
    const HistoryView = ()=>{
        return (
            <div>
                    <Paper className={classes.root}>
                        <div style={{display:'flex', alignItems:'center',justifyContent:'space-around', width:'80%'}}>
                        <p className={classes.reqTitle}>{`Запит з вашої історії:  ${reqHistory}`}</p>
                        <DeleteIcon onClick={handleClearHistory} color='secondary' fontSize='medium' style={{marginTop:'5px'}} />
                    </div>
                    </Paper>

                <Button variant="contained" onClick={handleSubmit} color="primary" size='large' >Виконати</Button>
            </div>
        )
    }
    const MainView = ()=>{
        return (
            <div>
                <Paper className={classes.root}>    <div>
                    <p className={classes.reqTitle}>{`Запит:  ${req}`}</p>

                </div>
                    <div>
                        <DeleteIcon onClick={handleClear} color='secondary' fontSize='medium' style={{marginTop:'50%'}} />
                    </div>
                </Paper>
                <Btn handleSubmit={handleSubmit} name={name} req={req} data={historyData[historyDataActive]}/>
            </div>
        )
    }
    return (
        <div className={classes.btn}>

                {
                    field.length !== 0  ? <MainView /> : null

                }

            {
                historyData[historyDataActive.i]  && history && reqHistory !== ''  ? <HistoryView /> : null

            }

        </div>
    );
};

const Btn= ({handleSubmit,name,req,data})=>{

    return(
        <div>
            <div>
                <Box m={3}>
                    <Button variant="contained" onClick={handleSubmit} color="primary" size='large' >Виконати</Button>
                    <div>
                        <AddHistory name={name} req={req} data={data}/>
                    </div>
                </Box>

            </div>
    <div>
    </div>
        </div>
    )
}


const AddHistory = ({name,req,data})=>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState('my');
    const dispatch = useDispatch();
    const socket = io(SERVER);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect(()=>{
    },[data])

    const handleSubmitHistory = ()=>{
        socket.emit('createQuery',
            {
                user_id: Number(name.map(item=>item.user_id)),
                request_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                request_query:req,
                request_query_name:value
            }, (err, res) => {
                console.log(res)
                dispatch(LoadDataHistory(
                    {
                        name:name.map(item=>item.first_name),
                        nameReq:res.data.request_query_name,
                        reqData:res.data.request_query,
                        date:res.data.request_date
                    }
                        ))
            });

        handleClose()
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Box m={2}>
                <SaveAltIcon onClick={handleClickOpen} fontSize='large'/>
            </Box>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Добавте в історію</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Назва вашого запиту"
                        fullWidth
                        value={value}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрити
                    </Button>
                    <Button onClick={handleSubmitHistory} color="primary">
                        Добавити
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AutoViewReq;