import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';


//Interface
interface Props {
    url: string;
}
const email = ({ url }: Props) => {
    return (
        <Html lang="en">
            <Button href={url}>Click me</Button>
        </Html>
    );
};

export default email;