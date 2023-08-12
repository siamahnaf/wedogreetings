const email = {
    "from": {
        "email": "noreply@wegreet.co.uk",
        "name": "We do greetings"
    },
    "to": [
        {
            "email": "simon@wegreet.co.uk",
            "name": "Siam Ahnaf"
        }
    ],
    "subject": "Hello from We do greetings",
    "html": "<b>This is just a friendly hello from your friends at {$company}.</b>"
}
export const headers = {
    "Authorization": `Bearer mlsn.5fdc8e5f5e6d6ae631c0578252f2c4533c508aba7680d6342870f8892bb36033`,
    "Content-Type": "application/json"
}

export const ADD_CUSTOM_REQUEST = async () => await (await fetch("https://api.mailersend.com/v1/email", { method: "POST", headers, body: JSON.stringify(email) }).then(res => res.json()));

import { useMutation } from "@tanstack/react-query";

const Test = () => {
    const { mutate, error, data } = useMutation({ mutationKey: ["test"], mutationFn: ADD_CUSTOM_REQUEST })
    return (
        <div>
            <button onClick={() => mutate()}>
                Click me
            </button>
        </div>
    );
};

export default Test;