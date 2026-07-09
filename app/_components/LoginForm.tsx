"use client"

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import Button from "./Button";
import Paper from "./Paper";
import TextInput from "./TextInput";

export default function LogInForm() {
    const router = useRouter();
    const params = useSearchParams();
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const data = new FormData(form);

        const res = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password.");
        } else {
            router.push('/dashboard');
        }
    }

    useEffect(() => {
        if (params.get("reason") === "expired")
            setError("Your session has expired")
    }, []);

    return (
        <div className="flex flex-col gap-8 px-2 w-full max-w-[30em]">
            <Paper error={error} title="Log In">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6 mb-6">
                        <div>
                            <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" required></TextInput>
                        </div>

                        <div>
                            <TextInput id="password" type="password" placeholder="**********" label="Password" required></TextInput>
                        </div>
                    </div>
                </form>
            </Paper>
            <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                <Button type="submit" label="Submit" form="form" />
            </div>
        </div>
    );
}