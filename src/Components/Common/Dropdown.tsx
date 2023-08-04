import { useState, useRef } from "react";
import { Icon } from "@iconify/react";

//Hook
import { useOutsideClick } from "@/Helper/Hook";

//Interface
interface Props {
    options: {
        label: string;
        value: string;
    }[];
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
}

const Dropdown = ({ options, placeholder, value, onChange }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Initialize Hook
    const ref = useRef(null);

    //Use Click outside
    useOutsideClick(ref, () => {
        setOpen(false)
    });

    //Handler
    const onItemClick = (value: string) => {
        onChange(value)
        setOpen(false)
    }

    return (
        <div className="relative" ref={ref}>
            <button className="flex items-center bg-c-white-smoke py-4 px-4 rounded-lg w-full" type="button" onClick={() => setOpen(!open)}>
                <span className="flex-1 text-left">
                    {value ?
                        <span className="text-base">{options.find((i) => i.value === value)?.label}</span> : <span className="text-gray-400 text-[15px]">{placeholder}</span>
                    }
                </span>
                <span className={`text-right text-gray-400 transition-all ${open ? "rotate-180" : "rotate-0"}`}>
                    <Icon className="text-xl" icon="charm:chevron-down" />
                </span>
            </button>
            <ul className={`absolute top-full bg-white rounded-md mt-1.5 left-0 w-full border border-blue-gray-50 shadow-lg shadow-blue-gray-500/10 transition-all p-3 text-sm origin-[center_top] z-50 ${open ? "opacity-100 visible scale-100 translate-y-0" : "opacity-0 invisible scale-95 -translate-y-1"}`}>
                {options.map((item, i) => (
                    <li key={i} className="pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none text-blue-gray-500 hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline outline-0 transition-all font-medium" onClick={() => onItemClick(item.value)}>{item.label}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;