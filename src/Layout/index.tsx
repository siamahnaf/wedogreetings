import { ReactNode } from "react";

//Header and Footer
import Header from "./Header";
import Footer from "./Footer";


//Interface
interface Props {
    children: ReactNode;
    title?: string;
    active?: string;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;