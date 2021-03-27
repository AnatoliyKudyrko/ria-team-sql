import {LOAD_DATA_HISTORY} from "../action/action";

const initialState = {
    data: []
}
export function HistoryReducer (state=initialState,action){
    switch (action.type){
        case LOAD_DATA_HISTORY:
            return {
                ...state,
                data:[...state.data, action.data]
            }
        default:return state
    }
}