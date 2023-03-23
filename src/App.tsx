import {Cart} from './components/Cart'
import { UserForm } from './components/UserForms'
import { useEffect, useState } from 'react';
import { CartContextProvider } from './context/CartContext';
export default function App() {

  const [cartdata, setCartData] = useState();

  useEffect(() => {
      // fetch data
      const dataFetch = async () => {
          const data = await (
              await fetch("https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json")
          ).json();
  
        // set state when the data received
          setCartData(data);
      };  
  
      dataFetch();
  }, []);

  if (cartdata){
      return (
    <CartContextProvider>
      <div className = "app">
        <h1>Shopping Cart</h1>
        <div>
        <Cart cartData={cartdata}/>
        </div>
        {    
        <div>
        <UserForm/>
        </div>
    }
      </div>
    </CartContextProvider>
      )
  }
  else {
      return <div>No Cart Data Found</div>
  }
}

