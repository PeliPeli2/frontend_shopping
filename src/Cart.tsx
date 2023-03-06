import React, {useState } from "react"
import CartData from './data.json'
import * as CartItems from './CartItems'

export function createCart() {

    var initialCount = 0
    
    var initialcost = 0
    CartData.map((data: { price: number }) => {
        initialcost = initialcost + data.price * initialCount
        
    })
    
    
    const [total, setTotal] = useState(initialcost)

    if (total != 0){
    return (
        <div className = "cart">
        <div className = "cart-total" id = "cart-cost">
            {"Total Cart Cost: " + total + " DKK"}
        </div>
        <div className = "item-row" >
            <CartItems.cartItems CartData={CartData} setTotal={setTotal} total={total} />
        </div>
        </div>
    )
    }
    else return (
        <div className = "cart">
        <div className = "empty-cart" id = "empty-cart">
            {"Cart is empty"}
        </div>
        <div className = "item-row" >
            <CartItems.cartItems CartData={CartData} setTotal={setTotal} total={total} />
        </div>
        </div>
    )
}
