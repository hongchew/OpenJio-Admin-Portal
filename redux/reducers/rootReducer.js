import { combineReducers } from "redux"
import main from "./main"

//This is the file to combine all available reducers

const rootReducer = combineReducers({
    main: main
    //add more as there are more reducers
})

export default rootReducer