import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import '../styles/userforms.css'
export function UserForms(){

    const {cartItems, calculateTotal} = useCartContext()


    const zipToCityMap = fetchZipCodes();

    const [zipInput, setZipInput] = useState("");
    const [zipError, setZipError] = useState(false);

    const [cityInput, setCityInput] = useState("");
    const [cityError, setCityError] = useState(false);

    const [addressInput, setAddressInput] = useState("");
    const [addressError, setAddressError] = useState(false);

    const [billingInput, setBillingInput] = useState("");

    const [nameInput, setNameInput] = useState("");
    const [nameError, setNameError] = useState(false);

    const [phoneInput, setPhoneInput] = useState("");
    const [phoneError, setPhoneError] = useState(false);

    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [companyInput, setCompanyInput] = useState("");

    const [cvrInput, setCvrInput] = useState("");

    const [detailsInput, setDetailsInput] = useState("");

    const [termsInput, setTermsInput] = useState(false);
    const [termsError, setTermsError] = useState(false);

    const [marketingInput, setMarketingInput] = useState(false);

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

    async function zipValidation(event: React.FormEvent<HTMLInputElement>) {
        const input = event.currentTarget.value;
        setZipInput(input)
        if (await isValidZip(input) || (input == "")) {
            const city = (await zipToCityMap).get(input) as string;
            setCityInput(city);
            setCityError(false)
            setZipError(false);
        }
        else {
            setZipError(true);
            if (cityInput == "")
                setCityInput("")
    }}

    async function isValidZip(zip: string) {
        
        if ((await zipToCityMap).has(zip)) {
            return true;
        }
        return false;
    }
    

    function validateAddress(){
        if (addressInput == ""){
            setAddressError(true)
        }
        else {setAddressError(false)}
    }

    function validateName(){
        if (nameInput == ""){
            setNameError(true)
        }
        else {setNameError(false)}
    }
    function phoneValidation(event: React.FormEvent<HTMLInputElement>) {
        const input = event.currentTarget.value;
        setPhoneInput(input)
        if (event.currentTarget.checkValidity()==true) {
            setPhoneError(false)
        }
        else {
            setPhoneError(true);
    }}
    function emailValidation(event: React.FormEvent<HTMLInputElement>){
        const input = event.currentTarget.value;
        setEmailInput(input)
        if (event.currentTarget.checkValidity()==true) {
            setEmailError(false)
            return true;
        }
        else {
            setEmailError(true);
            return false
    }}

    async function submit(event: React.FormEvent<HTMLFormElement>){
        validateAddress()
        validateName()
        event.preventDefault()
        if (!zipError && !cityError && !addressError && !nameError && !phoneError && !emailError && !termsError){

            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
    
            const body = [{
                form: "formData",       
                country: "Denmark", 
                zip: zipInput,
                city: cityInput,
                address: addressInput,
                billing: billingInput,
                name: nameInput,
                phone: phoneInput,
                email: emailInput,
                company: companyInput,
                cvr: cvrInput,
                details: detailsInput,
                marketing: marketingInput
              },
              {
                cart: "cartData",
                total: calculateTotal(),
                items: cartItems
              }]
            const responseLogin = await fetch('https://eoevjfaf26tdvot.m.pipedream.net', {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(body)
            })
                 .then((response) => response)
                 .then((data) => {
                    console.log(data);
                 })
                 .catch((err) => {
                    
                    console.log(err.message);
                 });
        }

    }
    useEffect(() => {
        if (nameInput != ""){
            validateName()
        }
        if (addressInput != ""){
            validateAddress()
        }
    },[nameInput, addressInput])

    return (

        <div className = "user-form">
            <h1> Your Information </h1>
            <form onSubmit={submit}>


            <label>
                    <h2>Country: </h2>
                    Denmark
                </label>
                <label>
                    <h2>Zip Code: </h2>
                    <input type="text" id="zip" value={zipInput} autoFocus={true} onChange={zipValidation}
                           required pattern="[0-9]{4}" name="zip" />
                    {zipError && zipInput == "" && <div className={"error"}> Zip code required </div>}
                    {zipError && zipInput != "" && <div className={"error"}> Invalid zip code </div>}
                </label>
                <label>
                    <h2>City: </h2>
                    <input type="text" id="city" value={cityInput || ""}  required name="city" readOnly />
                    {cityError && <div className={"error"}> City required </div>}
                </label>
                <label>
                    <h2>Address: </h2>
                    <input type="text" id="address" value={addressInput} onChange={e =>{setAddressInput(e.target.value)}}  required name="address" />
                    {addressError && addressInput == "" &&  <div className={"error"}> Address required </div>}
                </label>
                <label>
                    <h2>Billing Address: </h2>
                    <input type="text" id="billing" value={billingInput} onChange={e =>setBillingInput(e.target.value)} name="billing" />
                </label>
                <label>
                    <h2>Name: </h2>
                    <input type="text" id="name" value={nameInput} onChange={e => {{setNameInput(e.target.value)}}} required name="name" />
                    {nameError && nameInput == "" && <div className={"error"}> Name required </div>}
                    {nameError && nameInput != "" && <div className={"error"}> Invalid name </div>}
                </label>
                <label>
                    <h2>Phone Number: </h2>
                    <input type="tel" value={phoneInput} required pattern="[0-9]{8}" name="phone" id="phone" onChange={phoneValidation} />
                    {phoneError && phoneInput == "" && <div className={"error"}> Phone number required</div>}
                    {phoneError && phoneInput != "" && <div className={"error"}> Invalid phone number </div>}

                </label>
                <label>
                    <h2> Email: </h2>
                    <input type="email" value={emailInput} required name="email" id="email" onChange={emailValidation} />
                    {emailError && emailInput == "" && <div className={"error"}> Email required </div>}
                    {emailError && emailInput != "" && <div className={"error"}> Invalid Email </div>}
                </label>
                <label>
                    <h2>Company name: </h2>
                    <input type="text" value={companyInput} name="company" id="company" onChange={e => {setCompanyInput(e.target.value)}} />
                </label>
                <label>
                    <h2>Company CVR: </h2>
                    <input type="text" value={cvrInput} name="cvr" id="cvr" onChange={e => {setCvrInput(e.target.value)}} pattern="{8}" />
                </label> 
                <label>
                <h2>Comments: </h2>
                <textarea value={detailsInput} onChange={e => {setDetailsInput(e.target.value)}} >

                </textarea>
                </label>
                <br></br>
                <input type="checkbox" onClick={e => {setTermsInput(!termsInput); setTermsError(!termsError)}} name="terms" id="terms" required/>
                    I accept the terms and conditions.
                {termsError && <div className={"error"}> You must accept the terms and conditions </div>}
                <br></br>
                <input type="checkbox" onClick={e => {setMarketingInput(!marketingInput)}} name="marketing" />
                    I want to receive marketing emails.
                <br></br>
                <button onClick={e => {validateName(); validateAddress(); 
                    if (cityInput == ""){setCityError(true)}; 
                    if (zipInput == ""){setZipError(true)}; 
                    if (phoneInput == ""){setPhoneError(true)};
                    if (emailInput == ""){setEmailError(true)};
                    if (termsInput != true){setTermsError(true)}}}>
                    Submit</button>
            </form>
        </div>

    )
}