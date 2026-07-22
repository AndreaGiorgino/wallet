"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { refreshApp, signin } from "../action"
import Button from "./Button"
import Loader from "./Loader/Loader"
import Paper from "./Paper"
import TextInput from "./TextInput"

interface FormState {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
}

const defaultFormState: FormState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
}

export default function SignInForm() {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const formState = defaultFormState;
    const [error, setError] = useState<string>("")

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const res = await signin(formData)
            if (res.success) {
                try {
                    await signIn("credentials", {
                        email: formData.get("email"),
                        password: formData.get("password"),
                        redirect: false,
                    })
                } catch { }

                router.replace("/dashboard")
                await refreshApp()
            } else {
                formState.first_name = formData.get("first_name")!.toString()
                formState.last_name = formData.get("last_name")!.toString()
                formState.email = formData.get("email")!.toString()
                formState.password = formData.get("password")!.toString()
                formState.confirm_password = formData.get("confirm_password")!.toString()
            }

            setError(res.error ?? "")
        })
    }

    return !pending ? (
        <div className="flex flex-col gap-8 w-full max-w-[30em] px-2">
            <Paper error={error} title="Sign In">
                <form id="signin-form" action={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                        <TextInput name="first_name" placeholder="Jhon" label="First name" defaultValue={formState.first_name} required />
                        <TextInput name="last_name" placeholder="Doe" label="Last name" defaultValue={formState.last_name} required />

                        <TextInput name="email" type="email" placeholder="john.doe@company.com" label="Email address" className="sm:col-span-2" defaultValue={formState.email} required />

                        <TextInput name="password" type="password" placeholder="**********" label="Password" className="sm:col-span-2" defaultValue={formState.password} required />

                        <TextInput name="confirm_password" type="password" placeholder="**********" label="Confirm password" className="sm:col-span-2" defaultValue={formState.confirm_password} required />
                    </div>
                </form>
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button type="submit" label="Submit" form="signin-form" />
            </div>
        </div>
    ) : <Loader />
}