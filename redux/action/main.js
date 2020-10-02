import * as types from "../types"

export const setInfo = (user) => ({
    type: types.SET_USER,
    payload: user
})

export const logout = (user) => ({
    type: types.LOGOUT
})