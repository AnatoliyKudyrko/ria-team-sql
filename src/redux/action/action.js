import io from "socket.io-client";
export const LOAD_DATA_SELECT = 'LOAD_DATA_SELECT';
export const LOAD_DATA_USER = 'LOAD_DATA_USER';
export const LOAD_DATA_HISTORY = 'LOAD_DATA_HISTORY';
export const LOAD_DATA_HISTORY_ID = 'LOAD_DATA_HISTORY_ID';
export const LOAD_DATA_FUN_FIELD = 'LOAD_DATA_FUN_FIELD';
export const LOAD_DATA_GROUP = 'LOAD_DATA_GROUP';
export const LOAD_DATA_ORDER = 'LOAD_DATA_ORDER';
export const LOAD_DATA_FUN_WHERE = 'LOAD_DATA_FUN_WHERE';
export const UPDATE_DATA_SELECT = 'UPDATE_DATA_SELECT';
export const LOAD_DATA_FIELDS = 'LOAD_DATA_FIELDS';
export const LOAD_DATA_ACTIVE_FIELD = 'LOAD_DATA_ACTIVE_FIELD';
export const FILTER_DATA_SELECT = 'FILTER_DATA_SELECT';
export const LOAD_ACTIVE_NAME_TABLE = 'LOAD_ACTIVE_NAME_TABLE';
export const LOAD_DATA_HISTORY_EXECUTE = 'LOAD_DATA_HISTORY_EXECUTE';
export const  DELETE_DATA_HISTORY = 'DELETE_DATA_HISTORY';
export const  RESET = 'RESET';
export  const  DELETE_DATA_FUN_WHERE = 'DELETE_DATA_FUN_WHERE';
export const LOAD_DATA_LIMIT= 'LOAD_DATA_LIMIT';
export const LOAD_DATA_HISTORY_COUNT = 'LOAD_DATA_HISTORY_COUNT';
export const ADD_DATA_HISTORY = 'ADD_DATA_HISTORY';
export const FILTER_DATA_HISTORY = 'FILTER_DATA_HISTORY';

const SERVER = "http://127.0.0.1:4000";
const socket = io(SERVER);

export function FetchDataSelect(data){
    return {
        type:LOAD_DATA_SELECT,
        data
    }
}
export function FetchDataUser(data){
    return {
        type:LOAD_DATA_USER,
        data
    }
}
export function Reset(){
    return {
        type:RESET
    }
}
export function LoadDataHistory(data){
    return {
        type: LOAD_DATA_HISTORY,
        data
    }
}
export function AddDataHistory(data){
    return {
        type: ADD_DATA_HISTORY,
        data
    }
}
export function DeleteDataHistory(data){
    return {
        type: DELETE_DATA_HISTORY,
        data
    }
}

export function HistoryExecute(data){
    return {
        type: LOAD_DATA_HISTORY_EXECUTE,
        data
    }
}
export function HistoryCount(){
    return {
        type: LOAD_DATA_HISTORY_COUNT
    }
}

export function HistoryExecuteId(id){
    return {
        type: LOAD_DATA_HISTORY_ID,
        id
    }
}

export function LoadDataFunField(data){
    return {
        type: LOAD_DATA_FUN_FIELD,
        data
    }
}
export function LoadDataWhereField(data){
    return {
        type: LOAD_DATA_FUN_WHERE,
        data
    }
}
export function DeleteDataWhereField(data){
    return {
        type: DELETE_DATA_FUN_WHERE,
        data
    }
}
export function LoadDataGroup(data){
    return {
        type: LOAD_DATA_GROUP,
        data
    }
}
export function LoadDataOrder(data){
    return {
        type: LOAD_DATA_ORDER,
        data
    }
}
export function LoadDataLimit(data){
    return {
        type: LOAD_DATA_LIMIT,
        data
    }
}
export function FetchDataField(data){
    return {
        type:LOAD_DATA_FIELDS,
        data
    }
}
export function FetchDataActiveField(data){
    return {
        type:LOAD_DATA_ACTIVE_FIELD,
        data
    }
}
export function UpdateDataSelect(id){
    return {
        type:UPDATE_DATA_SELECT,
        id
    }
}
export function FilterDataSelect(data){
    return {
        type:FILTER_DATA_SELECT,
        data
    }
}
export function FilterDataHistory(data){
    return {
        type:FILTER_DATA_HISTORY,
        data
    }
}
export function LoadActiveTableName(data){
    return {
        type:LOAD_ACTIVE_NAME_TABLE ,
        data
    }
}
export function FetchDataThunk (socket,action){
    return function (dispatch){
        socket.on(action,  (data)=>{
           dispatch(FetchDataSelect( data.rows))
    })
}
}
export  const FetchDataThunkReq =(action,value)=>{
    return (dispatch)=>{
        socket.emit(action, value, (err, res) => {
            console.log(res.columns)
            dispatch(FetchDataSelect(res.rows))
        });
    }
}






/*
export function FetchDataMviewsThunk (socket){
    return function (dispatch){
        socket.on('mviews.calltracking',(data)=>{
            dispatch(FetchDataSelect(data.meta))
        })
    }
}
export function FetchDataTagsThunk (socket){
    return function (dispatch){
        socket.on('slon.r_tags_v2',(data)=>{
            dispatch(FetchDataSelect(data.meta))
        })
    }
}*/
