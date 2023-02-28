import React, { EventHandler, MouseEventHandler, ReactEventHandler, useEffect, useState } from "react"



export function createCart({data : cartInfo , count : initial}: any ) {

    var initialcost = 0
    cartInfo.map((data: { price: any }) => {
        initialcost = initialcost + data.price * initial
        
    })

    const [total, setTotal] = useState(initialcost)

    return (
        <div className = "cart">
        <div className = "cart-total" id = "cart-cost">
            {"Total Cart Cost: " + total + " DKK"}
        </div>
        <div className = "item-row" >  
        {
        
        
        cartInfo && cartInfo.map((productInfo: { name: string; price: number; id: string }) => {

            const [count, setCount]  = useState(0);
            const [show, setShow] = useState(Math.random());            
            
            

            
        
            function increment(cost : any) {
                setTotal(total+cost)
                setCount(count+1);

        
                
            }
            function decrement(cost : any) {
                if (count != 0){
                setCount(count-1);
                setTotal(total-cost)
                
                }
                
            }
            function deleteitem(id : any, cost : number, count : number) {
                setTotal(total-(cost*count))
                var product = document.getElementById("item"+id)
                product?.remove()


            }
            if (show > 0.9){
            
            return (
                <div className = "item-card" id = {"item"+productInfo.id}>
                    <h2 className = "product-info" >
                    {'Name: ' + productInfo.name + ' ' + 'Price: ' + productInfo.price + ' DKK' + ' pr. styk '}
                    </h2>
                    
                    <div className = "item-amount">
                        {"Amount: " + count}
                    </div>
                    
                    <div className = "adjusters">
                        <button className = "decrement-button" onClick={() => decrement(productInfo.price,)} >
                        -
                        </button>
                        <button className = "increment-button" onClick={() => increment(productInfo.price,)} >
                        +
                        </button>
                    </div>
                    
                    <button className = "delete-button" onClick={() => deleteitem(productInfo.id, productInfo.price, count)} >
                    x
                    </button >
                    
                    <div className = "items-cost">
                    {"Cost: " + count*productInfo.price + " DKK"} 
                    </div>
                
                </div>
        
        

            )
            }
        }
        )}
        </div>
        </div>
    )
}
