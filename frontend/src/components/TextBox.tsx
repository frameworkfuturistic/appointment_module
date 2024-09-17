import React, { useState, useEffect } from 'react';

const TextBox = () => {
    // State to manage input data and submitted data
    const [inputValue, setInputValue] = useState('');
    const [submittedData, setSubmittedData] = useState('');

    // Retrieve data from localStorage when the component mounts
    useEffect(() => {
        const savedData = localStorage.getItem('submittedData');
        if (savedData) {
            setSubmittedData(savedData);  // Load saved data from localStorage
        }
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update inputValue state with the input field's value
    };

    // Handle submit button click
    const handleSubmit = () => {
        setSubmittedData(inputValue);  // Set submitted data to display
        localStorage.setItem('submittedData', inputValue);  // Save submitted data to localStorage
        setInputValue('');  // Clear input field after submitting
    };

    return (
        <>        
        <div className='flex items-center justify-center mt-10 m-2'>
            <input
                type='text'
                value={inputValue}  // Input value is controlled by inputValue state
                onChange={handleInputChange}  // Calls handleInputChange on each keystroke
                placeholder='Write something'
                className='border text-center p-2'
            />
            <button 
                onClick={handleSubmit}  // Calls handleSubmit when button is clicked
                className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
                Submit
            </button>
        </div>

        {/* Display the submitted data in this section */}
        <div className='flex items-center justify-center mt-10'>
            {submittedData && (  // Only show this if submittedData is not empty
                <p className='border text-center p-2'>{submittedData}</p>
            )}
        </div>
        </>
    );
};

export default TextBox;