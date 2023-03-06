import React, {useEffect, useState } from "react"

interface cartItemsProps {CartData: ({
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: null;
} | {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
})[], 
setTotal : (total : number) => void,
total : number}

export function cartItems({CartData, setTotal, total} : cartItemsProps){

    var tmptotal = 0

    return (
        <div>
        {
        
        

        CartData && CartData.map((productInfo) => {




            const [show, setShow] = useState(Math.random());        
            const [count, setCount]  = useState(1);
            
            
            function increment(cost : number) {
                setTotal(total+cost)
                setCount(count+1);    
            }

            function incrementInitialTotal(price: number){
                setTotal(total+price)
            }
            function decrement(cost : number) {
                if (count != 1){
                setCount(count-1);
                setTotal(total-cost)    
                }
            }

            function deleteitem(id : string, cost : number, count : number) {
                setTotal(total-(cost*count))
                var product = document.getElementById("item"+id)
                product?.remove()
                
            }


            // randomizer
            if (show > 0.9){      
            
                tmptotal = tmptotal+productInfo.price
                useEffect(()=>{
                    setTotal(tmptotal)
                }, [tmptotal])
            
            


            return (
                <div key={"key"+productInfo.id} className = "item-card" id = {"item"+productInfo.id}>
                    <h2 className = "product-info" >
                    {'Name: ' + productInfo.name + ' ' + 'Price: ' + productInfo.price + " " + productInfo.currency + ' pr. styk '}
                    </h2>
                    
                    <div className = "item-amount">
                        {"Amount: " + count}
                    </div>
                    
                    <div className = "adjusters" >
                        <button className = "decrement-button" onClick={() => decrement(productInfo.price,)} >
                        -
                        </button>
                        <button className = "increment-button"  onClick={() => increment(productInfo.price,)} >
                        +
                        </button>
            
                    </div>
                    
                    
                    <button className = "delete-button" onClick={() => deleteitem(productInfo.id, productInfo.price, count)} >
                    x
                    </button >
                    
                    <div className = "items-cost">
                    {"Cost: " + count*productInfo.price + " " + productInfo.currency} 
                    </div>
                    
                
                </div>
                )
                
            }
            
        }
        )
        }
        </div>
        )
        
        
}