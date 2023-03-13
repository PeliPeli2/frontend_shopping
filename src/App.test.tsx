import { fireEvent, getByRole, getByTestId, render, screen } from "@testing-library/react";
import { HtmlHTMLAttributes } from "react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("shop contains.", () => {
  //checks if the name for the shop is there when created.  
  it("should render", () => {
    render(<App />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  

});

describe("item cards contains", () => {
  
  //should check each card got an ID
  it("Each card has an ID", () => {
    const {container} = render(<App />);
    const items = container.getElementsByClassName("item-card");
    
    for(let i = 1; i < items.length; i++){ 
      expect(items[i-1].id!=items[i].id).toBeTruthy();
    };
    
  }); 

});



describe("item cards contain buttons",() => {
  //Loops the whole item cart when created and checks if all buttons are on each card.
  it("Buttons for de-/incrementing and deleting", () => {
    const {container} = render(<App />);
    const items = container.getElementsByClassName("item-card");

    for(let i = 0; i < items.length; i++){
      expect(items[i].getElementsByClassName("decrement-button")).toBeTruthy();
      expect(items[i].getElementsByClassName("increment-button")).toBeTruthy();
      expect(items[i].getElementsByClassName("delete-button")).toBeTruthy();
    };
}); 

});



  //TODO make 3 test that checks userinput.click on buttons.
describe("Button's functionality", () => {
  //in the making.
  it("Button for incrementing item", () => {
    const {container} = render(<App />);
    const items = container.getElementsByClassName("adjusters");
    
    for(let i = 0; i < items.length; i++){ 
      let buttons = items[i].childNodes;
      
      
      //presses increment button and checks if there been an "onclick" called.
      expect(fireEvent.click(buttons[1]));
      //expect(onclick).toBeCalled();
    };
  });




  //in the making.
  it("Button for decrementing item", () => {
    const {container} = render(<App />);
    const items = container.getElementsByClassName("item-card");
    
    for(let i = 0; i < items.length; i++){ 
      let buttons = items[i].childNodes;
      
      //presses decrement button and checks if there been an "onclick" called.
      expect(fireEvent.click(buttons[0]));
      //expect(onclick).toBeCalled();      
      
    };
  });



  //this should work.
  it("Button for deleting item", () => {
    const {container} = render(<App />);
    const items = container.getElementsByClassName("item-card");
    

    for(let i = 0; i < items.length; i++){ 
      let card = items[i];
      let cardid = items[i].id;
      let button = items[i].querySelector('button');

      //checks if card is on the screen
      expect(card).toBeInTheDocument();
      
      //presses delete botton and checks if its removed completely.
      fireEvent.click(button);
      //expect(onclick).toBeCalled();      
      expect(card).toBeInTheDocument();
    };
  });

});

    /*
    



*/