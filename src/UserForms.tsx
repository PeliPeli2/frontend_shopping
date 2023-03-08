import React, { useState } from "react";


export function userinput() {

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

    async function handleInputChange(event: { target: { value: any } }) {
        const input = event.target.value;
        const zipToCityMap = await fetchnumbers();
        setUserInput(input);
        console.log(zipToCityMap);
        console.log("userInput:", userInput);
        if (await isValidInput({ userInput: input, zipToCityMap })) {
            const city = zipToCityMap.get(input);
            // @ts-ignore
            setCityInput(city);
            console.log("valid input!");
        }
        else {
            console.log("Invalid input!");
        }
    }

return (
        <div className = "user-input">
            <h1> User Input </h1>
            <form>
                <label>
                    <h2>Country: </h2>
                    Denmark
                </label>
                <label>
                    <h2>Zip Code: </h2>
                    <input type="text" value={userInput} autoFocus={true} onChange={handleInputChange} required pattern="[0-9]{4}" name="zip"/>


                </label>
                <label>
                    <h2>City: </h2>
                    <input type="text" value={cityInput} required name="city" />
                </label>
                <label>
                    <h2>Address: </h2>
                    <input type="text" required name="address" />
                </label> <br/>
                <label>
                    <h2>Name: </h2>
                    <input type="text" required name="name" />
                </label> <br/>
                <label>
                    <h2>Phone Number: </h2>
                    <input type="tel" required pattern="[0-9]{8}" name="phone"  />
                </label>
                <label>
                    <h2> Email: </h2>
                    <input type="email" required name="email" />
                </label> <br/>
                <label>
                    <h2>Company name: </h2>
                    <input type="text" name="company" />
                </label>
                <label>
                    <h2>Company CVR: </h2>
                    <input type="text" name="cvr" />
                </label> <br/>
            </form>
        </div>
    )}


