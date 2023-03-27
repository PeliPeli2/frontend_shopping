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

describe ("increment & decrement first item", () => {
  it("incrementing & decrementing", async () => {
    render(<App />);

    //wait for app to be rendered
    expect(await screen.findByRole("heading", {name: "Shopping Cart"})).toBeInTheDocument()
    //fire event incrementing item
    fireEvent.click(screen.getAllByRole("button", {name : "increment"})[0])
    fireEvent.click(screen.getAllByRole("button", {name : "increment"})[0])

    // check if quantity has increased to 2 
    expect(await screen.findByRole("heading", {name: "2"})).toBeInTheDocument()
    expect(screen.getAllByRole("heading", {level : 4, name : "2"})[0])
    // fire event decementing item
    fireEvent.click(screen.getAllByRole("button", {name : "decrement"})[0])

    expect(await screen.findByRole("heading", {name: "1"})).toBeInTheDocument()
    expect(screen.getAllByRole("heading", {level : 4, name : "1"})[0])

  })
})

describe ("check total cost & item cost & total including 10% after 300", () => {
  it("Setting up initial cart & check total", async () => {
    render(<App />);

    //wait for app to be rendered
    expect(await screen.findByRole("heading", {name: "Shopping Cart"})).toBeInTheDocument()

    // increment all items to 1
    const buttons = screen.getAllByRole("button", {name : "increment"})
    buttons.forEach((item) => {
      fireEvent.click(item)
    })

    // total should be 560 so if it is 504 it included the discount
    expect(await screen.findByRole("heading", {name: "Total Cost: 504 DKK"})).toBeInTheDocument()
    // check first item to see if cost has increased
    expect (screen.getAllByRole("heading", {name: "150 DKK", level: 4})[0])

  })
})

describe("check item discount after incrementing & decrementing", () => {
  it("increment twice and decrement and checking", async () => {
    render(<App />);

    //wait for app to be rendered
    expect(await screen.findByRole("heading", {name: "Shopping Cart"})).toBeInTheDocument()

    //fire event incrementing item
    fireEvent.click(screen.getAllByRole("button", {name : "increment"})[0])
    fireEvent.click(screen.getAllByRole("button", {name : "increment"})[0])

    // check first item to see if cost of first item is 225 to include the 2 quantity discount
    expect (screen.getAllByRole("heading", {name: "225 DKK", level: 4})[0]).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole("button", {name : "decrement"})[0])

    // check first item to see if cost of first item is 150 to remove the discount and reset to normal cost
    expect (screen.getAllByRole("heading", {name: "150 DKK", level: 4})[0]).toBeInTheDocument()
  })
})

describe ("check total after removing first item", () => {
  it("increment once check total then remove and check again", async () => {
    render(<App />);

  //wait for app to be rendered
  expect(await screen.findByRole("heading", {name: "Shopping Cart"})).toBeInTheDocument()

  //fire event incrementing item
  fireEvent.click(screen.getAllByRole("button", {name : "increment"})[0])

  // check total to be incremented
  expect(await screen.findByRole("heading", {name: "Total Cost: 150 DKK"})).toBeInTheDocument()

  //fire event incrementing item
  fireEvent.click(screen.getAllByRole("button", {name : "remove"})[0])

  //check total to be empty
  expect(await screen.findByRole("heading", {name: "Basket is Empty"})).toBeInTheDocument()
  })
})

describe ("check new name on first item after upsell clicked", () => {
  it("upselling and checking first item name", async () => {
    render(<App />);

  //wait for app to be rendered
  expect(await screen.findByRole("heading", {name: "Shopping Cart"})).toBeInTheDocument()

  //fire event incrementing item
  fireEvent.click(screen.getAllByRole("button", {name : "Upgrade Item"})[0])
  })
})


});
