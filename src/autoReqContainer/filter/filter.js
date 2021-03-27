import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    AccordionSummary,
    Button,
    InputLabel,
    TextField
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import io from "socket.io-client";
import {FetchDataSelect, LoadDataWhereField} from "../../redux/action/action";
import {SERVER} from "../../dal/connectService";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    flex:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    btn:{
        height:theme.spacing(3)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color:'#115293'
    },
    detalies:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center'
    },
    bodyDiv:{
        display:"flex",
    }
}));
const Filter = ({table,field}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [dataFrom, setDataFrom] = React.useState('');
    const [dataTo, setDataTo] = React.useState('');
    const [day, setDay] = React.useState(0);

    const handleDay= (event) => {
        setDay(event.target.value);
        console.log(day);
    };
    const handleChangeFrom = (event) => {
        setDataFrom(event.target.value);
        console.log(dataFrom)
    };
    const handleChangeTo = (event) => {
        setDataTo(event.target.value);
        console.log(dataTo)
    };
    useEffect(()=>{
      if(dataFrom !== '' && dataTo !== ''){
          dispatch(LoadDataWhereField(`where toYYYYMMDD(EventDate) BETWEEN ${Number(dataFrom.replace(/-/g, ''))} and ${Number(dataTo.replace(/-/g, ''))}`))
      }
    },[dataTo,dataFrom])
    useEffect(()=>{
        if(day !== 0){
            dispatch(LoadDataWhereField(`where EventDate > today()-${day}`))
        }
    },[day])

    // const filterDate = ()=>{
    //         const socket = io(SERVER);
    //         socket.emit("reqDate", {field,table,dataFrom,dataTo}, (err, res) => {
    //             dispatch(FetchDataSelect({
    //                     columns:res.columns,
    //                     rows:res.rows
    //                 }
    //             ))
    //         });
    // }
    //
    // const filterDay = ()=>{
    //     if(day !== 0){
    //         const socket = io(SERVER);
    //         socket.emit("reqDays", {field,table,day}, (err, res) => {
    //             dispatch(FetchDataSelect({
    //                     columns:res.columns,
    //                     rows:res.rows
    //                 }
    //             ))
    //         });
    //     }
    // }

    return (
         <div>
             <Accordion >
                 <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                 >
                     <Typography className={classes.heading}>Фільтри</Typography>
                 </AccordionSummary>
                 <AccordionDetails className={classes.detalies}>
                     <div className={classes.bodyDiv} style={{marginRight:'50px'}}>
                             <form className={classes.container} noValidate>
                                 <TextField
                                     id="date"
                                     label="З"
                                     type="date"
                                     onChange={handleChangeFrom}
                                     value={dataFrom}
                                     className={classes.textField}
                                     InputLabelProps={{
                                         shrink: true,
                                     }}
                                 />
                                 <TextField
                                     id="date1"
                                     label="До"
                                     type="date"
                                     value={dataTo}
                                     onChange={handleChangeTo}
                                     className={classes.textField}
                                     InputLabelProps={{
                                         shrink: true,
                                     }}
                                 />
                             </form>
                             {/*<Button  className={classes.btn} variant="contained" color="primary" onClick={()=>filterDate()} >*/}
                             {/*    Знайти*/}
                             {/*</Button>*/}
                     </div>
                     <div className={classes.bodyDiv} >
                     <FormControl className={classes.formControl}>
                             <InputLabel>За останні дні</InputLabel>
                             <Select
                                 value={day}
                                 onChange={handleDay}
                             >
                                 <MenuItem value={7}>7</MenuItem>
                                 <MenuItem value={14}>14</MenuItem>
                                 <MenuItem value={30}>30</MenuItem>
                             </Select>
                         </FormControl>
                                 {/*<Button  className={classes.btn} variant="contained" color="primary" onClick={filterDay} >*/}
                                 {/*    Знайти*/}
                                 {/*</Button>*/}

                     </div>
                 </AccordionDetails>
             </Accordion>
         </div>
    );
};

export default Filter;