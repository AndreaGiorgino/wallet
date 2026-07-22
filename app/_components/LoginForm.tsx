"use client"

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { refreshApp } from "../action"
import Button from "./Button"
import Loader from "./Loader/Loader"
import Paper from "./Paper"
import TextInput from "./TextInput"

export default function LogInForm() {
    const router = useRouter()
    const params = useSearchParams()
    const [pending, startTransition] = useTransition()

    const [error, setError] = useState<string>("")

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            try {
                const res = await signIn("credentials", {
                    email: formData.get("email"),
                    password: formData.get("password"),
                    redirect: false,
                })

                if (!res?.ok)
                    throw {}
                router.replace("/dashboard")
            } catch {
                setError("Failed to log in.")
            }

            await refreshApp()
        })
    }

    useEffect(() => {
        if (params.get("reason") === "expired")
            setError("Your session has expired")
    }, [])

    return !pending ? (
        <div className="flex flex-col gap-8 px-2 w-full max-w-[30em]">
            <Paper error={error} title="Log In">
                <form id="login-form" action={handleSubmit}>
                    <div className="flex flex-col gap-6 mb-6">
                        <TextInput name="email" type="email" placeholder="john.doe@company.com" label="Email address" required></TextInput>

                        <TextInput name="password" type="password" placeholder="**********" label="Password" required></TextInput>
                    </div>
                </form>
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button type="submit" label="Submit" form="login-form" />
            </div>
        </div>
    ) : <Loader />
}