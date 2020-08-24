import React, {useEffect, useState} from 'react';


function Test() {
    const [test, setTest] = useState({"test": "API not running"});

    useEffect(() => {
        fetch('/api/test/test1').then(res =>
            res.json().then(data => {
                setTest(data);
            })
        );
    }, []);

    return (
        <div>
            <h5 className="py-3">API return: {test.response}</h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
        </div>
    );
}

export default Test;
