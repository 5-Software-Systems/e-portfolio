import { useState } from "react";
import jsSHA from 'jssha';


export function validateEmail(email) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)+$/;
    return re.test(String(email).toLowerCase());
}

export function hashPassword(password) {
    require("dotenv").config({ path: '../../.././' });
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    // salt and hash the password
    hashObj.update(password+'yousaltyboy2020');
    var hash = hashObj.getHash("HEX");
    return hash;
}

export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function(event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}
