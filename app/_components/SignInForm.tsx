"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { refreshApp, signin } from "../action"
import Button from "./Button"
import Loader from "./Loader/Loader"
import Paper from "./Paper"
import TextInput from "./TextInput"

export default function SignInForm() {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const [error, setError] = useState<string>("")

    const handleSubmit = async (formData: FormData) => {
        debugger
        startTransition(async () => {
            if (formData.get("password") !== formData.get("confirm_password")) {
                setError("Passwords does not match.")
                return
            }

            const res = await signin(formData)
            if (res.success) {
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
                    setError("Failed to sign in.")
                }
            }

            setError(res.error || "")
            await refreshApp()
        })
    }

    return !pending ? (
        <div className="flex flex-col gap-8 w-full max-w-[30em] px-2">
            <Paper error={error} title="Sign In">
                <form id="signin-form" action={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                        <TextInput name="first_name" placeholder="Jhon" label="First name" required />
                        <TextInput name="last_name" placeholder="Doe" label="Last name" required />

                        <TextInput name="email" type="email" placeholder="john.doe@company.com" label="Email address" className="sm:col-span-2" required />

                        <TextInput name="password" type="password" placeholder="**********" label="Password" className="sm:col-span-2" required />

                        <TextInput name="confirm_password" type="password" placeholder="**********" label="Confirm password" className="sm:col-span-2" required />
                    </div>
                </form>
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button type="submit" label="Submit" form="signin-form" />
            </div>
        </div>
    ) : <Loader />
}