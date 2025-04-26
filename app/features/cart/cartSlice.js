import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLoggedIn",
            updateUp: new Date().toLocaleString(),
            total: 0,
            items: [],
        }
    },
    reducers: {
        addCartItem: (state, { payload }) => {
            const productRepeated = state.value.items.find((item) => item.id === payload.id);
            if (productRepeated) {
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === payload.id) {
                        item.quantity += payload.quantity;
                        item.total = item.price * item.quantity;
                        return item;
                    }
                    return item; // Asegúrate de devolver el item original si no coincide
                });
                const total = itemsUpdated.reduce((acc, currentItem) =>
                    (acc += currentItem.price * currentItem.quantity), 0);
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    total,
                    updateAt: new Date().toLocaleString(),
                };
            } else {
                state.value.items.push(payload);
                const total = state.value.items.reduce((acc, currentItem) =>
                    (acc += currentItem.price * currentItem.quantity), 0);
                state.value = {
                    ...state.value,
                    total: total,
                    updateAt: new Date().toLocaleString(),
                };
            }
        },
        removeCartItem: () => { },
        clearCart: (state) => {
            state.value.items = [];
            state.value.total = 0;
        },
    }
});

export const { addCartItem, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
