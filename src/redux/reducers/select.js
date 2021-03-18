import {UPDATE_DATA_SELECT} from "../action/action";

const initialState = [
    {count:1,name:'slon.facts',status:true},
    {count:2,name:'slon.r_tags_v2',status:false},
    {count:3,name:'mviews.calltracking',status:false},
]
export function Select (state=initialState,action){
    switch (action.type){

        case UPDATE_DATA_SELECT:
            let objDefault =  state.map(product => {
                return   {...product, status: product.status = false};
            });
            let objActive =  objDefault.map(product => {
                let obj = {};
                if (product.count === action.id) {
                    obj=  {...product, status: product.status = true}
                };
                return {...product,...obj}
            });
            return objActive;
        default: return state
    }
}