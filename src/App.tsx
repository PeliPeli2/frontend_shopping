import * as Cart from './Cart'
import * as UserForms from "./UserForms"

export default function App() {
  return (
    <div className = "app">
      <h1>Shopping Cart</h1>
      <div>
      <Cart.createCart  />
      </div>
      <div>
      <UserForms.userinput />
      </div>
    </div>
  )
}
