import { useState } from "react";

export function validateEmail(email) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)+$/;
    return re.test(String(email).toLowerCase());
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
