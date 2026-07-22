"use server"

import { revalidatePath } from "next/cache"

export async function refreshApp() {
    revalidatePath("/")
}

export async function signin(formData: FormData) {
    if (formData.get("password") !== formData.get("confirm_password"))
        return { error: "Passwords does not match." }

    try {
        const res = await fetch("http://localhost:8080/signin", {
            method: 'POST',
            body: JSON.stringify({
                first_name: formData.get("first_name"),
                last_name: formData.get("last_name"),
                email: formData.get("email"),
                password: formData.get("password"),
            }),
            headers: { "Content-Type": "application/json" }
        })

        const data = await res?.json()
        if (!res?.ok || !data)
            throw {}
        return { success: true, data: data }
    } catch {
        return { error: "Failed to sign in." }
    }
}