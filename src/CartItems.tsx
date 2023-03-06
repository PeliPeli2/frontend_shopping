import React, {useState } from "react"


export function cartItems({CartData, setTotal, total} : any) : any{
    return (
        CartData && CartData.map((productInfo: { name: string; price: number; id: string }) => {

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

        ))

}
// function to get a number from the url "https://api.dataforsyningen.dk/postnumre'2 and check if it is a valid zip code
export function userinput() {
    return (
        <div className = "user-input">
            <h1> User Input </h1>
                <form>
                    <label>
                        <h2>Country: </h2>
                        Denmark
                    </label>
                    <label>
                        <h2>Zip Code: </h2>
                        <input type="number" name="zip" />
                    </label>
                    <label>
                        <h2>City: </h2>
                        <input type="text" name="city" />
                    </label>
                    <label>
                        <h2>Address: </h2>
                        <input type="text" name="address" />
                    </label> <br/>
                    <label>
                        <h2>Name: </h2>
                        <input type="text" name="name" />
                    </label> <br/>
                    <label>
                        <h2>Phone Number: </h2>
                        <input type="tel" name="phone" />
                    </label>
                    <label>
                        <h2> Email: </h2>
                        <input type="text" name="email" />
                    </label> <br/>
                    <label>
                        <h2>Company name: </h2>
                        <input type="text" name="company" />
                    </label>
                    <label>
                        <h2>Company CVR: </h2>
                        <input type="text" name="cvr" />
                    </label> <br/>
                </form>
            </div>
    )
}

