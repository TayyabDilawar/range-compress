import { createStore, combineReducers } from "redux"
import ImageWindowReducer from "./reducers/ImageWindowReducer"

export const store = createStore(combineReducers({
    imageWindow: ImageWindowReducer
}))