import { useEffect } from "react";
import { useCartContext } from "../context/CartContext";


interface ItemProp {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
    imageUrl : string;
}
export function Item ({item}: {item : ItemProp}){

    const {getItemQuantity, incrementQuantity, decrementQuantity, removeItem, upsellItem ,getCost, getItemNudge, calculateCost} = useCartContext()
    
    useEffect(() => {
        calculateCost(item.id, item.price, item.rebatePercent, item.rebateQuantity)
    },[])
    
    return (
    <div className ="cart-container">
        <div className="image-box">
            <img src={item.imageUrl} alt={item.name.split(", ")[0]}>
            </img>

        </div>
        <div className ="cartitem-info">
            <h1>
            {item.name.split(", ")[0]}
            </h1>
            <h2>
                {"Item cost: "+ item.price.toFixed(2) + " DKK"}
            </h2>
            <h3>
                {getItemNudge(item.id, item.rebateQuantity, item.rebatePercent)}
            </h3>
        </div>
        <div className = "upsell" >
        <button className = "upsell-button" onClick={() => {
            upsellItem(item.id, item.upsellProductId)
            

            }}>
            Upgrade Item
        </button>
        </div>
        <div className = "adjusters">
            <button className = "increment-button" onClick={() => {
                incrementQuantity(item.id,)
                calculateCost(item.id, item.price, item.rebatePercent, item.rebateQuantity)
                }}>
                +
            </button>
            <h4 className = "item-quantity">
            {getItemQuantity(item.id)}
            </h4>
            <button className = "decrement-button" onClick={() => {
                decrementQuantity(item.id)
                calculateCost(item.id, item.price, item.rebatePercent, item.rebateQuantity)
                }}>
                -
            </button>
        </div>
        <h4 className = "item-cost">
            {getCost(item.id) + " DKK"}
        </h4>
        <div className ="delete">
        <button className = "delete-button" onClick={() => {
            removeItem(item.id)
            calculateCost(item.id, item.price, item.rebatePercent, item.rebateQuantity)
            }}>
            remove 
        </button>
        </div>
    </div>
    )
}