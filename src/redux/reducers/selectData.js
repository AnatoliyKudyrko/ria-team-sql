import {LOAD_DATA_SELECT} from "../action/action";

const initialState = {
    loading: false,
    data: {
        columns:[],
        rows:[]
    }
}
export function SelectData (state=initialState,action){
    switch (action.type){
        case LOAD_DATA_SELECT:
                return {
                    ...state,
                    data:{
                        columns:[...action.data.columns],
                        rows:[...action.data.rows]
                    }
                }
        default:return state
        }
}