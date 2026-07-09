"use client"

import Button from "@/app/_components/Button"
import { signOut } from "next-auth/react"

export default function ProfileActions() {
    const handleSignOut = async () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <div className="flex flex-col gap-4 justify-end items-center sm:flex-row">
            <Button label="Sign Out" onClick={handleSignOut} />
        </div>
    )
}