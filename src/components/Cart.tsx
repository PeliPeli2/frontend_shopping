import { CartItem } from './CartItem';
import { useCartContext } from '../context/CartContext';
import '../styles/cart.css'
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


export function Cart({cartData}: CartItemsProps){
    
    const {calculateTotal, formatTotal} = useCartContext()

    const total = calculateTotal()
    

    return (
        <ul>
            <h2 >{formatTotal(total)}</h2>
            {cartData.filter(item => item.upsellProductId != null).slice(0,5).map(filtereditem=> (
                
                <li key={filtereditem.id}>
                    <CartItem item={filtereditem} cartData={{cartData}}/>
                </li>
            ))}
        </ul>
    )
}
