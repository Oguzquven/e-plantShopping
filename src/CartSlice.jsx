import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu - boş sepet
const initialState = {
  items: [],
  totalAmount: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Sepete ürün ekleme reducerı
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Eğer ürün zaten sepette varsa, miktarını artır
        existingItem.quantity += 1;
      } else {
        // Yeni ürün ekle
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      // Toplam tutarı güncelle
      state.totalAmount = state.items.reduce((total, item) => {
        const price = parseFloat(item.cost.replace("$", ""));
        return total + price * item.quantity;
      }, 0);
    },

    // Sepetten ürün kaldırma reducerı
    removeItem: (state, action) => {
      // ID'ye göre sepetten ürün kaldır
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      // Toplam tutarı güncelle
      state.totalAmount = state.items.reduce((total, item) => {
        const price = parseFloat(item.cost.replace("$", ""));
        return total + price * item.quantity;
      }, 0);
    },

    // Ürün miktarını güncelleme reducerı
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        // Ürünün miktarını güncelle
        item.quantity = quantity;

        // Eğer miktar 0 veya daha az ise, ürünü sepetten kaldır
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }

      // Toplam tutarı güncelle
      state.totalAmount = state.items.reduce((total, item) => {
        const price = parseFloat(item.cost.replace("$", ""));
        return total + price * item.quantity;
      }, 0);
    },
  },
});

// Action yaratıcılarını dışa aktar
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Reducer'ı dışa aktar
export default CartSlice.reducer;
