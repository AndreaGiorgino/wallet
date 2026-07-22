"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function refreshTransactionDetails(transactionId: number) {
    revalidatePath(`/dashboard/transactions/details/${transactionId}`);
}

export async function transactionCreate(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!formData.get("type"))
        return { error: "Missing required field Transaction Type." };
    if (!formData.get("state"))
        return { error: "Missing required field Transaction Type." };

    try {
        const res = await fetch("http://localhost:8080/wallet/transactions/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: formData.get("type"),
                description: formData.get("description"),
                amount: formData.get("amount"),
                started_date: formData.get("started_date"),
                completed_date: formData.get("completed_date"),
                state: formData.get("state"),
            })
        })

        if (!res.ok)
            throw {};
    } catch {
        return { error: "Failed to save changes." };
    }

    return { success: true };
}

export async function transactionUpdate(transactionId: number, formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!formData.get("type"))
        return { error: "Missing required field Transaction Type." };
    if (!formData.get("state"))
        return { error: "Missing required field Transaction Type." };

    try {
        const res = await fetch(`http://localhost:8080/wallet/transactions/details/${transactionId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: transactionId,
                type: formData.get("type"),
                description: formData.get("description"),
                amount: formData.get("amount"),
                started_date: formData.get("started_date"),
                completed_date: formData.get("completed_date"),
                state: formData.get("state"),
            })
        })

        if (!res.ok)
            throw {};
    } catch {
        return { error: "Failed to save changes." };
    }

    return { success: true };
}