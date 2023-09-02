import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { userReducer } from "./reducer/userReducer"





const rootReducer = combineReducers({
    user:userReducer,

 
})




const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store