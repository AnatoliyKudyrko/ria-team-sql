import {combineReducers} from "redux";
import {Select} from "./select";
import {SelectData} from "./selectData";
import {Auth} from "./auth";
import {HistoryReducer} from "./historyReducer";



export default combineReducers({
    select:Select,
    selectData:SelectData,
    Auth:Auth,
    history:HistoryReducer
})