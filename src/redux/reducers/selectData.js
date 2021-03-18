import {LOAD_DATA_SELECT} from "../action/action";

const initialState = {
    data: []
}
export function SelectData (state=initialState,action){
    switch (action.type){
        case LOAD_DATA_SELECT:
                return {
                    ...state,
                    data:[...action.data]
                }
        default:return state
        }
}