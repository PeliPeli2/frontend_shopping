import React, {useState } from "react"
import CartData from './data.json'
import * as CartItems from './CartItems'


export function createCart() {

    var initialCount = 0
    
    var initialcost = 0
    CartData.map((data: { price: any }) => {
        initialcost = initialcost + data.price * initialCount
        
    })

    const [total, setTotal] = useState(initialcost)

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
