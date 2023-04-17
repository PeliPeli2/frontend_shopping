import { createContext, ReactNode, useContext, useState } from "react";


type CartProviderProps = {
    children : ReactNode
}

type CartContext = {
    setItem: (id: string, upsellid : string) => void
    getItem: (id: string, upsellid : string) => CartItem | undefined
    getItemQuantity: (id: string) => number
    incrementQuantity: (id: string) => void
    decrementQuantity: (id: string) => void
    removeItem: (id: string) => void
    upsellItem: (id: string, upsellId: string | null) => void
    getCost: (id: string) => number
    calculateCost: (id: string, price : number, discountPercent : number, discountQuantity : number) => void
    calculateTotal: () => number 
    formatTotal: (total : number) => string
    getItemNudge : (id : string, discountQuantity : number, discountPercent: number) => string
    cartItems: CartItem[]

}

type CartItem = {
    id : string
    quantity : number
    total : number
    show : boolean
    upSell : boolean
}

const CartContext = createContext({} as CartContext)

export function useCartContext(){
    return useContext(CartContext)
}

export function CartContextProvider({ children }: CartProviderProps ){

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function setItem(id: string, upsellid : string){
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id ) == null && currentItems.find(item => item.id === upsellid ) == null) {
                return [...currentItems, {id, quantity: 1, total: 0, show : true, upSell : false}]
            }
            else {
                return currentItems
            }
        })
    }

    function getItem(id: string, upsellId : string){
        if (cartItems.find(item => item.id === id)){
            return cartItems.find(item => item.id === id)
        }
        if (cartItems.find(item => item.id === upsellId)){
            return cartItems.find(item => item.id === upsellId)
        }
        else return 
    }

    function getItemQuantity(id: string){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function incrementQuantity(id: string){
        setCartItems(currentItems => {
                return currentItems.map(item => {
                    if (item.id === id){
                        return {...item,  quantity: item.quantity + 1}
                    }
                    else {
                        return item
                    }
                })
        })
    }
    function decrementQuantity(id: string){
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems
            }
            else {
                return currentItems.map(item => {
                    if (item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }
    function removeItem(id: string){
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) != null) {
                return currentItems.map(item => {
                    if (item.id === id){
                        return {...item, quantity : 0, total : 0, show : false}
                    }
                    else {
                        return item
                    }
                })
            }
            else return currentItems
        })
    }

    function upsellItem(id: string, upsellId : string | null){
        if (upsellId != null){
            setCartItems(currentItems => {
                if (currentItems.find(item => item.id === id) == null) {
                    return currentItems
                }
                else {
                    return currentItems.map(item => {
                        if (item.id === id){
                            return {...item, quantity : 1, id : upsellId, total : 0, upSell: true}
                        }
                        else {
                            return item
                        }
                    })
                }
            })
            
        }
    }
    function getCost(id: string){
        let cost = 0
        cartItems.filter(item => {
            if (item.id === id){
                return cost = item.total
            }
            else {
                return cost

            }
        })
        return cost
    }
    function calculateCost (id: string, price : number, discountPercent : number, discountQuantity : number) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id ) == null){
                return currentItems
            }
            else {
                return currentItems.map(item => {
                    if (item.id === id && item.quantity >= discountQuantity){
                        return {...item, total : price * item.quantity * ((100-discountPercent)/100)}
                    }
                    else if (item.id === id && item.quantity < discountQuantity){
                        return {...item, total : price * item.quantity}
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }
    function calculateTotal(){
        let total = 0
        if (cartItems){
            cartItems.map(item => {
                total += item.total
            })
            if (total == 0 ){
                return total
            }
            else if (total >= 300){
                total = total * (100-10)/100
                return total
            }
            else return total
        }  
        else return total
    }
    function getItemNudge(id: string, discountQuantity: number, discountPercent : number){
        let nudge = ""
        cartItems.filter(item => {
            if (item.id === id && discountQuantity > item.quantity){
                nudge = "Buy " + discountQuantity + " or more to get " + discountPercent +"% discount" 
            }
            else if (item.id === id && discountQuantity <= item.quantity){
                nudge
            }
            else {
                nudge
            }
        })
        return nudge

    }

    function formatTotal(total: number){
        if (total != 0){
            return "Total Cost: " + total.toLocaleString("da-DK",{minimumFractionDigits:2}) + " DKK"
        }
        else {
            return "Basket is Empty"
        }
    }
    return (
        <CartContext.Provider value={{getItemQuantity,incrementQuantity, decrementQuantity, getItem, setItem, removeItem,  upsellItem, cartItems, getCost, calculateCost, calculateTotal, getItemNudge, formatTotal}}>
            {children}
        </CartContext.Provider>
    )
}