"use client"

import Button from "@/app/_components/Button"
import { signOut } from "next-auth/react"

export default function ProfileActions() {
    const handleDelete = async () => {
        // TODO: function "handleDelete" not implemented yet.
    }

    const handleSignOut = async () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <div className="flex flex-col gap-3 justify-end items-center md:flex-row">
            <Button label="Delete profile" onClick={() => { }} className="w-full border-2 border-red-500 bg-red-500/25 dark:invert-0 md:w-auto"></Button>
            <Button label="Sign Out" onClick={handleSignOut} className="w-full md:w-auto"></Button>
        </div>
    )
}