import React from "react";
import { createContext, useState } from "react";
import { cartItems } from "../CartItems";

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
    const cartitems = ""

    return<CartTotalContext.Provider value={{total, setTotal}}>{children}</CartTotalContext.Provider>
};

export const useCartTotalContext = () => {
    const cartTotalContext = React.useContext(CartTotalContext)

    if (!cartTotalContext) throw new Error("No CartTotalcontext provided");

    return cartTotalContext
    
}