import { create } from "zustand";
//import { getMenuFromAPI, saveProductDataToAPI } from "./jsonStorage";
import { getMenuFromFirestore } from "./api"; // ✅ This is the correct import

const useCartStore = create((set, get) => ({
  cart: [],
  totalPrice: 0,
  productDataList: [],
  addProductVisible: false,

  // ✅ Login state for SPA
  isLoggedIn: false,
  setLoginStatus: (status) => {
    localStorage.setItem("isLoggedIn", status ? "true" : "false");
    set({ isLoggedIn: status });
  },

  switchAddProductVisible: (option) => {
    set({ addProductVisible: !!option });
  },

  setProductData: (data) => set({ productDataList: data }),

  addToCart: (menuOption) => {
    const { cart, totalPrice } = get();
    let product = cart.find((item) => item.id === menuOption.id);

    if (product != undefined) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              price: item.price + menuOption.price,
              quantity: item.quantity + 1,
            }
          : item
      );

      set(() => ({
        cart: updatedCart,
      }));
    } else {
      set((state) => ({
        cart: [
          ...state.cart,
          { id: menuOption.id, price: menuOption.price, quantity: 1 },
        ],
      }));
    }

    set(() => ({
      totalPrice: setTotalPrice(totalPrice, "+", menuOption.price),
    }));
  },

  removeFromCart: (menuOption) => {
    const { cart, totalPrice } = get();
    let product = cart.find((item) => item.id === menuOption.id);

    if (!product) return;

    if (product.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              price: item.price - menuOption.price,
              quantity: item.quantity - 1,
            }
          : item
      );

      set(() => ({
        cart: updatedCart,
      }));
    } else {
      const filteredCart = cart.filter((item) => item.id !== menuOption.id);

      set(() => ({
        cart: filteredCart,
      }));
    }

    set(() => ({
      totalPrice: setTotalPrice(totalPrice, "-", menuOption.price),
    }));
  },

  removeProductItem: async (id) => {
    const { productDataList } = get();

    set((state) => ({
      productDataList: state.productDataList.filter((item) => item.id !== id),
    }));

    await saveProductDataToAPI(
      productDataList.filter((item) => item.id !== id)
    );
  },

  updateProductItem: async (id, newData) => {
    const { productDataList } = get();

    set((state) => ({
      productDataList: state.productDataList.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    }));

    await saveProductDataToAPI(
      productDataList.map((item) =>
        item.id === id
          ? { ...item, ...newData, active: !item.active }
          : item
      )
    );
  },

  addProductItem: async (item) => {
    const { productDataList } = get();

    set((state) => ({
      productDataList: [...state.productDataList, { ...item, active: false }],
    }));

    await saveProductDataToAPI([...productDataList, item]);
  },

  toggleItemActive: async (id) =>
    set((state) => ({
      productDataList: state.productDataList.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      ),
    })),
}));




function setTotalPrice(totalPrice, operator, price) {
  let total = totalPrice;

  if (operator === "-") {
    total -= Number(price);
  } else {
    total += Number(price);
  }
  return total;
}

export default useCartStore;