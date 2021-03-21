import {LOAD_DATA_FIELDS, UPDATE_DATA_SELECT} from "../action/action";

const initialState = {
    checkedData: [
        {count: 1, name: 'slon.facts', status: true},
        {count: 2, name: 'slon.r_tags_v2', status: false},
        {count: 3, name: 'mviews.calltracking', status: false},
    ],
    dataField:[]
}
export function Select (state=initialState,action){
    switch (action.type){
        case UPDATE_DATA_SELECT:
            let objDefault =  state.checkedData.map(item => {
                return   {...item, status: item.status = false};
            });
            let objActive =  objDefault.map(item => {
                let obj = {};
                if (item.count === action.id) {
                    obj=  {...item, status: item.status = true}
                };
                return {...item,...obj}
            });
            return {...state,checkedData:[...objActive]}

        case LOAD_DATA_FIELDS:
            return {
                ...state,
                dataField:[...action.data]
            }
        default: return state
    }
}