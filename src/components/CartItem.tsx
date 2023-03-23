import { useEffect, useState } from "react";
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
interface CartItemsProps {cartData: ({
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
    imageUrl : string;
})[]}
interface Props {
    item: ItemProp;
    cartData: CartItemsProps
   
}

export function CartItem({item, cartData}: Props){

    const {getItemQuantity, incrementQuantity, decrementQuantity, removeItem, upsellItem, cartItems,getCost, calculateCost, getItemNudge} = useCartContext()

    const itemQuantity = getItemQuantity(item.id)
    const [show, setShow] = useState(true)
    const [upSell, setUpSell] = useState(false)
    const itemNudge = getItemNudge(item.id, item.rebateQuantity, item.rebatePercent)
    const itemCost = getCost(item.id)

    const upSellItem = cartData.cartData.find(cartItem => cartItem.id === item.upsellProductId)
    const upSellItemNudge = getItemNudge(upSellItem!!.id, upSellItem!!.rebateQuantity, upSellItem!!.rebatePercent)
    const upSellItemQuantity = getItemQuantity(item.upsellProductId)
    const upSellItemCost = getCost(item.upsellProductId)

    
    const [itemData, setItemData] = useState(item)

    useEffect(() => {
        incrementQuantity(item.id)
        calculateCost(item.id, item.price, item.rebatePercent, item.rebateQuantity)
        
    },[])

    
    useEffect(()=> {
        console.log(cartItems)
    },[!upSell])

    if(show && !upSell && upSellItem)
    return (
        
    <div className ="cart-container">
        <div className="image-box">
            <img src={item.imageUrl}>
            </img>

        </div>
        <div className ="cartitem-info">
            <h1>
            {item.name.split(", ")[0]}
            </h1>
            <h2>
                some info
            </h2>
            <h3>
                {itemNudge}
            </h3>
        </div>
        <div className = "upsell" >
        <button className = "upsell-button" onClick={() => {
            upsellItem(item.id, item.upsellProductId)
            calculateCost(upSellItem.id, upSellItem.price, upSellItem.rebatePercent, upSellItem.rebateQuantity)
            setUpSell(!upSell)

            }}>
            Upgrade Item
        </button>
        </div>
        <div className = "adjusters">
            <button className = "increment-button"  onClick={() => {
                incrementQuantity(item.id,)
                calculateCost(item.id, item.price, item.rebatePercent, item.rebateQuantity)}}>
                increment
            </button>
            <p>
            {itemQuantity}
            </p>
            <button className = "decrement-button" onClick={() => {
                decrementQuantity(item.id)
                calculateCost(item.id, item.price, item.rebatePercent, item.rebateQuantity)}}>
                decrement
            </button>
        </div>
        <div className = "item-cost">
            {itemCost + " DKK"}
        </div>
        <div className ="delete">
        <button className = "delete-button" onClick={() => {
            setShow(false)
            removeItem(item.id)
            }}>
            remove 
        </button>
        </div>
        </div>
    )
        if(show && upSell && upSellItem)
        return (
        
            <div className ="cart-container">
            <div className="image-box">
                <img src={upSellItem.imageUrl}>
                </img>
    
            </div>
            <div className ="cartitem-info">
                <h1>
                {upSellItem.name.split(",")[0]}
                </h1>
                <h2>
                    some info
                </h2>
                <h3>
                    {upSellItemNudge}
                </h3>
            </div>
            <div className = "upsell-padding"></div>
            <div className = "adjusters">
                <button className = "increment-button"  onClick={() => {
                    incrementQuantity(upSellItem.id,)
                    calculateCost(upSellItem.id, upSellItem.price, upSellItem.rebatePercent, upSellItem.rebateQuantity)}}>
                    increment
                </button>
                <p>
                {upSellItemQuantity}
                </p>
                <button className = "decrement-button" onClick={() => {
                    decrementQuantity(upSellItem.id)
                    calculateCost(upSellItem.id, upSellItem.price, upSellItem.rebatePercent, upSellItem.rebateQuantity)}}>
                    decrement
                </button>
            </div>
            <div className = "item-cost">
                {upSellItemCost + " DKK"}
            </div>
            <div className ="delete">
            <button className = "delete-button" onClick={() => {
                setShow(false)
                removeItem(upSellItem.id)
                }}>
                remove 
            </button>
            </div>
            </div>
        )
    else return <div></div>
}

