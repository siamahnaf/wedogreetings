//Components
import Container from "@/Components/Common/Container";
import Logo from "@/Components/Header/Logo";
import Navs from "@/Components/Header/Navs";
import Button from "@/Components/Header/Button";


//Interface
interface Props {
    active?: string;
}

const Header = ({ active }: Props) => {
    return (
        <Container className="py-1">
            <div className="flex gap-2 items-center">
                <Logo />
                <Navs active={active} />
                <Button />
            </div>
        </Container>
    );
};

export default Header;