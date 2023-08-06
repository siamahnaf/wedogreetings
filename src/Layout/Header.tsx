//Components
import Container from "@/Components/Common/Container";
import Logo from "@/Components/Header/Logo";
import Navs from "@/Components/Header/Navs";
import Button from "@/Components/Header/Button";
import Menu from "@/Components/Header/Menu";


//Interface
interface Props {
    active?: string;
}

const Header = ({ active }: Props) => {
    return (
        <Container className="py-1 bg-white shadow-3xl">
            <div className="flex gap-2 items-center">
                <Logo />
                <Navs active={active} />
                <Button />
                <Menu />
            </div>
        </Container>
    );
};

export default Header;