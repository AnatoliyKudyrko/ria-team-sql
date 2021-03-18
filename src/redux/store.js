import { createStore, applyMiddleware } from 'redux'
import reducer  from "./reducers/reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import logger from 'redux-thunk';

export let store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk,logger)))