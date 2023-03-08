import * as Cart from './Cart'
import {userinput} from "./UserForms"




export default function App() {
  return (
    <div className = "app">
      <h1>Shopping Cart</h1>
      <div>
      <Cart.createCart  />
      </div>
        {userinput()}
    </div>
  )
}
