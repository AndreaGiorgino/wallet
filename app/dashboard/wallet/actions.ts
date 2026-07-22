"use server"

import { revalidatePath } from "next/cache"

export async function refreshWallet() {
    revalidatePath("/dashboard/wallet");
}