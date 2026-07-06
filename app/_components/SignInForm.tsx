"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import { CgDanger } from "react-icons/cg";

export default function SignInForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const form = e.target;
        const data = new FormData(form);

        if (data.get("password") !== data.get("confirm_password")) {
            setError("Passwords does not match.");
            return null;
        }

        const res = await fetch("http://localhost:8080/signin", {
            method: 'POST',
            body: JSON.stringify({
                first_name: data.get("first_name"),
                last_name: data.get("last_name"),
                email: data.get("email"),
                password: data.get("password"),
            }),
            headers: { "Content-Type": "application/json" }
        });

        const user = await res?.json();
        if (!res?.ok || !user) {
            setError("Something went wrong.");
            return;
        }

        const signInRes = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false,
        });

        if (signInRes?.error) {
            setError("Something went wrong.");
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex flex-col w-full md:w-[30em] px-2 md:px-[2.5em] gap-6">
            <div className="flex gap-6 items-end">
                <h3 className="text-2xl">Sign In</h3>
                {error && (
                    <div className="inline-flex flex-1 gap-3 items-center px-2 py-2 mt-6 rounded-lg bg-red-900/40">
                        <CgDanger size={20} />
                        {error}
                    </div>
                )}
            </div>
            <hr />
            <form className="bg-neutral-900 rounded-lg p-6 w-full md:w-[25em]" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <TextInput id="first_name" placeholder="Jhon" label="First name" required></TextInput>
                    </div>
                    <div>
                        <TextInput id="last_name" placeholder="Doe" label="Last name" required></TextInput>
                    </div>

                    <div className="md:col-span-2">
                        <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" required></TextInput>
                    </div>

                    <div className="md:col-span-2">
                        <TextInput id="password" type="password" placeholder="**********" label="Password" required></TextInput>
                    </div>
                    <div className="md:col-span-2">
                        <TextInput id="confirm_password" type="password" placeholder="**********" label="Confirm password" required></TextInput>
                    </div>
                </div>
                <div className="flex flex-col justify-end items-center text-sm md:flex-row">
                    <Button type="submit" label="Submit" className="w-full md:w-auto"></Button>
                </div>
            </form>
        </div>
    );
}