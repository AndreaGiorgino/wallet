"use client"

import Button from "@/app/_components/Button";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Profile() {
    const handleSignOut = async () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <div>
            <Button label="Sign Out" onClick={handleSignOut}></Button>
        </div>
    )
}