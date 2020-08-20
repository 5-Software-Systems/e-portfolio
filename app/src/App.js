import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [test, setTest] = useState({"test": "API not running"});

    useEffect(() => {
        fetch('/api/test/test1').then(res =>
            res.json().then(data => {
                setTest(data);
            })
        );
    }, []);

    return (
        <div className="App">
            <header>This is a test</header>
            <span>API return: {test.response}</span>
        </div>
    );
}

export default App;
