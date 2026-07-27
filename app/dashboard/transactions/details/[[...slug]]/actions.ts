"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export async function refreshTransactionDetails(transactionId?: number) {
    if (transactionId)
        revalidatePath(`/dashboard/transactions/details/${transactionId}`)
    else revalidatePath("/dashboard/transactions/details")
}

export async function transactionCreate(formData: FormData) {
    const session = await getServerSession(authOptions)

    if (!formData.get("type"))
        return { error: "Missing required field Transaction Type." }
    if (!formData.get("state"))
        return { error: "Missing required field Transaction Type." }

    try {
        const res = await fetch(`${process.env.API_URL}/wallet/transactions/upsert`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: formData.get("type"),
                description: formData.get("description"),
                cents_amount: parseFloat(formData.get("amount")!.toString()) * 100,
                started_date: formData.get("started_date"),
                completed_date: formData.get("completed_date"),
                state: formData.get("state"),
            })
        })

        const data = await res.json()

        if (!res.ok || !data)
            throw {}

        return { success: true, id: data.id }
    } catch {
        return { error: "Failed to save changes." }
    }
}

export async function transactionUpdate(transactionId: number, formData: FormData) {
    const session = await getServerSession(authOptions)

    if (!formData.get("type"))
        return { error: "Missing required field Transaction Type." }
    if (!formData.get("state"))
        return { error: "Missing required field Transaction Type." }

    try {
        const res = await fetch(`${process.env.API_URL}/wallet/transactions/upsert`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: transactionId,
                type: formData.get("type"),
                description: formData.get("description"),
                cents_amount: parseFloat(formData.get("amount")!.toString()) * 100,
                started_date: formData.get("started_date"),
                completed_date: formData.get("completed_date"),
                state: formData.get("state"),
            })
        })

        if (!res.ok)
            throw {}

        return { success: true, id: transactionId }
    } catch {
        return { error: "Failed to save changes." }
    }
}

export async function transactionDelete(transactionId: number) {
    const session = await getServerSession(authOptions)

    try {
        const res = await fetch(`${process.env.API_URL}/wallet/transactions/delete`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: transactionId,
            })
        })

        if (!res.ok)
            throw {}

        return { success: true }
    } catch {
        return { error: "Failed to delete transaction." }
    }
}