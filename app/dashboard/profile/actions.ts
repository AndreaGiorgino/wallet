"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export async function refreshProfile() {
    revalidatePath("/dashboard/profile")
}

export async function profileUpdate(formData: FormData) {
    const session = await getServerSession(authOptions)

    try {
        const res = await fetch(`${process.env.API_URL}/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: formData.get("first_name"),
                last_name: formData.get("last_name"),
                email: formData.get("email"),
            }),
        })

        if (!res?.ok)
            throw {}
    } catch {
        return { error: "Failed to save changes." }
    }

    revalidatePath("/dashboard/profile")
    return { success: true }
}

export async function profileDelete() {
    try {
        // TODO: action not implemented yet
    } catch {
        return { error: "Failed to delete profile." }
    }

    return { success: true }
}