"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Button from "./Button"
import Loader from "./Loader/Loader"
import LogInForm from "./LoginForm"
import SignInForm from "./SignInForm"

enum FormState {
    LogIn, SignIn
}

export default function AccessForm() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [formState, setFormState] = useState<FormState>(FormState.LogIn)

    useEffect(() => {
        if (status === "authenticated")
            router.push("/dashboard")
    }, [session])

    if (status === "loading")
        return <Loader />

    return (
        <div className="flex flex-col gap-12 items-center mt-16 w-full">
            <div className="flex gap-6 justify-center w-full">
                <Button label="Log In" onClick={() => setFormState(FormState.LogIn)}></Button>
                <div className="inline-block h-[2.5em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/25"></div>
                <Button label="Sign In" onClick={() => setFormState(FormState.SignIn)}></Button>
            </div>

            {formState == FormState.LogIn && <LogInForm />}
            {formState == FormState.SignIn && <SignInForm />}
        </div>
    )
}