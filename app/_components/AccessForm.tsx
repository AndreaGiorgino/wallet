"use client"

import { useState } from "react";
import Button from "./Button";
import LogInForm from "./LoginForm";
import SignInForm from "./SignInForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Spinner from "./Spinner/Spinner";

enum FormState {
    LogIn, SignIn
};

export default function AccessForm() {
    const session = useSession();
    const [formState, setFormState] = useState<FormState>(FormState.LogIn);

    if (session) {
        if (session.status === "authenticated")
            redirect("/dashboard");
        else if (session.status === "loading")
            return (
                <div className="flex justify-center w-full mt-16">
                    <div className="bg-neutral-900 rounded-lg p-6 w-[15em] flex justify-center">
                        <Spinner></Spinner>
                    </div>
                </div>
            );
    }

    return (
        <div className="w-full mt-16 flex flex-col gap-12 items-center">
            <div className="overflow-hidden w-[30em]">
                <div className="flex transition" style={{ transform: `translateX(${formState as number * -100}%)` }}>
                    <LogInForm></LogInForm>
                    <SignInForm></SignInForm>
                </div>
            </div>

            <div className="w-full flex justify-center gap-6">
                <Button label="Log In" onClick={() => setFormState(FormState.LogIn)} ></Button>
                <div className="inline-block h-[2.5em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/25"></div>
                <Button label="Sign In" onClick={() => setFormState(FormState.SignIn)}></Button>
            </div>
        </div>
    );
}