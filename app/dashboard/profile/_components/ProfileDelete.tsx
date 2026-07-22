"use client"

import Button from "@/app/_components/Button"
import ErrorMessage from "@/app/_components/ErrorMessage"
import Loader from "@/app/_components/Loader/Loader"
import Paper from "@/app/_components/Paper"
import { signOut, useSession } from "next-auth/react"
import { useState, useTransition } from "react"
import { profileDelete } from "../actions"

export default function ProfileDelete() {
    const session = useSession()
    const [pending, startTransition] = useTransition()

    const [error, setError] = useState<string>("")

    const handleSubmit = async () => {
        // TODO: function "handleSubmit" not implemented yet
        startTransition(async () => {
            const res = await profileDelete()

            if (res?.success)
                signOut()
            setError(res?.error ?? "")
        })
    }

    return session && !pending ? (
        <div className="flex flex-col gap-8 px-2">
            <Paper error={error} title="Danger Zone">
                <div>Delete profile data and all of the related data</div>
                <ErrorMessage text="This action cannot be revoked!" className="!p-4 w-full" />
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button label="Delete" onClick={handleSubmit} className="w-full ring-red-800 sm:w-auto !text-white !dark:bg-red-500/25 !bg-red-900/40" />
            </div>
        </div>
    ) : <Loader />
}