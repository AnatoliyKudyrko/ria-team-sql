import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useEffect} from "react";

 const TableView = ({testData,data}) => {
     useEffect(()=>{

     },[data])
    return (
        <div style={{height: 400, width: '100%'}}>
            {data  !== null ? <DataGrid rows={testData} columns={data} pageSize={5} checkboxSelection /> : <Loader />}
        </div>
    );
}

const Loader = ()=>{
     return (
         <div>
             loading
         </div>
     )
}
export default TableView;