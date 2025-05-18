import { create } from "zustand";


const useCartStore = create((set, get) => ({   /* set is used to update data& get to read current state*/
  cart: [],
  totalPrice: 0,
  productDataList: [],
  addProductVisible: false,


  isLoggedIn: false,
  setLoginStatus: (status) => {
    localStorage.setItem("isLoggedIn", status ? "true" : "false");
    set({ isLoggedIn: status });
  },

  switchAddProductVisible: (option) => {
    set({ addProductVisible: !!option }); /* !!option converts any value to true or false*/
  },

  setProductData: (data) => set({ productDataList: data }),/*Stores the list of all available products (used on the menu page)*/

  addToCart: (menuOption) => {
    const { cart, totalPrice } = get();
    let product = cart.find((item) => item.id === menuOption.id);

    if (product != undefined) {  /* this checks whether we found a product*/
      const updatedCart = cart.map((item) => /* map()goes through each item in the cart*/
        item.id === product.id
          ? {
              ...item, /* if finds the product adds the price and increases the quantity*/
              price: item.price + menuOption.price,
              quantity: item.quantity + 1,
            }
          : item  /* keeps the rest of the item’s properties unchanged*/
      );

      set(() => ({
        cart: updatedCart, /* updates the cart in zuztand*/
      }));
    } else {               /* If the product is not in the cart yet*/
      set((state) => ({
        cart: [
          ...state.cart,   /* copies everything already in the cart*/
          { id: menuOption.id, price: menuOption.price, quantity: 1 }, /*adds new product */
        ],
      }));
    }

    set(() => ({
      totalPrice: setTotalPrice(totalPrice, "+", menuOption.price),   /* updates the total cart price
       by adding the price of the newly added item*/
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
      const filteredCart = cart.filter((item) => item.id !== menuOption.id);  /*filter() removes the item completely from the cart*/

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


  },

  updateProductItem: async (id, newData) => {
    const { productDataList } = get();

    set((state) => ({
      productDataList: state.productDataList.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    }));


  },

  addProductItem: async (item) => {
    const { productDataList } = get();

    set((state) => ({
      productDataList: [...state.productDataList, { ...item, active: false }],
    }));


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


