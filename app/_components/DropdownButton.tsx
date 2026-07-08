"use client"

import { useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";

interface DropdownButtonProps {
    label?: string,
    className?: string,
    items: string[],
};

export default function DropdownButton({
    label,
    className,
    items = [],
}: Readonly<DropdownButtonProps>) {
    const [hidden, setHidden] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>(items[0]);

    return (
        <div className="block relative">
            {label && <span className="text-sm">{label}</span>}
            <button type="button" className={`dark:invert inline-flex h-[2.5em] items-center justify-center rounded-lg bg-zinc-950 px-4 py-2 font-medium text-current transition ring-3 border-none active:scale-95 hover:scale-110 focus:scale-110 cursor-pointer ${label && "mt-2"} ${className}`} onClick={() => setHidden(!hidden)}>
                <div className="flex gap-6 justify-between items-center w-full">
                    <span>{selected}</span>
                    <BiCaretDown size={20} />
                </div>
            </button>
            <div id="dropdown" className={`absolute top-[125%] left-0 z-10 w-full rounded-md ring-2 shadow-lg bg-zinc-50 dark:bg-black transition duration-300 ${hidden && "opacity-0"} overflow-hidden`}>
                <ul className="p-2 text-sm font-medium" aria-labelledby="dropdown-button">
                    {items.map((i) => (
                        <li key={i}>
                            <button type="button" className="inline-flex items-center p-2 w-full rounded-md cursor-pointer hover:bg-neutral-800/50 hover:text-heading" tabIndex={hidden ? -1 : 0} onClick={() => {
                                setSelected(i);
                                setHidden(true);
                            }}>{i}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}