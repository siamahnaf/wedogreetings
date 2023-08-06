import Link from "next/link";
import Rive from "@rive-app/react-canvas";

const Logo = () => {
    return (
        <div className="basis-[12%]">
            <Link href="/" className="block h-[60px] sm:h-[60px] xs:h-[40px] xxs:h-[30px] w-[250px] 4xl:w-[280px] sm:w-[250px] xs:w-[190px] xxs:w-[150px]">
                <Rive src="/rive/logo.riv" width="100%" height="100%" />
            </Link>
        </div>
    );
};

export default Logo;