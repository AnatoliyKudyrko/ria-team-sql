import * as React from 'react';
import {Button, Checkbox} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {FilterDataSelect, LoadActiveTableName, UpdateDataSelect} from "../../redux/action/action";
import {useEffect, useState} from "react";


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

export const SelectTable = ({getTableName,checkedTable}) => {
    const classes = useStyles();

    const dataCheckedTable = useSelector(state => state.select.checkedData);
    const name = useSelector(state => state.select.activeNameTable);
    const dispatch = useDispatch();




    const handleClickFilter =()=>{
        dispatch(FilterDataSelect('slon.facts'));
        console.log(dataCheckedTable)
    }
    return (
    <div className={classes.flex}>
        {dataCheckedTable
            .map(item=><SelectItem key={item.count} item={item} getTableName={getTableName} />)
        }
        {checkedTable ? <Button color='primary' size='small' onClick={()=>handleClickFilter()}>Об'єднати </Button> : null}
    </div>
    );
};

const SelectItem = ({item,getTableName}) =>{
    const {name,count,status} = item;
    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch(UpdateDataSelect(count));
        getTableName(name);
        dispatch(LoadActiveTableName({name:name}))
    }
    return (
     <div>
             <Checkbox checked={status} onClick={handleClick} size="small" color='primary'/>
             <span>{name}</span>

     </div>
    )
}