import React, {useEffect, useState} from 'react';


function Test() {
    const [test, setTest] = useState({"test": "API not running"});

    useEffect(() => {
        fetch('/api/status').then(res =>
            res.json().then(data => {
                setTest(data);
            })
        );
    }, []);

    return (
        <p>API Status: {test.toString()}</p>
    );
}

export default Test;
