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
        },
        clearUser: (state) => { // Implementación de clearUser
            state.value.user = null;
            state.value.token = null;
            state.value.localId = null; // Resetea también localId, si es necesario
            state.value.imageCamera = null; // Resetea imageCamera
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
