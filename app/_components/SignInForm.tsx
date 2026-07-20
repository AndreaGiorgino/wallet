"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import Button from "./Button";
import Paper from "./Paper";
import TextInput from "./TextInput";

export default function SignInForm() {
    const router = useRouter();
    const [error, setError] = useState<string>("");

    const handleSubmit = async (formData: FormData) => {
        setError("");

        if (formData.get("password") !== formData.get("confirm_password")) {
            setError("Passwords does not match.");
            return;
        }

        const res = await fetch("http://localhost:8080/signin", {
            method: 'POST',
            body: JSON.stringify({
                first_name: formData.get("first_name"),
                last_name: formData.get("last_name"),
                email: formData.get("email"),
                password: formData.get("password"),
            }),
            headers: { "Content-Type": "application/json" }
        });

        const user = await res?.json();
        if (!res?.ok || !user) {
            setError("Something went wrong.");
            return;
        }

        const signInRes = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (signInRes?.error) {
            setError("Something went wrong.");
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-[30em] px-2">
            <Paper error={error} title="Sign In">
                <form id="data-from" action={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                        <div>
                            <TextInput id="first_name" placeholder="Jhon" label="First name" required />
                        </div>
                        <div>
                            <TextInput id="last_name" placeholder="Doe" label="Last name" required />
                        </div>

                        <div className="sm:col-span-2">
                            <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" required />
                        </div>

                        <div className="sm:col-span-2">
                            <TextInput id="password" type="password" placeholder="**********" label="Password" required />
                        </div>
                        <div className="sm:col-span-2">
                            <TextInput id="confirm_password" type="password" placeholder="**********" label="Confirm password" required />
                        </div>
                    </div>
                </form>
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button type="submit" label="Submit" form="data-form" />
            </div>
        </div>
    );
}