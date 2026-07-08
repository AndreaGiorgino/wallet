"use client"

import { useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import Button from "./Button";

interface DropdownButtonProps {
    className?: string,
    items: string[],
};

export default function DropdownButton({
    className,
    items,
}: Readonly<DropdownButtonProps>) {
    const [hidden, setHidden] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>(items[0]);

    return (
        <div className="relative">
            <Button id="dropdown-button" label={selected || items[0]} className={className} data-dropdown-toggle="dropdown" endIcon={<BiCaretDown />} onClick={() => setHidden(hidden ? false : true)} />
            <div id="dropdown" className={`absolute top-[125%] left-0 z-10 w-full rounded-md ring-2 shadow-lg ${hidden && "hidden"} bg-zinc-50 dark:bg-black`}>
                <ul className="p-2 text-sm font-medium" aria-labelledby="dropdown-button">
                    {items.map((i) => (
                        <li key={i}>
                            <button type="button" className="inline-flex items-center p-2 w-full rounded-md cursor-pointer hover:bg-neutral-800/50 hover:text-heading" onClick={() => {
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