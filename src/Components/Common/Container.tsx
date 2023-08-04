import { ReactNode } from "react";


//Interface
interface Props {
    children: ReactNode;
    className?: string;
    id?: string;
}

const Container = ({ children, className, id }: Props) => {
    return (
        <div className={`4xl:container 4xl:mx-auto px-16 ${className}`} id={id}>
            {children}
        </div>
    );
};

export default Container;