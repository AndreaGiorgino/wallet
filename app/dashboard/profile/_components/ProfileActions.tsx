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
        <div className="flex flex-col gap-3 justify-end items-center sm:flex-row">
            <Button label="Delete profile" onClick={() => { }} className="w-full text-white ring-red-500 bg-red-500/25 dark:bg-red-500/25 dark:invert-0 sm:w-auto"></Button>
            <Button label="Sign Out" onClick={handleSignOut} className="w-full sm:w-auto"></Button>
        </div>
    )
}