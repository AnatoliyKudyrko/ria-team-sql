import * as React from 'react';
import { Checkbox} from "@material-ui/core";
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
        flexDirection:'row',
    },
}));

export const SelectContainer = () => {
    const data = useSelector(state => state.select);
    return (
        <>
                {data.map(item=><SelectItem key={item.count} item={item}  />)}
        </>
    );
};

const SelectItem = ({item}) =>{
    const {name,count,status} = item;
    const dispatch = useDispatch();
    return (
     <>
         <Checkbox checked={status} onClick={()=>dispatch(UpdateDataSelect(count))} size="small" />
         <span>{name}</span>
     </>
    )
}