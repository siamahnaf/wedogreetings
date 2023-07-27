import React from 'react';

const MyComponent = () => {
    const getTotalPrice = () => {
        // Implement your logic to calculate the total price
        return 10.99;
    };

    const handlePayClick = () => {
        const data = {
            instId: '1471088',
            amount: '10.99',
            cartId: 'test',
            currency: 'GBP',
            testMode: '100',
            accId1: 'WEGREETLTDM1'
        };

        fetch('https://secure-test.worldpay.com/wcc/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // Handle the response as needed
                console.log('Response:', response);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div className="flex gap-3 justify-center mt-8">
                <button
                    className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md"
                    type="button"
                >
                    Back
                </button>
                <button
                    className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md"
                    type="button"
                    onClick={handlePayClick}
                >
                    Pay £{getTotalPrice()}
                </button>
            </div>
        </div>
    );
};

export default MyComponent;
