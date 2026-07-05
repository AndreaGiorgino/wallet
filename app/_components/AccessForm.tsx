"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";
import LogInForm from "./LoginForm";
import SignInForm from "./SignInForm";
import Spinner from "./Spinner/Spinner";

enum FormState {
    LogIn, SignIn
};

export default function AccessForm() {
    const session = useSession();
    const router = useRouter();
    const [formState, setFormState] = useState<FormState>(FormState.LogIn);

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/dashboard");
        }
    }, [session]);

    if (session?.status === "loading" || session?.status === "authenticated")
        return (
            <div className="flex justify-center mt-16 w-full">
                <div className="bg-neutral-900 rounded-lg p-6 w-[15em] flex justify-center">
                    <Spinner></Spinner>
                </div>
            </div>
        );
    else return (
        <div className="flex flex-col gap-12 items-center mt-16 w-full">
            <div className="overflow-hidden w-[30em]">
                <div className="flex transition" style={{ transform: `translateX(${formState as number * -100}%)` }}>
                    <LogInForm />
                    <SignInForm />
                </div>
            </div>

            <div className="flex gap-6 justify-center w-full">
                <Button label="Log In" onClick={() => setFormState(FormState.LogIn)}></Button>
                <div className="inline-block h-[2.5em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/25"></div>
                <Button label="Sign In" onClick={() => setFormState(FormState.SignIn)}></Button>
            </div>
        </div>
    );
}