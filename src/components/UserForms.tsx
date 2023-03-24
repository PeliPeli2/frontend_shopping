import React, { useState } from "react";
import '../styles/userforms.css'
import {Simulate} from "react-dom/test-utils";

export function UserForms() {

    const [zipInput, setZipInput] = useState("");
    const [zipError, setZipError] = useState(true);

    const [cityInput, setCityInput] = useState("");
    const [cityError, setCityError] = useState(true);

    const [phoneInput, setPhoneInput] = useState("");
    const [phoneError, setPhoneError] = useState(true);

    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState(true);

    const [nameInput, setNameInput] = useState("");
    const [nameError, setNameError] = useState(true);

    const [adressInput, setadressInput] = useState("");
    const [addressError, setAddressError] = useState(true);

    const [termsError, setTermsError] = useState(true);

    const [detailsInput, setDetailsInput] = useState("");




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
        }
        else {
            setPhoneError(true);
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
    // function that checks if zip, phone and email is valid, and if the rest are filled out
    function checkForm(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const phone = document.getElementById('phone') as HTMLInputElement
        const email = document.getElementById('email') as HTMLInputElement
        const zip = document.getElementById('zip') as HTMLInputElement
    // check if the rest of the fields are filled out
        const name = document.getElementById('name') as HTMLInputElement
        const address = document.getElementById('address') as HTMLInputElement
        const city = document.getElementById('city') as HTMLInputElement
        const terms = document.getElementById('terms') as HTMLInputElement

        if (phone.checkValidity() == false) {
            setPhoneError(true)
        }
        if (email.checkValidity() == false) {
            setEmailError(true)
        }
        if (zip.checkValidity() == false) {
            setZipError(true)
        }
        if (name.value == ""){
            setNameError(true)
        }
        if (address.value === "") {
            setAddressError(true)
        }

        if (city.value === "") {
            setCityError(true)
        }
        if(terms.checked == false) {
            setTermsError(true)
        }
        if(!zipError && !cityError && !nameError && !phoneError && !termsError && !emailError && !addressError) {
            submitCart()
        }
    }

    async function submitCart(){

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');

        const responseLogin = await fetch('https://eoqqodxrlkk1wwk.m.pipedream.net', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(zipInput)
        })
             .then((response) => response)
             .then((data) => {
                console.log(data);
                // Handle data
             })
             .catch((err) => {
                
                console.log(err.message);
             });
    }










    return (
        <div className = "user-form">
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
                    <input type="text" id="city" value={cityInput} onChange={cityName}  required name="city" />
                    {cityError && <div className={"error"}> City required </div>}

                </label>
                <label>
                    <h2>Address: </h2>
                    <input type="text" id="address" required name="address" />
                    {addressError && <div className={"error"}> Address required </div>}
                </label>
                <label>
                    <h2>Name: </h2>
                    <input type="text" id="name" required name="name" />
                    {nameError && <div className={"error"}> Name required </div>}
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
                <input type="checkbox" id="terms" name="terms" required/>
                    I accept the terms and conditions.
                {termsError && <div className={"error"}> You must accept the terms and conditions </div>}
                <br/>
                <input type="checkbox" name="marketing" />
                    I want to receive marketing emails.
                <br/>
                <button onClick={checkForm}>Go to payment</button>
            </form>

        </div>
    )}


