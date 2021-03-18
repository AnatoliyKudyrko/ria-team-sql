import {combineReducers} from "redux";
import {Select} from "./select";
import {SelectData} from "./selectData";



export default combineReducers({
    select:Select,
    selectData:SelectData
})