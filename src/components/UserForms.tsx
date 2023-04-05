import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useFormContext } from "../context/FormContext";
import '../styles/userforms.css'
export function UserForms(){

    const {cartItems, calculateTotal} = useCartContext()

    const {
        zipInput, cityInput,
        addressInput, setAddressInput,
        billingInput, setBillingInput, 
        nameInput, setNameInput, 
        phoneInput, emailInput,
        companyInput, setCompanyInput,
        cvrInput, setCvrInput,
        detailsInput, setDetailsInput,
        termsInput, setTermsInput,
        marketingInput, setMarketingInput,
        zipError, setZipError,
        cityError, setCityError,
        addressError, nameError,
        phoneError, setPhoneError,
        emailError, setEmailError,
        termsError,
        loading, setLoading,
        zipValidation,
        validateAddress,
        validateName,
        phoneValidation,
        emailValidation,
        validateTerms
    
    } = useFormContext()

    async function submit(event: React.FormEvent<HTMLFormElement>){
        validateAddress()
        validateName()
        event.preventDefault()
        if (!zipError && !cityError && !addressError && !nameError && !phoneError && !emailError && !termsError && cartItems.length > 0){
            setLoading(true)
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
                items: cartItems.filter((item) => {
                    if (item.show === true)
                    return item
                })
              }]
            const requestOptions = {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(body)
            }
            await fetch('https://eoevjfaf26tdvot.m.pipedream.net', requestOptions)
                 .then((response) => {
                    if (!response.ok){
                        console.log(response.status)
                        return Promise.reject("network error")
                    }
                    else {
                        console.log(response)
                    }
                 })
                 .catch((err) => {      
                    console.log(err.message);
                 });
            setLoading(false)
            alert("Submission Successfull! Hurray!")
        }

        else{
            setLoading(false)
            alert("Submission Failed! Basket is empty!")
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

    useEffect(() => {
        if (termsInput == true){
            validateTerms()
        }

        
    }, [termsInput])
    return (

        <div className = "user-form">
            <h1> Your Information </h1>
            <form onSubmit={submit}>


            <label>
                    <h2>Country: </h2>
                    Denmark
                </label>
                <div className="zip_city">
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
                </div>
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
                <input type="checkbox" defaultChecked={termsInput} onClick={e => {setTermsInput(!termsInput);}} name="terms" id="terms" required/>
                    I accept the terms and conditions.
                {termsError && <div className={"error"}> You must accept the terms and conditions </div>}
                <br></br>
                <input type="checkbox" defaultChecked={marketingInput} onClick={e => {setMarketingInput(!marketingInput)}} name="marketing" />
                    I want to receive marketing emails.
                <br></br>
                <div className="submit">
                <button onClick={e => {validateName(); validateAddress(); 
                    if (cityInput == ""){setCityError(true)}; 
                    if (zipInput == ""){setZipError(true)}; 
                    if (phoneInput == ""){setPhoneError(true)};
                    if (emailInput == ""){setEmailError(true)};
                    validateTerms()}}>
                    {loading ? (
                        <div className="loader"></div>
                    ) : (
                        "Submit"
                    )}
                    </button>
                </div>
            </form>
        </div>

    )
}