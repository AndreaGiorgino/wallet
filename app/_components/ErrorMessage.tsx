"use client"

import { CgDanger } from "react-icons/cg";

export default function ErrorMessage({
    text,
}: {
    text?: string,
}) {
    return text && (
        <div className="inline-flex flex-1 gap-3 items-center px-2 py-2 mt-6 rounded-lg bg-red-900/40 font-bold text-medium font-bold text-sm">
            <CgDanger size={20} />
            {text}
        </div>
    )
}