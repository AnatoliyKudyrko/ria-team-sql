import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import io from 'socket.io-client';
import {useEffect, useState} from "react";

const SERVER = "http://127.0.0.1:4000";

const testData = [
    { id:1,EventDate: 1, date_time: 231, web_id: 'Jon', user_id: 1, event_id: 35, calltracking_product_id: 222, owner_id: 35, proposal_id: 35, call_status: 35 },
    { id:2,EventDate: 2, date_time: 231, web_id: 'Jon', user_id: 2, event_id: 35, calltracking_product_id: 222, owner_id: 35, proposal_id: 35, call_status: 35 },
    { id:3,EventDate: 3, date_time: 231, web_id: 'Jon', user_id: 3, event_id: 35, calltracking_product_id: 222, owner_id: 35, proposal_id: 35, call_status: 35 }
];

export default function TableView() {
    const [data,setData] = useState([]);
    useEffect(() => {
        const socket = io(SERVER);
        socket.on('new',(data)=>{
            console.log(data)
            setData(data.meta)
        })

    }, []);
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={testData} columns={data.map(item=> {return {field:item.name,width:130}})} pageSize={5} checkboxSelection />
        </div>
    );
}