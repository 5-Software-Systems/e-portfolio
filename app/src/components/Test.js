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
        <h5 className="py-3">API Status: {test.toString()}</h5>
    );
}

export default Test;
