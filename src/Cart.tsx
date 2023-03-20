import React, {useState } from "react"
import CartData from './data.json'
import * as CartItems from './CartItems'
import { useCartTotalContext } from "./context/CartContext"

export function createCart() {

    const cartTotalContext = useCartTotalContext();
    return (
        <div className = "cart">
            <div className = "cart-total" id = "cart-cost">
                {isBasketEmpty(cartTotalContext.total)}
            </div>
            <div className = "item-row" >
                <CartItems.cartItems cartdata={CartData} />
            </div>
        </div>
    )

}

function isBasketEmpty(total : number){
    if (total == 0){
        return "Basket is empty"
    }
    else {
        return "Total Cost: " + total + " DKK"
    }
}

