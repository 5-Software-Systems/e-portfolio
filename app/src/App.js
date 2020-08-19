import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [test, setTest] = useState({"test": "API not running"});

    useEffect(() => {
        fetch('/test').then(res =>
            res.json().then(data => {
                setTest(data);
            })
        );
    }, []);

    return (
        <div className="App">
            <header>This is a test</header>
            <span>API return: {test.test}</span>
        </div>
    );
}

export default App;
