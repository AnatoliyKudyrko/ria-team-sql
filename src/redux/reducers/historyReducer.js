import {
    ADD_DATA_HISTORY,
    DELETE_DATA_HISTORY, FILTER_DATA_HISTORY, FILTER_DATA_SELECT,
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
                data:action.data
            }
        case ADD_DATA_HISTORY:
            return {
                ...state,
                data:[...state.data, action.data]
            }
        case DELETE_DATA_HISTORY:
            return {
                ...state,
                data:[ action.data]
            }
        case FILTER_DATA_HISTORY:
            const index = state.data.map(item => item.request_id).indexOf(action.data.idQuery);
            console.log(index)
            const stateTemp = [
                ...state.data.slice(0, index),
                ...state.data.slice(index + 1)
            ];
            return {
                ...state,
                data: [...stateTemp]
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