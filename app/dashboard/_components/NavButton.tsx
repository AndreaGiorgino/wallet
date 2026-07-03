"use client"

import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface NavButtonProps {
    label: string,
    children?: ReactNode,
    callbackUrl: string,
}

export default function NavButton({
    label,
    children,
    callbackUrl,
}: Readonly<NavButtonProps>) {
    const pathname = usePathname();
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        setActive(pathname.startsWith(callbackUrl));
    }, [pathname])

    return (
        <a href={callbackUrl} title={label} aria-label={label}>
            <div className={`flex px-2 py-3 gap-1 items-center justify-center rounded-lg transition cursor-pointer bg-neutral-950 text-neutral-50 active:scale-95 hover:scale-105 focus:scale-105 w-[5em] h-[3em] ${active && "invert"}`}>
                {children}
            </div>
        </a>
    )
}