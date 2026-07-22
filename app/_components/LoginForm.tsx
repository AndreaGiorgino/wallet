"use client"

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { refreshApp } from "../action"
import Button from "./Button"
import Loader from "./Loader/Loader"
import Paper from "./Paper"
import TextInput from "./TextInput"

interface FormState {
    email: string,
    password: string,
}

const defaultFormState: FormState = {
    email: "",
    password: "",
}

export default function LogInForm() {
    const router = useRouter()
    const params = useSearchParams()
    const [pending, startTransition] = useTransition()

    const formState = defaultFormState;
    const [error, setError] = useState<string>("")

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                const res = await signIn("credentials", {
                    email: formData.get("email"),
                    password: formData.get("password"),
                    redirect: false,
                })

                if (res?.ok) {
                    router.replace("/dashboard")
                    await refreshApp()
                } else {
                    formState.email = formData.get("email")?.toString() ?? defaultFormState.email
                    formState.password = defaultFormState.password
                    throw {}
                }
            } catch {
                setError("Failed to log in.")
            }
        })
    }

    useEffect(() => {
        if (params.get("reason") === "expired")
            setError("Your session has expired")
    }, [])

    if (pending)
        return <Loader />

    return (
        <div className="flex flex-col gap-8 px-2 w-full max-w-[30em]">
            <Paper error={error} title="Log In">
                <form id="login-form" action={handleSubmit}>
                    <div className="flex flex-col gap-6 mb-6">
                        <TextInput name="email" type="email" placeholder="john.doe@company.com" label="Email address" defaultValue={formState.email} required />

                        <TextInput name="password" type="password" placeholder="**********" label="Password" defaultValue={formState.password} required />
                    </div>
                </form>
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button type="submit" label="Submit" form="login-form" disabled={pending} />
            </div>
        </div>
    )
}