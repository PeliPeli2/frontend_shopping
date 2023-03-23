import React, { useState } from "react";
import {Simulate} from "react-dom/test-utils";

export function UserForms() {
    const [zipInput, setZipInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [zipError, setZipError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);




    async function fetchZipCodes() {
        const response = await fetch("https://api.dataforsyningen.dk/postnumre");
        const data = await response.json();
        // create a map of zip codes to city names
        let zipToCityMap = new Map<string, string>();
        for (let i = 0; i < data.length; i++) {
            zipToCityMap.set(data[i]["nr"], data[i]["navn"]);
        }
        return zipToCityMap;
    }


    async function isValidInput({zipInput, zipToCityMap,}: {
        zipInput: string;
        zipToCityMap: Map<string, string>;
    }) {
        if (zipToCityMap.has(zipInput)) {
            return true;
        }
        return false;
    }

    async function zipValidation(event: { target: { value: string } }) {
        const input = event.target.value;
        const zipToCityMap = await fetchZipCodes();
        setZipInput(input)
        if (await isValidInput({ zipInput: input, zipToCityMap }) || (input == "")) {
            const city = zipToCityMap.get(input) as string;
            setCityInput(city);
            setCityError(false)
            setZipError(false);
        }
        else {
            setZipError(true);
            if (cityInput == "")
                setCityInput("")
        }}

    function cityName(event: { target: { value: string; }; }) {
        const input = event.target.value;
        if (zipError == true || zipInput == "") {
            setCityInput(input)
            if (input == "" ) {
                setCityError(true)
            }
            else {
                setCityError(false)
            }
        }
    }


    function phoneValidation(event: { target: { checkValidity: () => boolean; }; }) {
        if (event.target.checkValidity()==true) {
            setPhoneError(false)
            return true;
        }
        else {
            setPhoneError(true);
            return false;
        }}


    function emailValidation(event: { target: { checkValidity: () => boolean; }; }){
        if (event.target.checkValidity()==true) {
            setEmailError(false)
            return true;
        }
        else {
            setEmailError(true);
            return false
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
                    <input type="text" value={zipInput} autoFocus={true} onChange={zipValidation}
                           required pattern="[0-9]{4}" name="zip" id="zip"/>
                    {zipError && <div className={"error"}> Invalid zip code </div>}



                </label>
                <label>
                    <h2>City: </h2>
                    <input type="text" value={cityInput} onChange={cityName}  required name="city" />
                    {cityError && <div className={"error"}> City required </div>}

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
                    <input type="tel" required pattern="[0-9]{8}" name="phone" id="phone" onChange={phoneValidation} />
                    {phoneError && <div className={"error"}> Invalid phone number </div>}

                </label>
                <label>
                    <h2> Email: </h2>
                    <input type="email" required name="email" id="email" onChange={emailValidation} />
                    {emailError && <div className={"error"}> Invalid Email </div>}

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


