"use client"

import ErrorMessage from "@/app/_components/ErrorMessage"
import Loader from "@/app/_components/Loader/Loader"
import { useSession } from "next-auth/react"

export default function Balance({ amount }: { amount?: number }) {
    if (amount === undefined)
        return <ErrorMessage text="Failed to load balance amount." />

    const { status } = useSession()

    if (status === "loading")
        return <Loader />

    return (
        <div className="flex justify-center">
            <div className="flex gap-2 px-24 py-12 text-3xl rounded-full shadow-lg text-medium dark:shadow-white">
                <span>&euro;</span>
                <span>{amount}</span>
            </div>
        </div>
    )
}