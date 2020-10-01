import * as types from "../types"

const main = (state = {
    name: "guest",
}, action) => {
    switch(action.type) {
        case types.SET_USER:
            return {
                adminId: action.payload.adminId,
                name: action.payload.name,
                email: action.payload.email,
                adminType: action.payload.adminType
            }
        default:
            return {...state}
    }
}

export default main