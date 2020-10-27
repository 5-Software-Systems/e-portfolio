import React, {useEffect, useState} from 'react';


export default function Test() {
    const [test, setTest] = useState("☠");

    useEffect(() => {
        fetch('/api/status').then(res =>
            res.json().then(data => {
                if (data === 'ok') {
                    setTest("👌");
                }
            })
        );
    }, []);

    return (
        <p>API Status: {test.toString()}</p>
    );
}
