//@ts-nocheck
import React, { useState } from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;



export function UserForm() {

    async function fetchnumbers() {
        const response = await fetch("https://api.dataforsyningen.dk/postnumre");
        const data = await response.json();
        // create a map of zip codes to city names
        let zipToCityMap = new Map<string, string>();
        for (let i = 0; i < data.length; i++) {
            zipToCityMap.set(data[i]["nr"], data[i]["navn"]);
        }
        return zipToCityMap;
    }

    const [userInput, setUserInput] = useState("");
    const [cityInput, setCityInput] = useState("");

    async function isValidInput({userInput, zipToCityMap,}: {
        userInput: string;
        zipToCityMap: Map<string, string>;
    }) {
        if (zipToCityMap.has(userInput)) {
            return true;
        }
        return false;
    }

    async function handleInputChange(event: { target: { value: string } }) {
        const input = event.target.value;
        const error = document.getElementById("error");
        const zipToCityMap = await fetchnumbers();
        setUserInput(input)
        if (await isValidInput({ userInput: input, zipToCityMap }) || (input == "")) {
            const city = zipToCityMap.get(input);
            setCityInput(city);
            error.style.display = "none";
        }
        else {
            // display error message
            error.style.display = "block";
            if (cityInput == "")
            setCityInput("")
        }}

    function handleCityInputChange(event: { target: { value: string; }; }) {
        const input = event.target.value;
        setCityInput(input);
    }
        function phonevalidation(){
            const phone = document.getElementById("phone");
            const error = document.getElementById("error1");
            const phoneRegex = new RegExp("^[0-9]{8}$");
            if (phoneRegex.test(phone.value) || (phone.value == "")){
                error.style.display = "none";
            }
            else {
                error.style.display = "block";
            }
        }
        function emailvalidation(){
            const email = document.getElementById("email");
            const error = document.getElementById("error2");
            const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");
            email.addEventListener('input', emailvalidation);{
                if (emailRegex.test(email.value) || (email.value == "")){
                    error.style.display = "none";
                }
                else {
                    error.style.display = "block";
                }
            }}





    return (
        <div className = "user-input">
            <h1> Your Information </h1>
            <form>
                <label>
                    <h2>Country: </h2>
                    Denmark
                </label>
                <label>
                    <h2>Zip Code: </h2>
                    <input type="text" value={userInput} autoFocus={true} onChange={handleInputChange}
                           required pattern="[0-9]{4}" name="zip" id="zip"/>
                    <div id={"error"}> { "Invalid zip code"} </div>



                </label>
                <label>
                    <h2>City: </h2>
                    <input type="text" value={cityInput} onChange={handleCityInputChange}  required name="city" />
                </label>
                <label>
                    <h2>Address: </h2>
                    <input type="text" required name="address" />
                </label>
                <label>
                    <h2>Name: </h2>
                    <input type="text" required name="name" />
                </label> <br/>
                <label>
                    <h2>Phone Number: </h2>
                    <input type="tel" required pattern="[0-9]{8}" name="phone" id="phone" onChange={phonevalidation} />
                    <div id={"error1"}> { "Invalid phone number"} </div>
                </label>
                <label>
                    <h2> Email: </h2>
                    <input type="email" required name="email" id="email" onChange={emailvalidation} />
                    <div id={"error2"}> { "Invalid email"} </div>
                </label>
                <label>
                    <h2>Company name: </h2>
                    <input type="text" name="company" />
                </label>
                <label>
                    <h2>Company CVR: </h2>
                    <input type="text" name="cvr" pattern="{8}" />
                </label> <br/>
                <button>Go to payment</button>
            </form>

        </div>
    )}


