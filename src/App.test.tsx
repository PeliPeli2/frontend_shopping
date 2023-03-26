import { findAllByRole, fireEvent, getByRole, getByTestId, render, screen } from "@testing-library/react";
import { HtmlHTMLAttributes } from "react";
import { describe, expect, it } from "vitest";
import App from "./App";


describe("shop contains.", () => {
  //checks if the name for the shop is there when created.  
  it("should render", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", {name : "Shopping Cart"})).toBeInTheDocument()
  });
});

describe("item list contains", () => {
  //should check list length
  it("List contains all 5 initial items", async () => {
    render(<App />);
    const items = (await screen.findAllByRole("listitem"))
    expect(items.length).toBe(5)
    
}); 

describe("first item exists", () => {
  const name = "C-vitamin"
  //check if item with this name is present
  it("Item has name", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", {name : name})).toBeInTheDocument()
  })
    
}); 
describe("removing first item", () => {
  const name = "C-vitamin"
  //removed first item and check if its still there
  it("Item has name", async () => {
    render(<App />);
    // check if remove button on first list element exists
    expect(((await screen.findAllByText("remove")).at(0))).toBeInTheDocument();

    //check if first item with name exists
    expect(screen.queryByRole("heading", {name : name})).toBeInTheDocument()
    //fire event removing item
    fireEvent.click(screen.getAllByRole("button", {name : "remove"})[0])

    // check if the number of buttons have gone down by 1
    let items = (await screen.findAllByText("remove"))
    expect(items.length).toBe(4)
    //check if name of item is gone if so test is good
    expect(screen.queryByRole("heading", {name : name})).not.toBeInTheDocument()

  })


  describe("removing all items", () => {
    //removed all items and check basket empty text
    it("basket is empty", async () => {
      render(<App />);
      // wait for cart to be rendered
      expect(await screen.findByRole("heading", {name : "Shopping Cart"})).toBeInTheDocument()
      //fire all remove clicks on 5
      const buttons = screen.getAllByRole("button", {name : "remove"})
      buttons.forEach((item) => {
        fireEvent.click(item)
      })
      // check if basket empty text is present
      expect(await screen.findByRole("heading", {name : "Basket is Empty"})).toBeInTheDocument()

  
    })
      
  }); 
    
}); 




describe ("increment & decrement first item")
describe ("check initial total to include 10% discount")
describe ("check item cost & total after incrementing")
describe ("check total after removing first item")
describe ("check new name on first item after upsell clicked")
















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
     // fireEvent.click(button);
      //expect(onclick).toBeCalled();      
      expect(card).toBeInTheDocument();
    };
  });

});

    /*
    



*/