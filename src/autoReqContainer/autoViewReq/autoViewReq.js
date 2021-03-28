import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FetchDataActiveField, FetchDataSelect, LoadDataHistory} from "../../redux/action/action";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {Add} from "@material-ui/icons";

const SERVER = "http://127.0.0.1:4000";
const useStyles = makeStyles((theme) => ({
    root: {
         display:'flex',
         justifyContent:'center',
         alignContent:'center',
        textAlign:'center',
        marginTop:'40px'

    },
    reqTitle:{
        fontSize:'18px'
    },
    btn: {
        textAlign:'center'

    },

}));
const AutoViewReq = ({table,field}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const name = useSelector(state => state.Auth.data);
    const [req, setReq] = useState('');
    const where = useSelector(state=>state.select.where)
    const funField = useSelector(state=>state.select.fieldFun)
    const group = useSelector(state=>state.select.group)
    const order = useSelector(state=>state.select.order)
    const history = useSelector(state=>state.history.execute);
    const historyData = useSelector(state=>state.history.data);
    const historyDataActive = useSelector(state=>state.history.activeItems)
    useEffect(()=>{
        setReq(`Select ${field} ${[...funField]} from ${table.map(item=>item.name)} ${where} ${group} ${order}`)
    },[table,field,where,funField,group,order])

    useEffect(()=>{
            console.log(historyData[historyDataActive])
        console.log(history)
    },[history])

    const handleSubmit =()=>{
        const socket = io(SERVER);
        socket.emit("reqData", `${req} LIMIT 1000`, (err, res) => {
            dispatch(FetchDataSelect({
                    columns:res.columns,
                    rows:res.rows
                }
            ))
        });

    }

    return (
        <div className={classes.btn}>
            <Paper className={classes.root}>
                <p className={classes.reqTitle}>{`Запит:  ${req}`}</p>
            </Paper>
            {
                field.length !== 0  ? <Btn handleSubmit={handleSubmit} name={name} req={req}/> : null
            }


        </div>
    );
};

const Btn= ({handleSubmit,name,req})=>{
    const dispatch = useDispatch();
    const handleClear = ()=>{
        dispatch(FetchDataActiveField([]));
    }
    return(
        <div style={{display:"flex",justifyContent:'space-around'}}>

    <div>
        <AddHistory name={name} req={req} />
    </div>
            <div>
                <Button variant="contained" onClick={handleSubmit} color="primary" >Виконати</Button>
            </div>
    <div>
    <Button variant="contained"  color="secondary" onClick={handleClear}>Очистити</Button>
    </div>
        </div>
    )
}


const AddHistory = ({name,req})=>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState('my');
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmitHistory = ()=>{
        dispatch(LoadDataHistory(
            {
                name:name.map(item=>item.first_name),
                nameReq:value,
                reqData:req,
                date:new Date().toDateString()}))
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
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Зберегти
            </Button>
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