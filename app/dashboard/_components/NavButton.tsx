"use client"

import Link from "next/link"
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
    const pathname = usePathname()
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        setActive(pathname.startsWith(callbackUrl))
    }, [pathname])

    return (
        <li>
            <Link href={callbackUrl} title={label} aria-label={label} className="outline-0 active:[&>*]:scale-95 hover:[&>*]:scale-110 focus:[&>*]:scale-110">
                <div className={`flex px-2 py-2 gap-1 items-center mx-[.25em] justify-center rounded-full transition cursor-pointer text-white w-[4em] h-[2.5em] ring-2 ring-white/25 ${active && "text-black bg-black !ring-black"}`}>
                    {children}
                </div>
            </Link>
        </li>
    )
}