import { combineReducers, createStore } from "redux";
import { formReducer } from './reducer'
const rootReducer = combineReducers({
    formReducer
})
export const store = createStore(rootReducer)