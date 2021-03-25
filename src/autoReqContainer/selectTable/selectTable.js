import * as React from 'react';
import {Checkbox} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {UpdateDataSelect} from "../../redux/action/action";


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

export const SelectTable = ({getTableName}) => {
    const classes = useStyles();
    const dataCheckedTable = useSelector(state => state.select.checkedData);
    return (
    <div className={classes.flex}>
        {dataCheckedTable.map(item=><SelectItem key={item.count} item={item} getTableName={getTableName} />)}
    </div>
    );
};

const SelectItem = ({item,getTableName}) =>{
    const {name,count,status} = item;
    const dispatch = useDispatch();
    const handleClick = ()=>{
        console.log(count);
        console.log(status)
        dispatch(UpdateDataSelect(count));
        getTableName(name);
    }
    return (
     <div>
             <Checkbox checked={status} onClick={handleClick} size="small" />
             <span>{name}</span>
     </div>
    )
}