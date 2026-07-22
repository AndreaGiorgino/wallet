"use client"

import { useEffect, useState } from "react"
import { BiCaretDown } from "react-icons/bi"

interface DropdownButtonProps {
    id: string,
    items: string[],
    defaultValue?: string,
    label?: string,
    className?: string,
    disabled?: boolean,
}

export default function DropdownButton({
    id,
    items = [],
    defaultValue = "",
    label,
    className,
    disabled = false,
}: Readonly<DropdownButtonProps>) {
    const [hidden, setHidden] = useState<boolean>(true)
    const [selected, setSelected] = useState<string>(defaultValue)

    return (
        <div className="flex relative flex-col">
            <input id={id} name={id} type="text" className="hidden" value={selected} readOnly />
            {label && <span className="text-sm">{label}</span>}
            <button type="button" className={`inline-flex h-[2.5em] items-center justify-start rounded-lg bg-zinc-950 dark:bg-white dark:text-black px-4 py-2 font-medium text-current transition ring-3 border-none active:scale-95 hover:sm:scale-110 hover:scale-103 w-full sm:w-auto focus:sm:scale-110 focus:scale-103 cursor-pointer ${disabled && "!bg-gray-500"} ${label && "mt-2"} ${className}`} onClick={() => setHidden(!hidden)} disabled={disabled}>
                <div className="flex gap-6 justify-between items-center w-full">
                    <span>{selected}</span>
                    <BiCaretDown size={20} />
                </div>
            </button>
            {items && items.length > 0 && (
                <div id="dropdown" className={`absolute top-[125%] left-0 z-10 w-full rounded-md ring-2 shadow-lg bg-zinc-50 dark:bg-black transition duration-300 origin-top ${hidden && "scale-y-0"} overflow-hidden`}>
                    <ul className="p-2 text-sm font-medium" aria-labelledby="dropdown-button">
                        {items.map((i) => (
                            <li key={i}>
                                <button type="button" className="inline-flex items-center p-2 w-full rounded-md cursor-pointer hover:bg-neutral-800/50 hover:text-heading" tabIndex={hidden ? -1 : 0} onClick={() => {
                                    setSelected(i)
                                    setHidden(true)
                                }}>{i}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}