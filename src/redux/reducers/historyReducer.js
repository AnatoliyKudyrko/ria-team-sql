import {
    DELETE_DATA_HISTORY,
    LOAD_DATA_HISTORY, LOAD_DATA_HISTORY_COUNT,
    LOAD_DATA_HISTORY_EXECUTE,
    LOAD_DATA_HISTORY_ID
} from "../action/action";

const initialState = {
    execute:false,
    count:0,
    data: [],
    activeItems:0
}
export function HistoryReducer (state=initialState,action){
    switch (action.type){
        case LOAD_DATA_HISTORY:
            return {
                ...state,
                data:[...state.data, action.data]
            }
        case DELETE_DATA_HISTORY:
            return {
                ...state,
                data:[ action.data]
            }
        case LOAD_DATA_HISTORY_EXECUTE:
            return {
                ...state,
                execute: action.data
            }
        case LOAD_DATA_HISTORY_COUNT:
            return {
                ...state,
                count: state.count+1
            }
        case LOAD_DATA_HISTORY_ID:
            return {
                ...state,
                activeItems:action.id
            }
        default:return state
    }
}