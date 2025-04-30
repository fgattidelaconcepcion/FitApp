import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth", 
    initialState: {
        value: {
            user: null,
            token: null,
        }
    },
    reducers: {
        setUser: (state, {payload})=> {
            state.value.user = payload.user
            state.value.token = payload.token

        },
        clearUser: ()=> {}
    }
})

export const {setUser, clearUser} = authSlice.actions
export default authSlice.reducer