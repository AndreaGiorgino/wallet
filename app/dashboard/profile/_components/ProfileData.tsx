"use client"

import Button from "@/app/_components/Button"
import ErrorMessage from "@/app/_components/ErrorMessage"
import Loader from "@/app/_components/Loader/Loader"
import Paper from "@/app/_components/Paper"
import TextInput from "@/app/_components/TextInput"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { refreshProfile, profileUpdate } from "../actions"

export interface User {
    first_name: string,
    last_name: string,
    email: string,
}

export default function ProfileData({ user }: { user?: User }) {
    if (!user)
        return <ErrorMessage text="Failed to load profile data." />

    const router = useRouter()
    const { data: session } = useSession()
    const [pending, startTransition] = useTransition()

    const [editing, setEditing] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const res = await profileUpdate(formData)

            if (res?.success)
                setEditing(false)
            setError(res?.error || "")

            await refreshProfile()
        })
    }

    return session && !pending ? (
        <div className="flex flex-col gap-8 px-2">
            <Paper error={error} title="Profile Data">
                {editing ? (
                    <form id="data-form" action={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                            <div>
                                <TextInput name="first_name" placeholder="Jhon" label="First name" defaultValue={user?.first_name} required></TextInput>
                            </div>
                            <div>
                                <TextInput name="last_name" placeholder="Doe" label="Last name" defaultValue={user?.last_name} required></TextInput>
                            </div>
                            <div className="sm:col-span-2">
                                <TextInput name="email" type="email" placeholder="john.doe@company.com" label="Email address" defaultValue={user?.email} required></TextInput>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 gap-6 items-end mb-6 sm:grid-cols-2">
                        <div className="flex flex-col pb-3 h-full border-b-1">
                            <span className="text-sm">First name</span>
                            <span className="mt-2 text-sm text-heading">{user?.first_name}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1">
                            <span className="text-sm">Last name</span>
                            <span className="mt-2 text-sm text-heading">{user?.last_name}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-2">
                            <span className="text-sm">Email address</span>
                            <span className="mt-2 text-sm text-heading">{user?.email}</span>
                        </div>
                    </div>
                )}
            </Paper>
            {editing ? (
                <div className="flex flex-col gap-4 justify-end items-center text-sm sm:flex-row">
                    <Button label="Cancel" onClick={() => setEditing(false)} className="w-full border-2 invert border-neutral-100 sm:w-auto" />
                    <Button label="Save" type="submit" form="data-form" />
                </div>
            ) : (
                <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                    <Button label="Edit" onClick={() => setEditing(true)} />
                </div>
            )}
        </div>
    ) : (
        <Loader />
    )
}