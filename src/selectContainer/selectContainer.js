import * as React from 'react';
import {Checkbox} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {UpdateDataSelect} from "../redux/action/action";


const useStyles = makeStyles((theme) => ({
    border: {
        borderRight:"2px solid #f44336",
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'left',
        paddingRight:"20px"

    },
    flex: {
        display: 'flex',
        flexDirection:'column'
    },
}));

export const SelectContainer = () => {
    const classes = useStyles();
    const data = useSelector(state => state.select);
    console.log(data.checkedData)
    return (
    <div className={classes.flex}>
        {data.checkedData.map(item=><SelectItem key={item.count} item={item}  />)}
    </div>
    );
};

const SelectItem = ({item}) =>{
    const {name,count,status} = item;
    const dispatch = useDispatch();
    return (
     <div>
             <Checkbox checked={status} onClick={()=>dispatch(UpdateDataSelect(count))} size="small" />
             <span>{name}</span>

     </div>
    )
}