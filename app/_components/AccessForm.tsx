"use client"

import { useState } from "react";
import Button from "./Button";
import LogInForm from "./LoginForm";
import SignInForm from "./SignInForm";

enum FormState {
    LogIn, SignIn
};

export default function AccessForm() {
    const [formState, setFormState] = useState<FormState>(FormState.LogIn);

    function getTranslatePercentage(): number {
        switch (formState) {
            default:
            case FormState.LogIn: return 0;
            case FormState.SignIn: return -100;
        }
    }

    return (
        <div className="w-full mt-16 flex flex-col gap-12 items-center">
            <div className="overflow-hidden w-[30em]">
                <div className="flex transition" style={{ transform: `translateX(${getTranslatePercentage()}%)` }}>
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