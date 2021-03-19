import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import io from "socket.io-client";
import {FetchDataThunk} from "../redux/action/action";
import TableView from "../tableView/tableView";



const SERVER = "http://127.0.0.1:4000";


const testData = [
    { id:1,EventDate: 1, date_time: 231, web_id: 'Jon', user_id: 1, event_id: 35, calltracking_product_id: 222, owner_id: 35, proposal_id: 35, call_status: 35 },
    { id:2,EventDate: 2, date_time: 231, web_id: 'Jon', user_id: 2, event_id: 35, calltracking_product_id: 222, owner_id: 35, proposal_id: 35, call_status: 35 },
    { id:3,EventDate: 3, date_time: 231, web_id: 'Jon', user_id: 3, event_id: 35, calltracking_product_id: 222, owner_id: 35, proposal_id: 35, call_status: 35 }
];

export const SelectViewContainer = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.selectData.data);
    const select = useSelector(state=>state.select);
    const active = select.filter(i=>i.status === true).map(item=>item.name).toString();

    useEffect(() => {
        const socket = io(SERVER);
        dispatch(FetchDataThunk(socket,active))
    }, [active])


    return (
        <>
            <TableView testData={[]} data={data} name={active}/>
        </>

    );
};