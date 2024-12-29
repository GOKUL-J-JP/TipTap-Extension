import { useState, useEffect } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [UserInput, setUserInput] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const datasFromLocalStorage = JSON.parse(localStorage.getItem("UserInput"));
        if (datasFromLocalStorage) {
            setUserInput(datasFromLocalStorage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("UserInput", JSON.stringify(UserInput));
    }, [UserInput]);

    const handleSaveInput = () => {
        if (inputValue.trim()) {
            setUserInput([...UserInput, inputValue]);
            setInputValue("");
        }
    };

    const handleSaveTab = () => {
        // eslint-disable-next-line no-undef
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            setUserInput((prevdatas) => [...prevdatas, tabs[0].url]);
        });
    };

    const handleDeleteAll = () => {
        setUserInput([]);
    };

    return (
        <div className="container mt-5">
            <div className="heading">
                <h1 className="fs-1">Link Locker</h1>
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a URL"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="btn btn-success fs-5 ms-2 " onClick={handleSaveInput}>
                    Save Input
                </button>
            </div>
            <div className="d-flex mb-3">
                <button className="btn btn-secondary me-2" onClick={handleSaveTab}>
                    Save Tab
                </button>
                <button className="btn btn-danger ms-3" onDoubleClick={handleDeleteAll}>
                    Delete All
                </button>
            </div>
            <ul className="list-group">
                {UserInput.map((data, index) => (
                    <li key={index} className="list-group-item">
                        <a href={data} target="_blank" rel="noopener noreferrer">
                            {data}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
