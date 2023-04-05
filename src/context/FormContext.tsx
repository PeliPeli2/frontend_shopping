import { createContext, ReactNode, useContext, useState } from "react";


type FormProviderProps = {
    children : ReactNode
}

type FormContext = {
    zipInput : string
    setZipInput : React.Dispatch<React.SetStateAction<string>>
    cityInput : string
    setCityInput : React.Dispatch<React.SetStateAction<string>>
    addressInput : string
    setAddressInput : React.Dispatch<React.SetStateAction<string>>
    billingInput : string
    setBillingInput : React.Dispatch<React.SetStateAction<string>>
    nameInput : string
    setNameInput : React.Dispatch<React.SetStateAction<string>>
    phoneInput : string
    setPhoneInput : React.Dispatch<React.SetStateAction<string>>
    emailInput : string
    setEmailInput : React.Dispatch<React.SetStateAction<string>>
    companyInput : string
    setCompanyInput : React.Dispatch<React.SetStateAction<string>>
    cvrInput : string
    setCvrInput : React.Dispatch<React.SetStateAction<string>>
    detailsInput : string
    setDetailsInput : React.Dispatch<React.SetStateAction<string>>
    termsInput : boolean
    setTermsInput : React.Dispatch<React.SetStateAction<boolean>>
    marketingInput : boolean
    setMarketingInput : React.Dispatch<React.SetStateAction<boolean>>
    zipError : boolean
    setZipError : React.Dispatch<React.SetStateAction<boolean>>
    cityError : boolean
    setCityError : React.Dispatch<React.SetStateAction<boolean>>
    addressError : boolean
    setAddressError : React.Dispatch<React.SetStateAction<boolean>>
    nameError : boolean
    setNameError : React.Dispatch<React.SetStateAction<boolean>>
    phoneError : boolean
    setPhoneError : React.Dispatch<React.SetStateAction<boolean>>
    emailError : boolean
    setEmailError : React.Dispatch<React.SetStateAction<boolean>>
    termsError : boolean
    setTermsError : React.Dispatch<React.SetStateAction<boolean>>
}

const FormContext = createContext({} as FormContext)

export function useFormContext(){
    return useContext(FormContext)
}

export function FormContextProvider({ children }: FormProviderProps ){

    const [zipInput, setZipInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [billingInput, setBillingInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [companyInput, setCompanyInput] = useState("");
    const [cvrInput, setCvrInput] = useState("");
    const [detailsInput, setDetailsInput] = useState("");
    const [termsInput, setTermsInput] = useState(false);
    const [marketingInput, setMarketingInput] = useState(false);

    const [zipError, setZipError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [termsError, setTermsError] = useState(false);
    return (
        <FormContext.Provider value={{
            zipInput, setZipInput, 
            cityInput, setCityInput, 
            addressInput, setAddressInput,
            billingInput, setBillingInput, 
            nameInput, setNameInput, 
            phoneInput, setPhoneInput,
            emailInput, setEmailInput,
            companyInput, setCompanyInput,
            cvrInput, setCvrInput,
            detailsInput, setDetailsInput,
            termsInput, setTermsInput,
            marketingInput, setMarketingInput,
            zipError, setZipError,
            cityError, setCityError,
            addressError, setAddressError,
            nameError, setNameError,
            phoneError, setPhoneError,
            emailError, setEmailError,
            termsError, setTermsError,
            }}>
            {children}
        </FormContext.Provider>
    )
}