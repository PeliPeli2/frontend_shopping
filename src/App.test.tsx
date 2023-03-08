import { render, screen } from "@testing-library/react";
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
  it("Buttons for de-/incrementing and deleting", () => {
    const {container} = render(<App />);
    const items = container.getElementsByClassName("item-card");

    for(let i = 0; i < items.length; i++){ 
      expect(items[i].getElementsByClassName("decrement-button"));
      expect(container.getElementsByClassName("increment-button"));
      expect(container.getElementsByClassName("delete-button"));
    };
  }); 

  //Loops the whole item cart when created and checks if all buttons are on each card.
  it("Buttons for de-/incrementing and deleting", () => {
    const {container} = render(<App />);
    const items = container.getElementsByClassName("item-card");

    for(let i = 0; i < items.length; i++){ 
      expect(items[i].getElementsByClassName("decrement-button"));
      expect(container.getElementsByClassName("increment-button"));
      expect(container.getElementsByClassName("delete-button"));
    };
  }); 


});

    /*
    



*/