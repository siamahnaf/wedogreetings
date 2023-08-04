import { Dialog, DialogBody } from "@material-tailwind/react";
import { poppins } from "@/Fonts";
import { Icon } from "@iconify/react";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    message: { text: string, severity: boolean | null }
}

const Success = ({ open, onClose, message }: Props) => {
    return (
        <Dialog
            open={open}
            handler={onClose}
            animate={{
                mount: { y: 0 },
                unmount: { y: -15 },
            }}
            size="xs"
            style={{ fontFamily: poppins.style.fontFamily }}
        >
            <DialogBody className="text-black text-center py-8">
                <div className="">
                    {message.severity ?
                        <Icon className="text-7xl text-green-600 inline-block" icon="icon-park-outline:check-one" /> : <Icon className="text-7xl text-red-600 inline-block" icon="ic:round-error" />
                    }
                    <p className="text-lg mt-3 font-oxygen">{message.text}</p>
                </div>
            </DialogBody>
        </Dialog>
    );
};

export default Success;