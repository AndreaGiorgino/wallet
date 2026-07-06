"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import TextInput from "./TextInput";

export default function LogInForm() {
    const router = useRouter();
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

    return (
        <div className="flex flex-col w-full sm:w-[30em] px-2 sm:px-[2.5em] gap-6">
            <div className="flex gap-6 items-end">
                <h3 className="text-2xl">Log In</h3>
                <ErrorMessage text={error} />
            </div>
            <hr />
            <form className="bg-neutral-950 rounded-lg p-6 w-full sm:w-[25em]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 mb-6 w-full">
                    <div>
                        <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" required></TextInput>
                    </div>

                    <div>
                        <TextInput id="password" type="password" placeholder="**********" label="Password" required></TextInput>
                    </div>
                </div>
                <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                    <Button type="submit" label="Submit" className="w-full sm:w-auto"></Button>
                </div>
            </form>
        </div>
    );
}