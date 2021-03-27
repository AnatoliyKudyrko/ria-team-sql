import {LOAD_DATA_USER} from "../action/action";

const initialState = {
    data: []
}
export function Auth (state=initialState,action){
    switch (action.type){
        case LOAD_DATA_USER:
            console.log(action.data)
            return {
                ...state,
                data:[
                  action.data
                ]
            }
        default:return state
    }
}