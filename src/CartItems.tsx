import React, {useEffect, useState } from "react"

interface CartItemsProps {cartdata: ({
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

export function cartItems({cartdata, setTotal, total} : CartItemsProps){

    var tmptotal = 0

    return (
        <div>
        {

        cartdata && cartdata.map((productInfo) => {

            const [show, setShow] = useState(Math.random());        
            const [count, setCount]  = useState(1);
            
            
            function increment(cost : number, discountQuantity : number, discountPercent : number) {
                setCount(count+1);
                if (count+1 == discountQuantity){
                    // removing discount for each count from total & increasing total by discounted price of next item
                    setTotal(total+cost*(((100-discountPercent)/100))-(count*(cost*(discountPercent/100))))
                }
                else if (count+1 > discountQuantity){
                    //increasing total by discounted price
                    setTotal(total+cost*(((100-discountPercent)/100)))
                }
                else {
                    setTotal(total+cost)
                }

            }

            function decrement(cost : number, discountQuantity : number, discountPercent : number) {
                if (count != 1){
                    setCount(count-1);
                    if (count == discountQuantity){
                        //adding back the prediscount price to total for the remaining items
                        setTotal(total-cost*(((100-discountPercent)/100))+((count-1)*(cost*(discountPercent/100))))
                    }
                    else if (count > discountQuantity){
                        //removing discounted price from total
                        setTotal(total-cost*(((100-discountPercent)/100)))
                    }
                    else {
                        setTotal(total-cost)
                    }

                }
            }

            function deleteitem(id : string, cost : number, discountQuantity : number, discountPercent : number) {
                if (count >= discountQuantity){
                    setTotal(total-(count*(cost*((100-discountPercent)/100))))
                }
                else {
                    setTotal(total-(cost*count))
                }
                var product = document.getElementById("item"+id)
                product?.remove()
                
            }


            // randomizer
            if (show > 0.9){      
            
                //initially calculate total (all items start with a count of 1) & setup initial discount nudges
                tmptotal = tmptotal+productInfo.price
                useEffect(()=>{
                    setTotal(tmptotal)
                    if (productInfo.rebateQuantity != 0){
                        document.getElementById("itemdiscount"+productInfo.id)!!.innerHTML = 'Buy ' + productInfo.rebateQuantity + ' or more to get ' + productInfo.rebatePercent + '% discount!'
                        
                    }
                }, [tmptotal])

                // change discount nudge & discount cost depending on item count
                useEffect(()=> {
                    if (count >= productInfo.rebateQuantity && productInfo.rebateQuantity != 0){
                        document.getElementById("itemdiscount"+productInfo.id)!!.innerHTML = ""
                        document.getElementById("items-discountcost"+productInfo.id)!!.innerHTML = "Discounted Cost: " +count*((productInfo.price)*(100-productInfo.rebatePercent)/100)

                    }
                    if (productInfo.rebateQuantity != 0 && count < productInfo.rebateQuantity) {
                        document.getElementById("itemdiscount"+productInfo.id)!!.innerHTML = 'Buy ' + productInfo.rebateQuantity + ' or more to get ' + productInfo.rebatePercent + '% discount!'
                        document.getElementById("items-discountcost"+productInfo.id)!!.innerHTML = ""
                    }
                }, [count])

            return (
                <div key={"key"+productInfo.id} className = "item-card" id = {"item"+productInfo.id}>
                    <h2 className = "product-info" >
                    {'Name: ' + productInfo.name + ' ' + 'Price: ' + productInfo.price + " " + productInfo.currency + ' pr. styk '}
                    </h2>
                    <div className = "item-discount" id = {"itemdiscount"+productInfo.id}>
                    
                    </div>
                    <div className = "item-amount">
                        {"Amount: " + count}
                    </div>
                    <div className = "adjusters" >
                        <button className = "decrement-button" onClick={() => decrement(productInfo.price,productInfo.rebateQuantity, productInfo.rebatePercent)} >
                        -
                        </button>
                        <button className = "increment-button"  onClick={() => increment(productInfo.price,productInfo.rebateQuantity, productInfo.rebatePercent)} >
                        +
                        </button>
            
                    </div>
                    
                    
                    <button className = "delete-button" onClick={() => deleteitem(productInfo.id, productInfo.price, productInfo.rebateQuantity, productInfo.rebatePercent)} >
                    x
                    </button >
                    
                    <div className = "items-cost">
                    {"Cost: " + count*productInfo.price + " " + productInfo.currency} 
                    </div>
                    <div className = "items-discountcost" id = {"items-discountcost"+productInfo.id}>
                    
                    </div>
                    
                
                </div>
                )         
            }      
        })}
        </div>
    )
}