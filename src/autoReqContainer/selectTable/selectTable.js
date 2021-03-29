import * as React from 'react';
import { Checkbox} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {FetchDataField, FilterDataSelect, LoadActiveTableName, UpdateDataSelect} from "../../redux/action/action";
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
   const [data,setData] = useState([]);
    const dataCheckedTable = useSelector(state => state.select.checkedData);
    const name = useSelector(state => state.select.activeNameTable);

    const dispatch = useDispatch();

   useEffect(()=>{
       setData([...dataCheckedTable])
   },[dataCheckedTable,name])


    // const handleClickFilter =()=>{
    //    let count = 2;
    //     if(count === 2){
    //         dispatch(FilterDataSelect(name.map(item=>item.name)));
    //         dispatch(UpdateDataSelect(2));
    //         dispatch(FetchDataField([]))
    //     }
    //     if(count === 3){
    //         dispatch(FilterDataSelect(name.map(item=>item.name)));
    //         dispatch(UpdateDataSelect(3));
    //         dispatch(FetchDataField([]))
    //     }
    //
    //     count+=1;
    // }
    return (
    <div className={classes.flex}>
        {data
            .map((item,i)=><SelectItem key={i} item={item} getTableName={getTableName} data={data}/>)
        }
    </div>
    );
};

const SelectItem = ({item,getTableName,data}) =>{
    const {name,count,status} = item;
    const [dis,setDis] = useState(false);
    const dispatch = useDispatch();
    const dataActiveField = useSelector(state=>state.select.dataActiveField);

    useEffect(()=>{
    },[dataActiveField])

    const handleClick = ()=>{
        dispatch(UpdateDataSelect(count));
        getTableName(name);
        dispatch(LoadActiveTableName({name:name}))
    }
    const handleClickReq = ()=>{
       setDis(v=>!v);

    }
    return (
     <div >
             <Checkbox checked={status} onClick={handleClick} size="small" color='primary' disabled={dis}/>
             <span>{name}</span>
         {/*{*/}
         {/*    dataActiveField.length !== 0  ?  <Button color='primary' size='small' onClick={handleClickReq}>Зберегти підзапит </Button> : null*/}
         {/*}*/}
         {/*<hr/>*/}
     </div>
    )
}