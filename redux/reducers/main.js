import * as types from "../types"

const main = (state = {
    userInfo: {
        name: "superAdmin"
    },
}, action) => {
    switch(action.type) {
        case types.SET_NAME:
            return { ...state, userInfo: {
                name: action.payload
            }}
        default:
            return {...state}
    }
}

export default main