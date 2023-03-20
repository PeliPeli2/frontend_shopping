import * as Cart from './Cart'
import * as UserForms from "./UserForms"
import { CartTotalContextProvider } from './context/CartContext'

export default function App() {
  return (
    <CartTotalContextProvider>
      <div className = "app">
        <h1>Shopping Cart</h1>
        <div>
        <Cart.createCart />
        </div>
        <div>
        <UserForms.userinput />
        </div>
      </div>
    </CartTotalContextProvider>
  )
}

