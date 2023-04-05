import {Cart} from './components/Cart'
import { UserForms } from './components/UserForms'
import { useEffect, useState } from 'react';
import { CartContextProvider } from './context/CartContext';
import { FormContextProvider } from './context/FormContext';
export default function App() {

  const [cartdata, setCartData] = useState();
  const [page, setPage] = useState("count");
  const [navigating, setNavigating] = useState(true);

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


  useEffect(() => {
    function popstateHandler() {
      const url = new URLSearchParams(window.location.search);
      const urlPage = url.get("page");
      console.log("popstate", { urlPage });
      setPage(urlPage || "cart");
      setNavigating(true);
    }
    addEventListener("popstate", popstateHandler);
    popstateHandler();
    // force it to start on cart on refresh
    setPage("cart")
    return () => {
      removeEventListener("popstate", popstateHandler);
    };
  }, []);
  useEffect(() => {
    setNavigating(false);
  }, [navigating]);
  function navigate(ev: React.MouseEvent<HTMLAnchorElement>, newPage: string) {
    ev.preventDefault();
    history.pushState({}, "", `?page=${newPage}`);
    dispatchEvent(new PopStateEvent("popstate"));
  }
  if (cartdata){
      return (
    <FormContextProvider>
    <CartContextProvider>
      <div className = "app">
        <h1>Shopping Cart</h1>
        <div>
      <a onClick={(ev) => navigate(ev, "cart")}>Cart</a> |{" "}
      <a onClick={(ev) => navigate(ev, "form")}>Form</a>
      {page === "cart" && (
        
      <Cart cartData={cartdata}/>
      )}
      {page === "form" && (
      <UserForms/>
      )}
        </div>
      </div>
    </CartContextProvider>
    </FormContextProvider>
      )
  }
  else {
      return <div>No Cart Data Found</div>
  }
}

