import { React, useReducer, useEffect } from "react";
import CartContext from "./cart-context";

const defaultCartReducer = {
  items: [],
  totalAmount: 0,
  address: null,
};

const getInitialCartState = () => {
  const storedCart = localStorage.getItem("cartState");
  return storedCart ? JSON.parse(storedCart) : defaultCartReducer;
};

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.cartItemId === action.item.cartItemId,
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // if (action.type === "REMOVE") {
  //   const existingCartItemIndex = state.items.findIndex(
  //     (item) => item.cartItemId === action.cartItemId,
  //   );
  //   const existingItem = state.items[existingCartItemIndex];
  //   const updatedTotalAmount = state.totalAmount - existingItem.price;
  //   let updatedItems;

  //   if (existingItem.amount === 1) {
  //     updatedItems = state.items.filter((item) => item.id !== action.id);
  //   } else {
  //     const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
  //     updatedItems = [...state.items];
  //     updatedItems[existingCartItemIndex] = updatedItem;
  //   }

  //   return {
  //     ...state,
  //     items: updatedItems,
  //     totalAmount: updatedTotalAmount,
  //   };
  // }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.cartItemId === action.cartItemId,
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.cartItemId !== action.cartItemId,
      );
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartReducer;
  }

  return defaultCartReducer;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cardReducer,
    undefined,
    getInitialCartState,
  );

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(cartState));
  }, [cartState]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (cartItemId) => {
    dispatchCartAction({ type: "REMOVE", cartItemId });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
