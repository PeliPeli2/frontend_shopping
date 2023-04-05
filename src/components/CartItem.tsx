import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { Item } from "./Item";
import { UpsellItem } from "./UpsellItem";

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

    const {setItem, getItem, } = useCartContext()

    const upSellItem = cartData.cartData.find(cartItem => cartItem.id === item.upsellProductId)
    const [itemData, setItemData] = useState(() => {
        if (upSellItem){
        setItem(item.id, upSellItem.id)
        return getItem(item.id, upSellItem.id)
        }
    })

    useEffect(() => {
        if (upSellItem){
        setItemData(getItem(item.id, upSellItem.id))
        }
    })

    if(itemData && itemData.show && !itemData.upSell)
    return (
    <Item item={item} />
    )

    if(itemData && itemData.show && itemData.upSell && upSellItem)
    return (
    <UpsellItem item={upSellItem}/>
    )

    else return <div></div>
}

