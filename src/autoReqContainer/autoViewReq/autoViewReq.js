import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FetchDataActiveField, FetchDataSelect, FetchDataUser, LoadDataHistory} from "../../redux/action/action";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {Add} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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
            console.log(historyData[historyDataActive])
        console.log(history)
    },[history])

    const handleSubmit =()=>{
        viewTabel(true);
        socket.emit("reqData", `${req} LIMIT 1000`, (err, res) => {
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
    return (
        <div className={classes.btn}>

                {
                    field.length !== 0  ?
                        <Paper className={classes.root}>    <div>
                            <p className={classes.reqTitle}>{`Запит:  ${req}`}</p>
                        </div>
                            <div>
                                <DeleteIcon onClick={handleClear} color='secondary' fontSize='medium' style={{marginTop:'50%'}} />
                            </div>
                        </Paper>: null
                }

            {
                field.length !== 0  ? <Btn handleSubmit={handleSubmit} name={name} req={req} data={historyData[historyDataActive]}/> : null
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
        console.log(data)
    },[data])
    const handleSubmitHistory = ()=>{
        socket.emit('createQuery',
            {
                user_id: name.map(item=>item.user_id).toString(),
                request_query:req,
                request_query_name:value
            }, (err, res) => {
                console.log(res)
            });
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