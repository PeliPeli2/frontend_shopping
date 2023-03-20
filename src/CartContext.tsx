import React from "react";
import { createContext, useState } from "react";

type CartTotal = {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
};


export const CartTotalContext = React.createContext<null | CartTotal>(null);

type Props = {
    children: React.ReactNode;
};

export const CartTotalContextProvider = ({children}: Props) => {
    const [total, setTotal] = React.useState(0);

    return<CartTotalContext.Provider value={{total, setTotal}}>{children}</CartTotalContext.Provider>
};

export const useCartTotalContext = () => {
    const cartTotalContext = React.useContext(CartTotalContext)

    if (!cartTotalContext) throw new Error("No CartTotalcontext provided");

    return cartTotalContext
    
}

/*
import * as Cart from './Cart'
import * as UserForms from "./UserForms"
import { CartTotalContextProvider } from './CartContext'

export default function App() {
  return (
    <CartTotalContextProvider>
      <div className = "app">
        <h1>Shopping Cart</h1>
        <div>
        <Cart.createCart  />
        </div>
        <div>
        <UserForms.userinput />
        </div>
      </div>
    </CartTotalContextProvider>
  )
}





*/
