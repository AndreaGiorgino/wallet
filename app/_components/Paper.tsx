"use client"

import { ReactNode } from "react"
import ErrorMessage from "./ErrorMessage"

interface PaperProps {
    title?: string,
    error?: string,
    className?: string,
    contentClassName?: string,
    children: ReactNode,
};

export default function Paper({
    title,
    error,
    className,
    contentClassName,
    children,
}: Readonly<PaperProps>) {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <div id="header" className="flex flex-col sm:gap-6 sm:items-end sm:flex-row">
                {title && <h3 className="text-md text-heading">{title}</h3>}
                <ErrorMessage text={error} />
            </div>
            <div className={`p-4 w-full rounded-lg paper-content bg-neutral-950 ${contentClassName}`}>
                {children}
            </div>
        </div >
    )
}