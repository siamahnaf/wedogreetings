import { ReactNode } from "react";

//Header and Footer
import Header from "./Header";
import Footer from "./Footer";

//Seo
import Seo from "@/Helper/Seo";

//Interface
interface Props {
    children: ReactNode;
    title?: string;
    active?: string;
}

const Layout = ({ children, active, title }: Props) => {
    return (
        <div>
            <Seo title={title} />
            <Header active={active} />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;