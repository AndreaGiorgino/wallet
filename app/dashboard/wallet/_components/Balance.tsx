"use client"

import ErrorMessage from "@/app/_components/ErrorMessage"
import Loader from "@/app/_components/Loader/Loader"
import { useSession } from "next-auth/react"

export default function Balance({ cents_amount }: { cents_amount?: number }) {
    if (cents_amount === undefined)
        return <ErrorMessage text="Failed to load balance amount." />

    const { status } = useSession()

    if (status === "loading")
        return <Loader />

    return (
        <div className="flex justify-center">
            <div className="px-24 py-12 text-3xl rounded-full shadow-lg text-medium dark:shadow-white">
                <span>&euro; {(cents_amount / 100).toFixed(2)}</span>
            </div>
        </div>
    )
}