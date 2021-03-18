
export const LOAD_DATA_SELECT = 'LOAD_DATA_SELECT';
export const UPDATE_DATA_SELECT = 'UPDATE_DATA_SELECT';


function FetchDataSelect(data){
    return {
        type:LOAD_DATA_SELECT,
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
        socket.on(action,(data)=>{
           dispatch(FetchDataSelect(data.meta))
    })
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
