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
        <div className="flex gap-3 justify-end items-center">
            <Button label="Delete profile" onClick={() => { }} className="border-2 border-red-500 bg-red-500/25 dark:invert-0"></Button>
            <Button label="Sign Out" onClick={handleSignOut}></Button>
        </div>
    )
}