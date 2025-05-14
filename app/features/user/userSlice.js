import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            user: null,
            token: null,
            localId: null,
            imageCamera: null,
        }
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.value.user = payload.user;
            state.value.token = payload.token;
            state.value.localId = payload.localId;
        },
        clearUser: (state) => {
            state.value.user = null;
            state.value.token = null;
            state.value.localId = null;
            state.value.imageCamera = null;
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
