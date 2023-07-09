import { ReactNode } from "react";


//Interface
interface Props {
    children: ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <div className="4xl:container 4xl:mx-auto px-16">
            {children}
        </div>
    );
};

export default Container;