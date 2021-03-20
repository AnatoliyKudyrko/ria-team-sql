import io from "socket.io-client";
export const LOAD_DATA_SELECT = 'LOAD_DATA_SELECT';
export const UPDATE_DATA_SELECT = 'UPDATE_DATA_SELECT';
export const LOAD_DATA_REQ = 'LOAD_DATA_REQ';
export const LOAD_DATA_FIELDS = 'LOAD_DATA_FIELDS';
const SERVER = "http://127.0.0.1:4000";
const socket = io(SERVER);

export function FetchDataSelect(data){
    return {
        type:LOAD_DATA_SELECT,
        data
    }
}

export function FetchDataField(data){
    return {
        type:LOAD_DATA_FIELDS,
        data
    }

}
export function UpdateDataSelect(id){
    return {
        type:UPDATE_DATA_SELECT,
        id
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
