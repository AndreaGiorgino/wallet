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
            <div className={`flex px-2 py-2 gap-1 items-center justify-center rounded-full transition cursor-pointer bg-neutral-950 text-neutral-50 active:scale-95 hover:scale-110 focus:scale-110 w-[4em] h-[2.5em] ${active && "invert"}`}>
                {children}
            </div>
        </a>
    )
}