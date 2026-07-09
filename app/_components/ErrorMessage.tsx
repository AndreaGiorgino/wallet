"use client"

import { CgDanger } from "react-icons/cg";

interface ErrorMessageProps {
    text?: string,
    className?: string,
};

export default function ErrorMessage({
    text,
    className,
}: Readonly<ErrorMessageProps>) {
    return text && (
        <div className={`inline-flex flex-1 gap-3 items-center px-2 py-2 mt-6 text-sm font-bold text-white rounded-lg bg-red-900/40 text-medium ${className}`}>
            <CgDanger size={20} />
            <span>{text}</span>
        </div>
    )
}